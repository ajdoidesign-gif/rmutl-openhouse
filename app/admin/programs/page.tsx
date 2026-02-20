import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'หลักสูตร | Admin',
}

export default async function ProgramsPage() {
  const supabase = createClient()

  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .order('sort_order')

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-primary">หลักสูตร</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs?.map((program) => (
          <div key={program.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: program.color + '20' }}
            >
              {program.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary truncate">{program.name}</h3>
              <p className="text-gray-400 text-xs mt-0.5">{program.short_name}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: program.color }}
                />
                <span className="text-xs text-gray-400 font-mono">{program.color}</span>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${program.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                  {program.is_active ? 'เปิดรับ' : 'ปิด'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
