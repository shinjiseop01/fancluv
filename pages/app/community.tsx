import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'
import { generateMockCommunityPosts } from '../../data/mockData'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function Community() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const [posts, setPosts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: { ko: '전체', en: 'All' } },
    { id: 'free', label: { ko: '자유게시판', en: 'Free Board' } },
    { id: 'match', label: { ko: '경기 토론', en: 'Match Discussion' } },
    { id: 'stadium', label: { ko: '직관 후기', en: 'Stadium Review' } },
    { id: 'away', label: { ko: '원정 후기', en: 'Away Trip' } },
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

    setPosts(generateMockCommunityPosts())
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

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === selectedCategory)

  const t = (key: string) => {
    const translations: { [key: string]: { ko: string; en: string } } = {
      'community.title': { ko: '커뮤니티', en: 'Community' },
      'community.subtitle': { ko: '팬들과 함께 이야기하세요', en: 'Share your thoughts with other fans' },
      'community.write': { ko: '글 작성', en: 'Write Post' },
      'community.likes': { ko: '좋아요', en: 'Likes' },
      'community.comments': { ko: '댓글', en: 'Comments' },
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
            {t('community.title')}
          </h2>
          <p className="text-gray-600 mb-6">{t('community.subtitle')}</p>
          <button
            className="px-6 py-3 text-white font-semibold rounded-lg transition"
            style={{ backgroundColor: accentColor }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.9')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            {t('community.write')}
          </button>
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

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    {post.author} · {post.createdAt}
                  </p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white whitespace-nowrap ml-4"
                  style={{ backgroundColor: accentColor }}
                >
                  {post.category === 'free' && (language === 'ko' ? '자유' : 'Free')}
                  {post.category === 'match' && (language === 'ko' ? '경기' : 'Match')}
                  {post.category === 'stadium' && (language === 'ko' ? '직관' : 'Stadium')}
                  {post.category === 'away' && (language === 'ko' ? '원정' : 'Away')}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.content}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {language === 'ko' ? '게시물이 없습니다' : 'No posts available'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
