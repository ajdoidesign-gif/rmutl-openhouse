import { createClient } from '@/lib/supabase/server'
import RegistrationForm from '@/components/public/RegistrationForm'
import Link from 'next/link'

export const metadata = {
  title: 'ลงทะเบียน | เปิดบ้านราชมงคล 2026',
}

export default async function RegisterPage() {
  const supabase = createClient()

  const [{ data: programs }, { data: activities }] = await Promise.all([
    supabase
      .from('programs')
      .select('id, name, short_name, color, icon')
      .eq('is_active', true)
      .order('sort_order'),
    supabase
      .from('activities')
      .select('id, name, display_name, program_id, programs(short_name, color, icon)')
      .eq('is_active', true)
      .order('sort_order'),
  ])

  return (
    <main className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับหน้าหลัก
        </Link>

        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10">
          <div className="mb-8">
            <div className="inline-block bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full mb-4">
              เปิดบ้านราชมงคล 2026
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary mb-2">
              ลงทะเบียนเข้าร่วมกิจกรรม
            </h1>
            <p className="text-gray-500">
              กรอกข้อมูลให้ครบถ้วนเพื่อยืนยันการเข้าร่วมกิจกรรม
            </p>
          </div>

          <RegistrationForm
            programs={programs || []}
            activities={activities || []}
          />
        </div>
      </div>
    </main>
  )
}
