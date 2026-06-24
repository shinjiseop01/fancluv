import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'
import {
  generateMockSurveys,
  generateMockOpinions,
  generateMockNews,
  generateMockMatches,
  generateMockAIInsights,
} from '../../data/mockData'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')

  const [surveys, setSurveys] = useState<any[]>([])
  const [opinions, setOpinions] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])
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

    // Mock 데이터 로드
    setSurveys(generateMockSurveys())
    setOpinions(generateMockOpinions())
    setNews(generateMockNews())
    setMatches(generateMockMatches())
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
      'home.title': { ko: '홈', en: 'Home' },
      'home.fanActivity': { ko: '팬 활동 현황', en: 'Fan Activity' },
      'home.activeFans': { ko: '활동 중인 팬', en: 'Active Fans' },
      'home.totalOpinions': { ko: '총 의견 수', en: 'Total Opinions' },
      'home.totalComments': { ko: '총 댓글 수', en: 'Total Comments' },
      'home.latestSurveys': { ko: '최신 설문', en: 'Latest Surveys' },
      'home.viewAll': { ko: '모두 보기', en: 'View All' },
      'home.popularOpinions': { ko: '인기 의견', en: 'Popular Opinions' },
      'home.latestNews': { ko: '최신 뉴스', en: 'Latest News' },
      'home.upcomingMatches': { ko: '경기 일정', en: 'Upcoming Matches' },
      'home.aiSummary': { ko: 'AI 요약', en: 'AI Summary' },
      'home.sentiment': { ko: '팬 감정 분석', en: 'Fan Sentiment' },
      'home.positive': { ko: '긍정', en: 'Positive' },
      'home.neutral': { ko: '중립', en: 'Neutral' },
      'home.negative': { ko: '부정', en: 'Negative' },
      'home.topKeywords': { ko: '주요 키워드', en: 'Top Keywords' },
      'home.satisfaction': { ko: '팬 만족도', en: 'Fan Satisfaction' },
    }
    return translations[key]?.[language] || key
  }

  return (
    <div style={{ backgroundColor: pastelBg }} className="min-h-screen">
      {/* Navigation */}
      <DashboardNavigation user={user} team={team} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: textDark }}>
            {language === 'ko' ? `${user.nickname}님, 환영합니다!` : `Welcome, ${user.nickname}!`}
          </h1>
          <p className="text-gray-600">
            {language === 'ko'
              ? '오늘의 팬 활동을 확인하세요'
              : 'Check out today\'s fan activities'}
          </p>
        </div>

        {/* Fan Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm font-medium mb-2">{t('home.activeFans')}</p>
            <p className="text-3xl font-bold" style={{ color: accentColor }}>
              1,234
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm font-medium mb-2">{t('home.totalOpinions')}</p>
            <p className="text-3xl font-bold" style={{ color: accentColor }}>
              {opinions.length * 100}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm font-medium mb-2">{t('home.totalComments')}</p>
            <p className="text-3xl font-bold" style={{ color: accentColor }}>
              {opinions.reduce((sum, op) => sum + op.comments, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm font-medium mb-2">{t('home.satisfaction')}</p>
            <p className="text-3xl font-bold" style={{ color: accentColor }}>
              {aiInsights?.satisfaction}%
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Latest Surveys */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: textDark }}>
                {t('home.latestSurveys')}
              </h2>
              <button
                onClick={() => router.push('/app/surveys')}
                className="text-sm font-medium"
                style={{ color: accentColor }}
              >
                {t('home.viewAll')}
              </button>
            </div>
            <div className="space-y-4">
              {surveys.slice(0, 2).map((survey) => (
                <div
                  key={survey.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push('/app/surveys')}
                >
                  <p className="font-semibold text-gray-900 text-sm mb-2">{survey.title}</p>
                  <p className="text-xs text-gray-500">
                    {survey.totalVotes}{language === 'ko' ? '명 참여' : ' votes'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Opinions */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: textDark }}>
                {t('home.popularOpinions')}
              </h2>
              <button
                onClick={() => router.push('/app/opinions')}
                className="text-sm font-medium"
                style={{ color: accentColor }}
              >
                {t('home.viewAll')}
              </button>
            </div>
            <div className="space-y-4">
              {opinions.slice(0, 2).map((opinion) => (
                <div
                  key={opinion.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push('/app/opinions')}
                >
                  <p className="font-semibold text-gray-900 text-sm mb-1">{opinion.title}</p>
                  <p className="text-xs text-gray-500 mb-2">
                    {opinion.author} · {opinion.likes}{language === 'ko' ? '명' : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest News */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: textDark }}>
                {t('home.latestNews')}
              </h2>
              <button
                onClick={() => router.push('/app/news')}
                className="text-sm font-medium"
                style={{ color: accentColor }}
              >
                {t('home.viewAll')}
              </button>
            </div>
            <div className="space-y-4">
              {news.slice(0, 2).map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push('/app/news')}
                >
                  <p className="font-semibold text-gray-900 text-sm mb-1">{newsItem.title}</p>
                  <p className="text-xs text-gray-500">
                    {newsItem.category === 'notice' && (language === 'ko' ? '공지' : 'Notice')}
                    {newsItem.category === 'schedule' && (language === 'ko' ? '일정' : 'Schedule')}
                    {newsItem.category === 'transfer' && (language === 'ko' ? '이적' : 'Transfer')}
                    {newsItem.category === 'event' && (language === 'ko' ? '이벤트' : 'Event')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: textDark }}>
              {t('home.upcomingMatches')}
            </h2>
            <button
              onClick={() => router.push('/app/match-center')}
              className="text-sm font-medium"
              style={{ color: accentColor }}
            >
              {t('home.viewAll')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.slice(0, 4).map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition cursor-pointer"
                onClick={() => router.push('/app/match-center')}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">
                    {match.date} {match.time}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{
                      backgroundColor: accentColor,
                      color: 'white',
                    }}
                  >
                    {match.status === 'scheduled' && (language === 'ko' ? '예정' : 'Scheduled')}
                    {match.status === 'live' && (language === 'ko' ? '진행 중' : 'Live')}
                    {match.status === 'finished' && (language === 'ko' ? '종료' : 'Finished')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="font-semibold text-gray-900">{match.homeTeam}</p>
                  </div>
                  <div className="px-4">
                    {match.status === 'finished' ? (
                      <p className="text-2xl font-bold" style={{ color: accentColor }}>
                        {match.homeScore} - {match.awayScore}
                      </p>
                    ) : (
                      <p className="text-gray-500">vs</p>
                    )}
                  </div>
                  <div className="text-center flex-1">
                    <p className="font-semibold text-gray-900">{match.awayTeam}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">{match.venue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sentiment Analysis */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6" style={{ color: textDark }}>
              {t('home.aiSummary')}
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{t('home.positive')}</span>
                  <span className="text-sm font-bold text-green-600">
                    {aiInsights?.sentiment.positive}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${aiInsights?.sentiment.positive}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{t('home.neutral')}</span>
                  <span className="text-sm font-bold text-gray-600">
                    {aiInsights?.sentiment.neutral}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full"
                    style={{ width: `${aiInsights?.sentiment.neutral}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{t('home.negative')}</span>
                  <span className="text-sm font-bold text-red-600">
                    {aiInsights?.sentiment.negative}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${aiInsights?.sentiment.negative}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Keywords */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6" style={{ color: textDark }}>
              {t('home.topKeywords')}
            </h2>
            <div className="space-y-3">
              {aiInsights?.keywords.slice(0, 5).map((keyword: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{keyword.word}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{keyword.frequency}</span>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded"
                      style={{
                        backgroundColor:
                          keyword.sentiment === 'positive'
                            ? '#dcfce7'
                            : keyword.sentiment === 'negative'
                              ? '#fee2e2'
                              : '#f3f4f6',
                        color:
                          keyword.sentiment === 'positive'
                            ? '#15803d'
                            : keyword.sentiment === 'negative'
                              ? '#991b1b'
                              : '#374151',
                      }}
                    >
                      {keyword.sentiment === 'positive' && (language === 'ko' ? '긍정' : 'Positive')}
                      {keyword.sentiment === 'neutral' && (language === 'ko' ? '중립' : 'Neutral')}
                      {keyword.sentiment === 'negative' && (language === 'ko' ? '부정' : 'Negative')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
