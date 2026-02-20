'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/dashboard', label: 'ภาพรวม', icon: '📊' },
  { href: '/admin/registrants', label: 'ผู้ลงทะเบียน', icon: '👥' },
  { href: '/admin/activities', label: 'กิจกรรม', icon: '🎨' },
  { href: '/admin/programs', label: 'หลักสูตร', icon: '🏛️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <p className="font-display text-lg">เปิดบ้านราชมงคล</p>
        <p className="text-gray-400 text-xs mt-0.5">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200',
              pathname.startsWith(item.href)
                ? 'bg-accent text-white font-medium'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            )}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <span>🚪</span>
          ออกจากระบบ
        </button>
      </div>
    </aside>
  )
}
