import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()

  // ตรวจสอบว่า login แล้ว
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: registrations, error } = await supabase
    .from('v_registrations_full')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // สร้าง CSV
  const headers = [
    'ลำดับ',
    'ชื่อ',
    'นามสกุล',
    'เบอร์โทร',
    'โรงเรียน',
    'หลักสูตร อ.1',
    'หลักสูตร อ.2',
    'หลักสูตร อ.3',
    'กิจกรรมที่เลือก',
    'ที่มาข่าวสาร',
    'วันที่ลงทะเบียน',
  ]

  const rows = registrations?.map((reg, i) => [
    i + 1,
    reg.first_name,
    reg.last_name,
    reg.phone,
    reg.school_name,
    reg.choice_1_name || '',
    reg.choice_2_name || '',
    reg.choice_3_name || '',
    (reg.selected_activities || []).join(' | '),
    reg.source || '',
    new Date(reg.submitted_at).toLocaleString('th-TH'),
  ])

  const csvContent = [
    '\uFEFF' + headers.join(','), // BOM for Thai UTF-8
    ...(rows || []).map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n')

  const date = new Date().toISOString().split('T')[0]

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="registrations_${date}.csv"`,
    },
  })
}
