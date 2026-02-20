import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Dashboard | Admin เปิดบ้านราชมงคล',
}

export const revalidate = 30

export default async function DashboardPage() {
  const supabase = createClient()

  const [
    { count: totalRegistrations },
    { data: activityStats },
    { data: recentRegistrations },
    { data: sourceSummary },
  ] = await Promise.all([
    supabase.from('registrations').select('*', { count: 'exact', head: true }),
    supabase.from('v_activity_registration_count').select('*').order('total_registrations', { ascending: false }),
    supabase
      .from('v_registrations_full')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(5),
    supabase.from('v_source_summary').select('*'),
  ])

  const statCards = [
    {
      label: 'ผู้ลงทะเบียนทั้งหมด',
      value: (totalRegistrations || 0).toLocaleString(),
      icon: '👥',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'กิจกรรมทั้งหมด',
      value: activityStats?.length || 0,
      icon: '🎨',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'กิจกรรมยอดนิยม',
      value: activityStats?.[0]?.display_name || activityStats?.[0]?.name || '-',
      icon: '⭐',
      color: 'bg-yellow-50 text-yellow-600',
      isText: true,
    },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl text-primary mb-8">ภาพรวม</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-lg mb-4`}>
              {card.icon}
            </div>
            <p className="text-gray-500 text-sm mb-1">{card.label}</p>
            <p className={`font-semibold text-primary ${card.isText ? 'text-base' : 'text-3xl'}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ยอดลงทะเบียนตามกิจกรรม */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-primary mb-4">ยอดลงทะเบียนตามกิจกรรม</h2>
          <div className="space-y-3">
            {activityStats?.map((act) => (
              <div key={act.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 truncate max-w-[200px]">{act.display_name || act.name}</span>
                  <span className="font-medium text-primary flex-shrink-0 ml-2">
                    {act.total_registrations}
                    {act.max_capacity ? ` / ${act.max_capacity}` : ''}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: act.max_capacity
                        ? `${Math.min((act.total_registrations / act.max_capacity) * 100, 100)}%`
                        : act.total_registrations > 0 ? '100%' : '0%',
                      backgroundColor: '#E94560',
                    }}
                  />
                </div>
              </div>
            ))}
            {(!activityStats || activityStats.length === 0) && (
              <p className="text-gray-400 text-sm text-center py-4">ยังไม่มีข้อมูล</p>
            )}
          </div>
        </div>

        {/* ที่มาข่าวสาร */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-primary mb-4">ที่มาของข่าวสาร</h2>
          <div className="space-y-3">
            {sourceSummary?.map((src) => (
              <div key={src.source} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{src.source}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-secondary"
                      style={{
                        width: sourceSummary[0]?.total
                          ? `${(src.total / sourceSummary[0].total) * 100}%`
                          : '0%',
                      }}
                    />
                  </div>
                  <span className="font-medium text-primary w-6 text-right">{src.total}</span>
                </div>
              </div>
            ))}
            {(!sourceSummary || sourceSummary.length === 0) && (
              <p className="text-gray-400 text-sm text-center py-4">ยังไม่มีข้อมูล</p>
            )}
          </div>
        </div>

        {/* ผู้ลงทะเบียนล่าสุด */}
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-primary">ผู้ลงทะเบียนล่าสุด</h2>
            <a href="/admin/registrants" className="text-accent text-sm hover:underline">ดูทั้งหมด →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-100">
                  <th className="pb-3 font-medium">ชื่อ-นามสกุล</th>
                  <th className="pb-3 font-medium">โรงเรียน</th>
                  <th className="pb-3 font-medium">หลักสูตรอันดับ 1</th>
                  <th className="pb-3 font-medium">เวลา</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentRegistrations?.map((reg) => (
                  <tr key={reg.registration_id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-primary">
                      {reg.first_name} {reg.last_name}
                    </td>
                    <td className="py-3 text-gray-500">{reg.school_name}</td>
                    <td className="py-3 text-gray-500">{reg.choice_1 || '-'}</td>
                    <td className="py-3 text-gray-400">
                      {new Date(reg.submitted_at).toLocaleString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
                {(!recentRegistrations || recentRegistrations.length === 0) && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-8">
                      ยังไม่มีผู้ลงทะเบียน
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
