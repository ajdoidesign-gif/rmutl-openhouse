import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function RegistrantDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: reg } = await supabase
    .from('v_registrations_full')
    .select('*')
    .eq('registration_id', params.id)
    .single()

  if (!reg) notFound()

  return (
    <div className="max-w-2xl">
      <Link href="/admin/registrants" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 text-sm transition-colors">
        ← กลับ
      </Link>

      <h1 className="font-display text-3xl text-primary mb-6">
        {reg.first_name} {reg.last_name}
      </h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <section>
          <h2 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide text-gray-400">
            ข้อมูลส่วนตัว
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: 'ชื่อ', value: reg.first_name },
              { label: 'นามสกุล', value: reg.last_name },
              { label: 'เบอร์โทร', value: reg.phone },
              { label: 'โรงเรียน', value: reg.school_name },
              { label: 'ที่มาของข่าวสาร', value: reg.source || '-' },
              { label: 'ลงทะเบียนเมื่อ', value: new Date(reg.submitted_at).toLocaleString('th-TH') },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                <p className="font-medium text-primary">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide text-gray-400">
            หลักสูตรที่สนใจ
          </h2>
          <div className="space-y-2 text-sm">
            {[
              { label: 'อันดับ 1', value: reg.choice_1_name },
              { label: 'อันดับ 2', value: reg.choice_2_name },
              { label: 'อันดับ 3', value: reg.choice_3_name },
            ].filter(({ value }) => value).map(({ label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="text-gray-400 w-16">{label}</span>
                <span className="font-medium text-primary">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide text-gray-400">
            กิจกรรมที่เลือก
          </h2>
          <div className="flex flex-wrap gap-2">
            {reg.selected_activities?.map((act: string, i: number) => (
              <span key={i} className="bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
                {act}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
