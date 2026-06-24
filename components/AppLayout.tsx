'use client'

import { BottomNav } from '@/components/BottomNav'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { MOCK_CLUBS } from '@/lib/mock-data'
import { BarChart3, Home, MessageSquare, Settings, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface AppLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  rightSidebar?: React.ReactNode
}

export function AppLayout({ children, showSidebar = true, rightSidebar }: AppLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  const navItems = [
    { href: '/app', label: '홈', icon: Home },
    { href: '/app/surveys', label: '설문', icon: MessageSquare },
    { href: '/app/analytics', label: '통계', icon: BarChart3 },
    { href: '/app/profile', label: '프로필', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Header */}
      <Header showMenu={true} />

      {/* Desktop Sidebar */}
      {showSidebar && (
        <aside
          className={`hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 space-y-4">
            {/* Club Selector */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">응원팀</p>
              <div className="space-y-1">
                {MOCK_CLUBS.slice(0, 6).map((club) => (
                  <Link
                    key={club.id}
                    href={`/app?team=${club.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname.includes(club.id)
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{club.logo_url}</span>
                    <span className="truncate">{club.name}</span>
                  </Link>
                ))}
              </div>
              <Link href="/app/teams" className="text-xs text-primary-600 hover:underline mt-2 block">
                모든 팀 보기
              </Link>
            </div>

            {/* Navigation */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">메뉴</p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* CTA */}
            <Link href="/app/create" className="mt-auto">
              <Button className="w-full">
                의견 작성
              </Button>
            </Link>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Center Content */}
            <div className="lg:col-span-2">{children}</div>

            {/* Right Sidebar */}
            {rightSidebar && <div className="hidden lg:block">{rightSidebar}</div>}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
