import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'กิจกรรม | Admin',
}

export default async function ActivitiesAdminPage() {
  const supabase = createClient()

  const { data: activities } = await supabase
    .from('v_activity_registration_count')
    .select('*')
    .order('total_registrations', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-primary">กิจกรรม</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-gray-500 text-left">
              <th className="px-4 py-3 font-medium">กิจกรรม</th>
              <th className="px-4 py-3 font-medium">หลักสูตร</th>
              <th className="px-4 py-3 font-medium">ผู้ลงทะเบียน</th>
              <th className="px-4 py-3 font-medium">ที่นั่ง</th>
              <th className="px-4 py-3 font-medium">% เต็ม</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {activities?.map((act) => (
              <tr key={act.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <p className="font-medium text-primary">{act.display_name || act.name}</p>
                  {act.display_name && (
                    <p className="text-gray-400 text-xs mt-0.5 truncate max-w-[300px]">{act.name}</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: (act.program_color || '#E94560') + '20',
                      color: act.program_color || '#E94560',
                    }}
                  >
                    {act.program}
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-primary">{act.total_registrations}</td>
                <td className="px-4 py-4 text-gray-500">{act.max_capacity || 'ไม่จำกัด'}</td>
                <td className="px-4 py-4">
                  {act.fill_percentage !== null ? (
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${Math.min(act.fill_percentage, 100)}%`,
                            backgroundColor: act.fill_percentage >= 90 ? '#E94560' : '#F5A623',
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{act.fill_percentage}%</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
