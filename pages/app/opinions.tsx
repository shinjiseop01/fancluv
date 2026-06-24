import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'
import { generateMockOpinions, generateMockAIInsights } from '../../data/mockData'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function Opinions() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const [opinions, setOpinions] = useState<any[]>([])
  const [aiInsights, setAiInsights] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: { ko: '전체', en: 'All' } },
    { id: 'match', label: { ko: '경기', en: 'Match' } },
    { id: 'team', label: { ko: '팀', en: 'Team' } },
    { id: 'stadium', label: { ko: '경기장', en: 'Stadium' } },
  ]

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

    setOpinions(generateMockOpinions())
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

  const filteredOpinions =
    selectedCategory === 'all'
      ? opinions
      : opinions.filter((o) => o.category === selectedCategory)

  const t = (key: string) => {
    const translations: { [key: string]: { ko: string; en: string } } = {
      'opinions.title': { ko: '팬 의견', en: 'Fan Opinions' },
      'opinions.subtitle': { ko: '팬들의 생생한 의견을 나누세요', en: 'Share your opinions with other fans' },
      'opinions.write': { ko: '의견 작성', en: 'Write Opinion' },
      'opinions.keywords': { ko: 'AI 키워드 분석', en: 'AI Keyword Analysis' },
      'opinions.likes': { ko: '좋아요', en: 'Likes' },
      'opinions.comments': { ko: '댓글', en: 'Comments' },
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
            {t('opinions.title')}
          </h2>
          <p className="text-gray-600 mb-6">{t('opinions.subtitle')}</p>
          <button
            className="px-6 py-3 text-white font-semibold rounded-lg transition"
            style={{ backgroundColor: accentColor }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.9')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            {t('opinions.write')}
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Opinions List */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? 'text-white'
                      : 'bg-white text-gray-900 border border-gray-200 hover:border-gray-300'
                  }`}
                  style={
                    selectedCategory === cat.id
                      ? { backgroundColor: accentColor }
                      : {}
                  }
                >
                  {cat.label[language as 'ko' | 'en']}
                </button>
              ))}
            </div>

            {/* Opinions */}
            <div className="space-y-4">
              {filteredOpinions.map((opinion) => (
                <div
                  key={opinion.id}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer"
                  onClick={() => {}}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{opinion.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{opinion.author}</p>
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {opinion.category === 'match' && (language === 'ko' ? '경기' : 'Match')}
                      {opinion.category === 'team' && (language === 'ko' ? '팀' : 'Team')}
                      {opinion.category === 'stadium' && (language === 'ko' ? '경기장' : 'Stadium')}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{opinion.content}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>❤️ {opinion.likes}</span>
                    <span>💬 {opinion.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Keyword Analysis */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-20">
              <h3 className="text-lg font-bold mb-6" style={{ color: textDark }}>
                {t('opinions.keywords')}
              </h3>
              <div className="space-y-4">
                {aiInsights?.keywords.map((keyword: any, idx: number) => (
                  <div key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{keyword.word}</span>
                      <span className="text-xs font-bold text-gray-500">{keyword.frequency}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(keyword.frequency / 234) * 100}%`,
                          backgroundColor: accentColor,
                        }}
                      ></div>
                    </div>
                    <p
                      className="text-xs mt-2 font-medium"
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
          </div>
        </div>
      </main>
    </div>
  )
}
