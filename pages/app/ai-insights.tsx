import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'
import { generateMockAIInsights } from '../../data/mockData'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function AIInsights() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const [aiInsights, setAiInsights] = useState<any>(null)

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

    setAiInsights(generateMockAIInsights())
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
      'ai.title': { ko: 'AI 인사이트', en: 'AI Insights' },
      'ai.subtitle': { ko: 'AI가 분석한 팬 감정과 트렌드를 확인하세요', en: 'Check fan sentiment and trends analyzed by AI' },
      'ai.sentiment': { ko: '팬 감정 분석', en: 'Fan Sentiment Analysis' },
      'ai.positive': { ko: '긍정', en: 'Positive' },
      'ai.neutral': { ko: '중립', en: 'Neutral' },
      'ai.negative': { ko: '부정', en: 'Negative' },
      'ai.keywords': { ko: '주요 키워드', en: 'Top Keywords' },
      'ai.frequency': { ko: '빈도', en: 'Frequency' },
      'ai.satisfaction': { ko: '팬 만족도', en: 'Fan Satisfaction' },
      'ai.topics': { ko: '관심 주제', en: 'Topics of Interest' },
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
            {t('ai.title')}
          </h2>
          <p className="text-gray-600">{t('ai.subtitle')}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sentiment Analysis */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-6" style={{ color: textDark }}>
              {t('ai.sentiment')}
            </h3>
            <div className="space-y-6">
              {/* Positive */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-900">{t('ai.positive')}</span>
                  <span className="font-bold text-green-600">
                    {aiInsights?.sentiment.positive}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${aiInsights?.sentiment.positive}%` }}
                  ></div>
                </div>
              </div>

              {/* Neutral */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-900">{t('ai.neutral')}</span>
                  <span className="font-bold text-gray-600">
                    {aiInsights?.sentiment.neutral}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gray-500 h-4 rounded-full"
                    style={{ width: `${aiInsights?.sentiment.neutral}%` }}
                  ></div>
                </div>
              </div>

              {/* Negative */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-900">{t('ai.negative')}</span>
                  <span className="font-bold text-red-600">
                    {aiInsights?.sentiment.negative}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-red-500 h-4 rounded-full"
                    style={{ width: `${aiInsights?.sentiment.negative}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {language === 'ko'
                  ? '팬들의 전반적인 감정은 긍정적입니다. 최근 경기 결과와 팀의 활약이 팬 만족도를 높이고 있습니다.'
                  : 'Overall fan sentiment is positive. Recent match results and team performance are increasing fan satisfaction.'}
              </p>
            </div>
          </div>

          {/* Satisfaction Gauge */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-6" style={{ color: textDark }}>
              {t('ai.satisfaction')}
            </h3>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-40 h-40 mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="8"
                    strokeDasharray={`${(aiInsights?.satisfaction / 100) * 283} 283`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold" style={{ color: accentColor }}>
                      {aiInsights?.satisfaction}
                    </p>
                    <p className="text-sm text-gray-600">/ 100</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                {language === 'ko'
                  ? '팬 만족도가 높은 상태입니다'
                  : 'Fan satisfaction is high'}
              </p>
            </div>
          </div>
        </div>

        {/* Keywords and Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Keywords */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-6" style={{ color: textDark }}>
              {t('ai.keywords')}
            </h3>
            <div className="space-y-4">
              {aiInsights?.keywords.map((keyword: any, idx: number) => (
                <div key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{keyword.word}</span>
                    <span className="text-sm font-bold text-gray-500">
                      {keyword.frequency}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(keyword.frequency / 234) * 100}%`,
                        backgroundColor: accentColor,
                      }}
                    ></div>
                  </div>
                  <p
                    className="text-xs font-medium"
                    style={{
                      color:
                        keyword.sentiment === 'positive'
                          ? '#15803d'
                          : keyword.sentiment === 'negative'
                            ? '#991b1b'
                            : '#6b7280',
                    }}
                  >
                    {keyword.sentiment === 'positive' && (language === 'ko' ? '긍정' : 'Positive')}
                    {keyword.sentiment === 'neutral' && (language === 'ko' ? '중립' : 'Neutral')}
                    {keyword.sentiment === 'negative' && (language === 'ko' ? '부정' : 'Negative')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Topics of Interest */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-6" style={{ color: textDark }}>
              {t('ai.topics')}
            </h3>
            <div className="space-y-3">
              {aiInsights?.topicsOfInterest.map((topic: string, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: pastelBg }}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    ></span>
                    <span className="font-medium text-gray-900">{topic}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {language === 'ko'
                  ? '팬들이 경기 결과와 선수 영입에 가장 많은 관심을 보이고 있습니다.'
                  : 'Fans are most interested in match results and player transfers.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
