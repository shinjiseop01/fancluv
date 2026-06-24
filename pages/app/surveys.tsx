import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'
import { generateMockSurveys } from '../../data/mockData'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function Surveys() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const [surveys, setSurveys] = useState<any[]>([])
  const [selectedTab, setSelectedTab] = useState<'active' | 'closed'>('active')

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

    setSurveys(generateMockSurveys())
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

  const activeSurveys = surveys.filter((s) => s.status === 'active')
  const closedSurveys = surveys.filter((s) => s.status === 'closed')
  const displaySurveys = selectedTab === 'active' ? activeSurveys : closedSurveys

  const t = (key: string) => {
    const translations: { [key: string]: { ko: string; en: string } } = {
      'surveys.title': { ko: '설문', en: 'Surveys' },
      'surveys.active': { ko: '진행 중', en: 'Active' },
      'surveys.closed': { ko: '종료', en: 'Closed' },
      'surveys.votes': { ko: '명 참여', en: 'votes' },
      'surveys.endDate': { ko: '종료일', en: 'End Date' },
      'surveys.results': { ko: '결과 분석', en: 'Results' },
      'surveys.percentage': { ko: '%', en: '%' },
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
            {t('surveys.title')}
          </h2>
          <p className="text-gray-600">
            {language === 'ko'
              ? '팬들의 의견을 모으는 설문에 참여하세요'
              : 'Participate in surveys to gather fan opinions'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setSelectedTab('active')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              selectedTab === 'active'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            style={
              selectedTab === 'active'
                ? { borderBottomColor: accentColor, color: accentColor }
                : {}
            }
          >
            {t('surveys.active')} ({activeSurveys.length})
          </button>
          <button
            onClick={() => setSelectedTab('closed')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              selectedTab === 'closed'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            style={
              selectedTab === 'closed'
                ? { borderBottomColor: accentColor, color: accentColor }
                : {}
            }
          >
            {t('surveys.closed')} ({closedSurveys.length})
          </button>
        </div>

        {/* Surveys List */}
        <div className="space-y-6">
          {displaySurveys.map((survey) => (
            <div
              key={survey.id}
              className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition"
            >
              {/* Survey Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{survey.title}</h3>
                <p className="text-gray-600 mb-4">{survey.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>
                    {survey.totalVotes}
                    {t('surveys.votes')}
                  </span>
                  {survey.endAt && (
                    <span>
                      {t('surveys.endDate')}: {survey.endAt}
                    </span>
                  )}
                </div>
              </div>

              {/* Survey Options */}
              <div className="space-y-4">
                {survey.options.map((option: any, idx: number) => {
                  const percentage =
                    survey.totalVotes > 0
                      ? Math.round((option.votes / survey.totalVotes) * 100)
                      : 0
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{option.text}</span>
                        <span className="text-sm font-bold" style={{ color: accentColor }}>
                          {percentage}
                          {t('surveys.percentage')} ({option.votes})
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: accentColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Action Button */}
              {survey.status === 'active' && (
                <button
                  className="mt-6 w-full py-3 text-white font-semibold rounded-lg transition"
                  style={{ backgroundColor: accentColor }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.9')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
                >
                  {language === 'ko' ? '투표하기' : 'Vote'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displaySurveys.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {language === 'ko'
                ? '설문이 없습니다'
                : 'No surveys available'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
