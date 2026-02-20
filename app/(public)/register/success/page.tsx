import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: 'ลงทะเบียนสำเร็จ | เปิดบ้านราชมงคล 2026',
}

interface Props {
  searchParams: { id?: string }
}

export default async function SuccessPage({ searchParams }: Props) {
  const supabase = createClient()
  let registrationData = null

  if (searchParams.id) {
    const { data } = await supabase
      .from('v_registrations_full')
      .select('*')
      .eq('registration_id', searchParams.id)
      .single()

    registrationData = data
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-display text-3xl text-primary mb-2">
            ลงทะเบียนสำเร็จ!
          </h1>
          <p className="text-gray-500 mb-8">
            ขอบคุณที่สนใจเข้าร่วมงานเปิดบ้านราชมงคล 2026
          </p>

          {registrationData && (
            <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-8">
              <h2 className="font-semibold text-primary">สรุปข้อมูลการลงทะเบียน</h2>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">ชื่อ-นามสกุล</p>
                  <p className="font-medium text-primary">
                    {registrationData.first_name} {registrationData.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">โรงเรียน</p>
                  <p className="font-medium text-primary">{registrationData.school_name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">หลักสูตรที่สนใจ อันดับ 1</p>
                  <p className="font-medium text-primary">{registrationData.choice_1_name || '-'}</p>
                </div>
                {registrationData.choice_2_name && (
                  <div>
                    <p className="text-gray-400 text-xs">อันดับ 2</p>
                    <p className="font-medium text-primary">{registrationData.choice_2_name}</p>
                  </div>
                )}
              </div>

              {registrationData.selected_activities?.length > 0 && (
                <div>
                  <p className="text-gray-400 text-xs mb-2">กิจกรรมที่เลือก</p>
                  <div className="flex flex-wrap gap-2">
                    {registrationData.selected_activities.map((act: string, i: number) => (
                      <span
                        key={i}
                        className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
