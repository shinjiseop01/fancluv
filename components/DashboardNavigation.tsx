'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { getTeamColorByName } from '../utils/teamColors'
import { useLanguage } from '../hooks/useLanguage'

interface DashboardNavigationProps {
  user: any
  team: any
  onLogout: () => void
}

export default function DashboardNavigation({
  user,
  team,
  onLogout,
}: DashboardNavigationProps) {
  const router = useRouter()
  const { language, changeLanguage, t } = useLanguage()
  const teamColor = team ? getTeamColorByName(team.name) : null

  // 메뉴 항목
  const menuItems = [
    { label: t('nav.home') || '홈', path: '/app/dashboard' },
    { label: t('nav.surveys') || '설문', path: '/app/surveys' },
    { label: t('nav.opinions') || '팬 의견', path: '/app/opinions' },
    { label: t('nav.news') || '팀 뉴스', path: '/app/news' },
    { label: t('nav.community') || '커뮤니티', path: '/app/community' },
    { label: t('nav.matchCenter') || '경기센터', path: '/app/match-center' },
    { label: t('nav.aiInsights') || 'AI 인사이트', path: '/app/ai-insights' },
    { label: t('nav.rankings') || '팬 랭킹', path: '/app/rankings' },
    { label: t('nav.myActivity') || '내 활동', path: '/app/my-activity' },
  ]

  const isActive = (path: string) => router.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('selectedTeam')
    onLogout()
    router.push('/login')
  }

  const handleLogoClick = () => {
    router.push('/app/dashboard')
  }

  const handleSettings = () => {
    router.push('/app/settings')
  }

  return (
    <div className="w-full">
      {/* 프리미엄 헤더 */}
      <header
        className="w-full px-6 py-4 border-b border-gray-200 bg-white shadow-sm"
        style={{
          backgroundColor: teamColor?.pastelBg || '#FFFFFF',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 왼쪽: 로고 */}
          <div
            className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="text-2xl font-bold text-gray-800">FANCLUV</div>
          </div>

          {/* 중앙: 응원팀명 */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-700">
              {team?.name || '팀 선택'}
            </h1>
          </div>

          {/* 오른쪽: 사용자 정보 및 액션 */}
          <div className="flex items-center gap-6">
            {/* 언어 변경 */}
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage('ko')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  language === 'ko'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                한국어
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  language === 'en'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                English
              </button>
            </div>

            {/* 구분선 */}
            <div className="w-px h-6 bg-gray-300"></div>

            {/* 닉네임 */}
            <span className="text-sm text-gray-700 font-medium">
              {user?.nickname || '사용자'}
            </span>

            {/* 설정 버튼 */}
            <button
              onClick={handleSettings}
              className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              설정
            </button>

            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 메인 네비게이션 바 */}
      <nav
        className="w-full px-6 py-0 bg-white border-b border-gray-200 shadow-sm"
        style={{
          backgroundColor: teamColor?.pastelBg || '#FFFFFF',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1 overflow-x-auto">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  isActive(item.path)
                    ? `border-b-2 text-gray-900 font-semibold`
                    : 'border-b-2 border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={
                  isActive(item.path)
                    ? {
                        borderBottomColor: teamColor?.accentColor || '#000',
                        color: teamColor?.accentColor || '#000',
                      }
                    : {}
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
