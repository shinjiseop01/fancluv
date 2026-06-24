import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardNavigation from '../../components/DashboardNavigation'
import { getTeamColorByName } from '../../utils/teamColors'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

export default function About() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')

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
      'about.title': { ko: '소개', en: 'About' },
      'about.service': { ko: '서비스 소개', en: 'Service Introduction' },
      'about.vision': { ko: '비전', en: 'Vision' },
      'about.contact': { ko: '문의 및 제휴', en: 'Contact & Partnership' },
      'about.email': { ko: '이메일', en: 'Email' },
      'about.phone': { ko: '전화', en: 'Phone' },
      'about.partnership': { ko: '제휴 문의', en: 'Partnership Inquiry' },
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
            {t('about.title')}
          </h2>
          <p className="text-gray-600">
            {language === 'ko'
              ? 'FANCLUV는 K리그 팬들을 위한 통합 플랫폼입니다'
              : 'FANCLUV is an integrated platform for K-League fans'}
          </p>
        </div>

        {/* Service Introduction */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold mb-4" style={{ color: textDark }}>
            {t('about.service')}
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              {language === 'ko'
                ? 'FANCLUV는 K리그 팬들이 응원팀에 대한 의견을 나누고, 다른 팬들과 소통하며, 팀의 최신 소식을 받을 수 있는 플랫폼입니다.'
                : 'FANCLUV is a platform where K-League fans can share opinions about their favorite teams, communicate with other fans, and receive the latest news about their teams.'}
            </p>
            <p>
              {language === 'ko'
                ? '설문, 팬 의견, 커뮤니티, 팬 랭킹 등 다양한 기능을 통해 팬 커뮤니티를 활성화하고 있습니다.'
                : 'We are activating the fan community through various features such as surveys, fan opinions, community, and fan rankings.'}
            </p>
            <p>
              {language === 'ko'
                ? 'AI 기술을 활용하여 팬들의 감정을 분석하고, 주요 키워드를 추출하여 팬 만족도를 측정합니다.'
                : 'We use AI technology to analyze fan sentiments, extract key keywords, and measure fan satisfaction.'}
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold mb-4" style={{ color: textDark }}>
            {t('about.vision')}
          </h3>
          <div className="space-y-4 text-gray-600">
            <div>
              <p className="font-semibold text-gray-900 mb-2">
                {language === 'ko' ? '1. 팬 커뮤니티 활성화' : '1. Activate Fan Community'}
              </p>
              <p>
                {language === 'ko'
                  ? '팬들이 자유롭게 의견을 나누고 소통할 수 있는 건강한 커뮤니티를 만들어갑니다.'
                  : 'We create a healthy community where fans can freely share opinions and communicate.'}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">
                {language === 'ko' ? '2. 팀과 팬의 소통 강화' : '2. Strengthen Communication Between Teams and Fans'}
              </p>
              <p>
                {language === 'ko'
                  ? '팀의 소식을 빠르게 전달하고, 팬들의 목소리를 팀에 전달합니다.'
                  : 'We quickly deliver team news and convey fan voices to teams.'}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">
                {language === 'ko' ? '3. 데이터 기반 인사이트 제공' : '3. Provide Data-Driven Insights'}
              </p>
              <p>
                {language === 'ko'
                  ? 'AI를 활용한 팬 감정 분석과 키워드 추출을 통해 의미 있는 인사이트를 제공합니다.'
                  : 'We provide meaningful insights through AI-powered fan sentiment analysis and keyword extraction.'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Partnership */}
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold mb-6" style={{ color: textDark }}>
            {t('about.contact')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                {language === 'ko' ? '문의' : 'Contact'}
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('about.email')}</p>
                  <p className="font-medium text-gray-900">support@fancluv.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('about.phone')}</p>
                  <p className="font-medium text-gray-900">02-1234-5678</p>
                </div>
              </div>
            </div>

            {/* Partnership */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                {t('about.partnership')}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'ko'
                  ? '팀, 스폰서, 미디어 등 다양한 제휴 기회를 제공하고 있습니다.'
                  : 'We offer various partnership opportunities with teams, sponsors, and media.'}
              </p>
              <button
                className="px-6 py-3 text-white font-semibold rounded-lg transition"
                style={{ backgroundColor: accentColor }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.9')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
              >
                {language === 'ko' ? '제휴 문의하기' : 'Contact for Partnership'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 FANCLUV. All rights reserved.</p>
        </div>
      </main>
    </div>
  )
}
