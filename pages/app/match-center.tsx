import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'
import { generateMockMatches } from '../../data/mockData'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function MatchCenter() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const [matches, setMatches] = useState<any[]>([])
  const [selectedMatch, setSelectedMatch] = useState<any>(null)

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

    const mockMatches = generateMockMatches()
    setMatches(mockMatches)
    if (mockMatches.length > 0) {
      setSelectedMatch(mockMatches[0])
    }
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

  const t = (key: string) => {
    const translations: { [key: string]: { ko: string; en: string } } = {
      'match.title': { ko: '경기센터', en: 'Match Center' },
      'match.subtitle': { ko: '경기 일정과 예상 라인업을 확인하세요', en: 'Check match schedule and predicted lineups' },
      'match.schedule': { ko: '경기 일정', en: 'Match Schedule' },
      'match.lineup': { ko: '예상 라인업', en: 'Predicted Lineup' },
      'match.prediction': { ko: '승부 예측', en: 'Match Prediction' },
      'match.scheduled': { ko: '예정', en: 'Scheduled' },
      'match.live': { ko: '진행 중', en: 'Live' },
      'match.finished': { ko: '종료', en: 'Finished' },
      'match.venue': { ko: '경기장', en: 'Venue' },
      'match.homeWin': { ko: '홈팀 승리', en: 'Home Win' },
      'match.draw': { ko: '무승부', en: 'Draw' },
      'match.awayWin': { ko: '원정팀 승리', en: 'Away Win' },
    }
    return translations[key]?.[language] || key
  }

  return (
    <div style={{ backgroundColor: pastelBg }} className="min-h-screen">
      {/* Navigation */}
      <DashboardNavigation user={user} team={team} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: textDark }}>
            {t('match.title')}
          </h2>
          <p className="text-gray-600">{t('match.subtitle')}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match Schedule */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4" style={{ color: textDark }}>
              {t('match.schedule')}
            </h3>
            <div className="space-y-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => setSelectedMatch(match)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                    selectedMatch?.id === match.id
                      ? 'border-gray-900 bg-white'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  style={
                    selectedMatch?.id === match.id
                      ? { borderColor: accentColor }
                      : {}
                  }
                >
                  <p className="text-xs text-gray-500 mb-2">
                    {match.date} {match.time}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {match.homeTeam}
                  </p>
                  <p className="text-xs text-gray-600 mb-2">vs</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {match.awayTeam}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Match Details */}
          <div className="lg:col-span-2">
            {selectedMatch && (
              <div className="space-y-6">
                {/* Match Info */}
                <div className="bg-white rounded-lg p-8 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {selectedMatch.status === 'scheduled' && t('match.scheduled')}
                      {selectedMatch.status === 'live' && t('match.live')}
                      {selectedMatch.status === 'finished' && t('match.finished')}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedMatch.date} {selectedMatch.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedMatch.homeTeam}
                      </p>
                      {selectedMatch.status === 'finished' && (
                        <p
                          className="text-3xl font-bold"
                          style={{ color: accentColor }}
                        >
                          {selectedMatch.homeScore}
                        </p>
                      )}
                    </div>
                    <div className="text-center">
                      {selectedMatch.status === 'finished' ? (
                        <p className="text-2xl font-bold text-gray-400">-</p>
                      ) : (
                        <p className="text-lg text-gray-500">vs</p>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedMatch.awayTeam}
                      </p>
                      {selectedMatch.status === 'finished' && (
                        <p
                          className="text-3xl font-bold"
                          style={{ color: accentColor }}
                        >
                          {selectedMatch.awayScore}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    <strong>{t('match.venue')}:</strong> {selectedMatch.venue}
                  </p>
                </div>

                {/* Predicted Lineup */}
                {selectedMatch.status !== 'finished' && (
                  <div className="bg-white rounded-lg p-8 border border-gray-200">
                    <h4 className="text-lg font-bold mb-4" style={{ color: textDark }}>
                      {t('match.lineup')}
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold text-gray-900 mb-3">
                          {selectedMatch.homeTeam}
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>🥅 GK: 선수 1</p>
                          <p>🛡️ DF: 선수 2, 선수 3, 선수 4</p>
                          <p>🎯 MF: 선수 5, 선수 6, 선수 7</p>
                          <p>⚽ FW: 선수 8, 선수 9</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-3">
                          {selectedMatch.awayTeam}
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>🥅 GK: 선수 1</p>
                          <p>🛡️ DF: 선수 2, 선수 3, 선수 4</p>
                          <p>🎯 MF: 선수 5, 선수 6, 선수 7</p>
                          <p>⚽ FW: 선수 8, 선수 9</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Match Prediction */}
                {selectedMatch.status === 'scheduled' && (
                  <div className="bg-white rounded-lg p-8 border border-gray-200">
                    <h4 className="text-lg font-bold mb-4" style={{ color: textDark }}>
                      {t('match.prediction')}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">
                            {t('match.homeWin')}
                          </span>
                          <span
                            className="font-bold"
                            style={{ color: accentColor }}
                          >
                            45%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: '45%',
                              backgroundColor: accentColor,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">
                            {t('match.draw')}
                          </span>
                          <span className="font-bold text-gray-600">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gray-500"
                            style={{ width: '25%' }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">
                            {t('match.awayWin')}
                          </span>
                          <span className="font-bold text-gray-600">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gray-400"
                            style={{ width: '30%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
