import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: 'ผู้ลงทะเบียน | Admin',
}

interface SearchParams {
  page?: string
  search?: string
}

const PAGE_SIZE = 20

export default async function RegistrantsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const supabase = createClient()
  const page = parseInt(searchParams.page || '1')
  const search = searchParams.search || ''
  const offset = (page - 1) * PAGE_SIZE

  let query = supabase
    .from('v_registrations_full')
    .select('*', { count: 'exact' })
    .order('submitted_at', { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1)

  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,phone.ilike.%${search}%,school_name.ilike.%${search}%`
    )
  }

  const { data: registrants, count } = await query

  const totalPages = Math.ceil((count || 0) / PAGE_SIZE)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl text-primary">ผู้ลงทะเบียน</h1>
          <p className="text-gray-500 text-sm mt-1">ทั้งหมด {(count || 0).toLocaleString()} คน</p>
        </div>
        <a
          href="/api/export"
          className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          <span>📥</span> Export CSV
        </a>
      </div>

      {/* Search */}
      <form className="mb-6">
        <div className="relative max-w-sm">
          <input
            name="search"
            defaultValue={search}
            placeholder="ค้นหาชื่อ, เบอร์, โรงเรียน..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-500 text-left">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">ชื่อ-นามสกุล</th>
                <th className="px-4 py-3 font-medium">เบอร์โทร</th>
                <th className="px-4 py-3 font-medium">โรงเรียน</th>
                <th className="px-4 py-3 font-medium">หลักสูตร อ.1</th>
                <th className="px-4 py-3 font-medium">กิจกรรม</th>
                <th className="px-4 py-3 font-medium">วันที่</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {registrants?.map((reg, i) => (
                <tr key={reg.registration_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{offset + i + 1}</td>
                  <td className="px-4 py-3 font-medium text-primary">
                    {reg.first_name} {reg.last_name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono">{reg.phone}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">{reg.school_name}</td>
                  <td className="px-4 py-3 text-gray-500">{reg.choice_1 || '-'}</td>
                  <td className="px-4 py-3">
                    <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">
                      {reg.selected_activities?.length || 0} กิจกรรม
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(reg.submitted_at).toLocaleDateString('th-TH', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/registrants/${reg.registration_id}`}
                      className="text-accent hover:underline text-xs"
                    >
                      ดูรายละเอียด
                    </Link>
                  </td>
                </tr>
              ))}
              {(!registrants || registrants.length === 0) && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-400 py-12">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-gray-100">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/admin/registrants?page=${p}${search ? `&search=${search}` : ''}`}
                className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all ${
                  p === page
                    ? 'bg-accent text-white font-medium'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
