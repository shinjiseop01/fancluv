import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'
import { generateMockNews } from '../../data/mockData'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function News() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const [news, setNews] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: { ko: '전체', en: 'All' } },
    { id: 'notice', label: { ko: '공지', en: 'Notice' } },
    { id: 'schedule', label: { ko: '일정', en: 'Schedule' } },
    { id: 'transfer', label: { ko: '이적', en: 'Transfer' } },
    { id: 'event', label: { ko: '이벤트', en: 'Event' } },
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

    setNews(generateMockNews())
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

  const filteredNews =
    selectedCategory === 'all'
      ? news
      : news.filter((n) => n.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      notice: '#3b82f6',
      schedule: '#8b5cf6',
      transfer: '#ec4899',
      event: '#f59e0b',
    }
    return colors[category] || accentColor
  }

  const t = (key: string) => {
    const translations: { [key: string]: { ko: string; en: string } } = {
      'news.title': { ko: '팀 뉴스', en: 'Team News' },
      'news.subtitle': { ko: '우리 팀의 최신 소식을 확인하세요', en: 'Check the latest news about our team' },
      'news.officialSite': { ko: '공식 홈페이지', en: 'Official Website' },
      'news.sns': { ko: 'SNS 팔로우', en: 'Follow SNS' },
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
            {t('news.title')}
          </h2>
          <p className="text-gray-600 mb-8">{t('news.subtitle')}</p>

          {/* Official Links */}
          <div className="flex flex-wrap gap-4">
            <button
              className="px-6 py-3 text-white font-semibold rounded-lg transition"
              style={{ backgroundColor: accentColor }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.9')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
            >
              🌐 {t('news.officialSite')}
            </button>
            <button
              className="px-6 py-3 text-white font-semibold rounded-lg transition bg-blue-500 hover:bg-blue-600"
            >
              📱 {t('news.sns')}
            </button>
          </div>
        </div>

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

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map((newsItem) => (
            <div
              key={newsItem.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition cursor-pointer"
            >
              {/* Category Badge */}
              <div
                className="h-1"
                style={{ backgroundColor: getCategoryColor(newsItem.category) }}
              ></div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: getCategoryColor(newsItem.category) }}
                  >
                    {newsItem.category === 'notice' && (language === 'ko' ? '공지' : 'Notice')}
                    {newsItem.category === 'schedule' && (language === 'ko' ? '일정' : 'Schedule')}
                    {newsItem.category === 'transfer' && (language === 'ko' ? '이적' : 'Transfer')}
                    {newsItem.category === 'event' && (language === 'ko' ? '이벤트' : 'Event')}
                  </span>
                  <span className="text-xs text-gray-500">{newsItem.createdAt}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{newsItem.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{newsItem.content}</p>

                {/* Read More Button */}
                <button
                  className="text-sm font-semibold transition"
                  style={{ color: accentColor }}
                >
                  {language === 'ko' ? '더 보기 →' : 'Read More →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {language === 'ko' ? '뉴스가 없습니다' : 'No news available'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
