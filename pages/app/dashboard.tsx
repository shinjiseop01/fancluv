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

interface Survey {
  id: string
  title: string
  total: number
  participated: number
  endDate: string
}

interface Opinion {
  id: string
  author: string
  content: string
  likes: number
  comments: number
  date: string
}

interface News {
  id: string
  title: string
  date: string
  category: string
}

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  stadium: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login')
      return
    }

    const userData = JSON.parse(userStr)
    setUser(userData)

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
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <DashboardNavigation user={user} team={team} onLogout={handleLogout} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#666' }}>로드 중...</p>
          </div>
        </div>
      </div>
    )
  }

  const accentColor = teamColor?.accentColor || '#3182CE'
  const pastelBg = teamColor?.pastelBg || '#EBF8FF'
  const textDark = '#1f2937'

  // Mock 데이터
  const stats = [
    { label: '활동 중인 팬', value: '1,234', icon: '👥' },
    { label: '총 의견 수', value: '5,678', icon: '💬' },
    { label: '총 댓글 수', value: '9,012', icon: '💭' },
    { label: '팬 만족도', value: '87%', icon: '😊' },
  ]

  const recentSurveys: Survey[] = [
    {
      id: '1',
      title: '이번 시즌 최고의 선수는?',
      total: 2345,
      participated: 1234,
      endDate: '2026-06-30',
    },
    {
      id: '2',
      title: '다음 경기 승리 예측',
      total: 1890,
      participated: 945,
      endDate: '2026-06-28',
    },
  ]

  const popularOpinions: Opinion[] = [
    {
      id: '1',
      author: '팬A',
      content: '이번 경기는 정말 최고의 경기였어요! 선수들의 활약이 정말 좋았습니다.',
      likes: 234,
      comments: 45,
      date: '2026-06-24',
    },
    {
      id: '2',
      author: '팬B',
      content: '우리 팀 화이팅! 다음 경기도 승리할 것 같아요.',
      likes: 189,
      comments: 32,
      date: '2026-06-23',
    },
  ]

  const latestNews: News[] = [
    {
      id: '1',
      title: '구단 공식 발표: 신입 선수 영입 소식',
      date: '2026-06-24',
      category: '공지',
    },
    {
      id: '2',
      title: '다음 경기 경기 일정 확정',
      date: '2026-06-23',
      category: '경기일정',
    },
  ]

  const upcomingMatches: Match[] = [
    {
      id: '1',
      homeTeam: team?.name || '우리팀',
      awayTeam: '상대팀A',
      date: '2026-06-28',
      time: '19:00',
      stadium: '주경기장',
    },
    {
      id: '2',
      homeTeam: team?.name || '우리팀',
      awayTeam: '상대팀B',
      date: '2026-07-05',
      time: '15:00',
      stadium: '원정경기장',
    },
  ]

  const aiSummary = {
    sentiment: '긍정적',
    sentimentScore: 78,
    topKeywords: ['승리', '선수', '경기', '화이팅', '최고'],
    fanSatisfaction: 87,
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: pastelBg }}>
      <DashboardNavigation user={user} team={team} onLogout={handleLogout} />

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: textDark, marginBottom: '0.5rem' }}>
            안녕하세요, {user?.nickname}님! 👋
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666' }}>
            {team?.name}의 최신 소식과 팬 활동을 확인하세요
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: `2px solid ${accentColor}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Recent Surveys */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: textDark }}>
                📊 최신 설문
              </h2>
              <button
                onClick={() => router.push('/app/surveys')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: accentColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                더보기
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentSurveys.map((survey) => (
                <div
                  key={survey.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: `1px solid #e5e7eb`,
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push('/app/surveys')}
                >
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: textDark, marginBottom: '0.5rem' }}>
                    {survey.title}
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                    참여: {survey.participated} / {survey.total}
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: accentColor,
                        width: `${(survey.participated / survey.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Opinions */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: textDark }}>
                💬 인기 의견
              </h2>
              <button
                onClick={() => router.push('/app/opinions')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: accentColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                더보기
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {popularOpinions.map((opinion) => (
                <div
                  key={opinion.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: `1px solid #e5e7eb`,
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push('/app/opinions')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: textDark }}>{opinion.author}</span>
                    <span style={{ fontSize: '0.75rem', color: '#999' }}>{opinion.date}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem', lineHeight: '1.5' }}>
                    {opinion.content}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#999' }}>
                    <span>❤️ {opinion.likes}</span>
                    <span>💬 {opinion.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Latest News & Matches */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Latest News */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: textDark }}>
                📰 최신 뉴스
              </h2>
              <button
                onClick={() => router.push('/app/news')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: accentColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                더보기
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {latestNews.map((news) => (
                <div
                  key={news.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: `1px solid #e5e7eb`,
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push('/app/news')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        backgroundColor: accentColor,
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                      }}
                    >
                      {news.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#999' }}>{news.date}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: textDark, fontWeight: '500' }}>
                    {news.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Matches */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: textDark }}>
                ⚽ 경기 일정
              </h2>
              <button
                onClick={() => router.push('/app/match-center')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: accentColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                더보기
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingMatches.map((match) => (
                <div
                  key={match.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: `1px solid #e5e7eb`,
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push('/app/match-center')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#999' }}>{match.date}</span>
                    <span style={{ fontSize: '0.875rem', color: '#999' }}>{match.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: textDark }}>{match.homeTeam}</span>
                    <span style={{ color: '#999' }}>vs</span>
                    <span style={{ fontWeight: '600', color: textDark }}>{match.awayTeam}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#999' }}>📍 {match.stadium}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* AI Summary */}
        <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: `2px solid ${accentColor}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: textDark }}>
              🤖 AI 요약
            </h2>
            <button
              onClick={() => router.push('/app/ai-insights')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: accentColor,
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              상세보기
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                팬 감정
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: accentColor }}>
                {aiSummary.sentiment}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#999' }}>
                점수: {aiSummary.sentimentScore}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                팬 만족도
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: accentColor }}>
                {aiSummary.fanSatisfaction}%
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              주요 키워드
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {aiSummary.topKeywords.map((keyword, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: pastelBg,
                    color: accentColor,
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  }}
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
