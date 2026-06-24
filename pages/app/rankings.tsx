import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'
import { generateMockFanRankings } from '../../data/mockData'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function Rankings() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const [rankings, setRankings] = useState<any[]>([])

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login')
      return
    }

    const userData = JSON.parse(userStr)
    setUser(userData)

    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage === 'en') {
      setLanguage('en')
    }

    const teamStr = localStorage.getItem('selectedTeam')
    if (teamStr) {
      try {
        const teamData = JSON.parse(teamStr)
        setTeam(teamData)
        const color = getTeamColorByName(teamData.name)
        setTeamColor(color)
      } catch (err) {
        console.log('팀 정보 파싱 오류')
      }
    }

    setRankings(generateMockFanRankings())
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로드 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const pastelBg = teamColor?.pastelBg || '#FFF5F5'
  const accentColor = teamColor?.accentColor || '#E53E3E'
  const textDark = '#1F2937'

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      '플래티넘': '#e5e7eb',
      '골드': '#fbbf24',
      '실버': '#d1d5db',
      '브론즈': '#92400e',
    }
    return colors[level] || '#f3f4f6'
  }

  const t = (key: string) => {
    const translations: { [key: string]: { ko: string; en: string } } = {
      'rankings.title': { ko: '팬 랭킹', en: 'Fan Rankings' },
      'rankings.subtitle': { ko: '활동 많은 팬들을 확인하세요', en: 'Check out the most active fans' },
      'rankings.rank': { ko: '순위', en: 'Rank' },
      'rankings.nickname': { ko: '닉네임', en: 'Nickname' },
      'rankings.points': { ko: '포인트', en: 'Points' },
      'rankings.level': { ko: '레벨', en: 'Level' },
      'rankings.badges': { ko: '배지', en: 'Badges' },
    }
    return translations[key]?.[language] || key
  }

  return (
    <div style={{ backgroundColor: pastelBg }} className="min-h-screen">
      {/* Navigation */}
      <DashboardNavigation user={user} team={team} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: textDark }}>
            {t('rankings.title')}
          </h2>
          <p className="text-gray-600">{t('rankings.subtitle')}</p>
        </div>

        {/* Rankings Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div
            className="grid grid-cols-12 gap-4 p-6 font-semibold text-sm text-gray-600"
            style={{ backgroundColor: '#f9fafb' }}
          >
            <div className="col-span-1">{t('rankings.rank')}</div>
            <div className="col-span-3">{t('rankings.nickname')}</div>
            <div className="col-span-2">{t('rankings.points')}</div>
            <div className="col-span-2">{t('rankings.level')}</div>
            <div className="col-span-4">{t('rankings.badges')}</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {rankings.map((ranking, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50 transition"
              >
                {/* Rank */}
                <div className="col-span-1">
                  <div className="flex items-center justify-center">
                    {ranking.rank === 1 && <span className="text-2xl">🥇</span>}
                    {ranking.rank === 2 && <span className="text-2xl">🥈</span>}
                    {ranking.rank === 3 && <span className="text-2xl">🥉</span>}
                    {ranking.rank > 3 && (
                      <span className="font-bold text-gray-900">{ranking.rank}</span>
                    )}
                  </div>
                </div>

                {/* Nickname */}
                <div className="col-span-3">
                  <p className="font-semibold text-gray-900">{ranking.nickname}</p>
                </div>

                {/* Points */}
                <div className="col-span-2">
                  <p className="font-bold" style={{ color: accentColor }}>
                    {ranking.points.toLocaleString()}
                  </p>
                </div>

                {/* Level */}
                <div className="col-span-2">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: getLevelColor(ranking.level),
                      color:
                        ranking.level === '플래티넘'
                          ? '#374151'
                          : ranking.level === '골드'
                            ? '#78350f'
                            : ranking.level === '실버'
                              ? '#374151'
                              : '#fef3c7',
                    }}
                  >
                    {ranking.level}
                  </span>
                </div>

                {/* Badges */}
                <div className="col-span-4">
                  <div className="flex flex-wrap gap-2">
                    {ranking.badges.length > 0 ? (
                      ranking.badges.map((badge: string, bidx: number) => (
                        <span
                          key={bidx}
                          className="text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800"
                        >
                          ⭐ {badge}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">
                        {language === 'ko' ? '배지 없음' : 'No badges'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">
            {language === 'ko' ? '포인트 획득 방법' : 'How to Earn Points'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              • {language === 'ko' ? '의견 작성: 10포인트' : 'Write Opinion: 10 points'}
            </li>
            <li>
              • {language === 'ko' ? '댓글 작성: 5포인트' : 'Write Comment: 5 points'}
            </li>
            <li>
              • {language === 'ko' ? '설문 참여: 3포인트' : 'Participate Survey: 3 points'}
            </li>
            <li>
              • {language === 'ko' ? '커뮤니티 게시물: 8포인트' : 'Community Post: 8 points'}
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
