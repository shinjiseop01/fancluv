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

interface Activity {
  id: string
  type: 'opinion' | 'comment' | 'survey' | 'like'
  title: string
  content: string
  date: string
  likes?: number
}

export default function MyActivity() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'opinions' | 'comments' | 'surveys' | 'likes'>('opinions')
  const [activities, setActivities] = useState<Activity[]>([])

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

    // Mock 활동 데이터
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'opinion',
        title: '이번 경기 분석',
        content: '좋은 경기였습니다. 선수들의 활약이 돋보였어요.',
        date: '2026-06-24',
        likes: 12,
      },
      {
        id: '2',
        type: 'comment',
        title: '선수 평가 글에 댓글',
        content: '동의합니다. 정말 좋은 의견입니다.',
        date: '2026-06-23',
      },
      {
        id: '3',
        type: 'survey',
        title: '캡틴 선발 투표',
        content: '투표 완료: 선수 A에 투표했습니다.',
        date: '2026-06-22',
      },
      {
        id: '4',
        type: 'like',
        title: '좋아요 누른 글',
        content: '팬 의견: "우리 팀 화이팅!"',
        date: '2026-06-21',
      },
    ]

    setActivities(mockActivities)
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

  const textDark = '#1f2937'
  const accentColor = teamColor?.accentColor || '#3182CE'
  const pastelBg = teamColor?.pastelBg || '#EBF8FF'

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'opinion':
        return '💬'
      case 'comment':
        return '💭'
      case 'survey':
        return '📊'
      case 'like':
        return '❤️'
      default:
        return '📝'
    }
  }

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'opinion':
        return '의견 작성'
      case 'comment':
        return '댓글 작성'
      case 'survey':
        return '설문 참여'
      case 'like':
        return '좋아요'
      default:
        return '활동'
    }
  }

  const filteredActivities = activities.filter((activity) => {
    if (activeTab === 'opinions') return activity.type === 'opinion'
    if (activeTab === 'comments') return activity.type === 'comment'
    if (activeTab === 'surveys') return activity.type === 'survey'
    if (activeTab === 'likes') return activity.type === 'like'
    return true
  })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: pastelBg }}>
      <DashboardNavigation user={user} team={team} onLogout={handleLogout} />

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: textDark, marginBottom: '0.5rem' }}>
            내 활동
          </h1>
          <p style={{ color: '#666' }}>
            {user?.nickname}님의 활동 내역을 확인하세요
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: `2px solid ${accentColor}` }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>작성한 의견</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor }}>
              {activities.filter((a) => a.type === 'opinion').length}
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: `2px solid ${accentColor}` }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>작성한 댓글</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor }}>
              {activities.filter((a) => a.type === 'comment').length}
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: `2px solid ${accentColor}` }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>참여한 설문</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor }}>
              {activities.filter((a) => a.type === 'survey').length}
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: `2px solid ${accentColor}` }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>받은 좋아요</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor }}>
              {activities.reduce((sum, a) => sum + (a.likes || 0), 0)}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: `2px solid #e5e7eb`, flexWrap: 'wrap' }}>
          {['opinions', 'comments', 'surveys', 'likes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '1rem',
                backgroundColor: activeTab === tab ? pastelBg : 'transparent',
                color: activeTab === tab ? accentColor : '#666',
                border: 'none',
                borderBottom: activeTab === tab ? `3px solid ${accentColor}` : 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: activeTab === tab ? '600' : '500',
              }}
            >
              {tab === 'opinions' && '의견 작성'}
              {tab === 'comments' && '댓글 작성'}
              {tab === 'surveys' && '설문 참여'}
              {tab === 'likes' && '좋아요'}
            </button>
          ))}
        </div>

        {/* Activities List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  border: `1px solid #e5e7eb`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>{getActivityIcon(activity.type)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: textDark, marginBottom: '0.25rem' }}>
                          {activity.title}
                        </h3>
                        <p style={{ fontSize: '0.75rem', color: '#999' }}>
                          {getActivityLabel(activity.type)} • {activity.date}
                        </p>
                      </div>
                      {activity.likes && (
                        <div style={{ color: accentColor, fontWeight: '600' }}>
                          ❤️ {activity.likes}
                        </div>
                      )}
                    </div>
                    <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      {activity.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#999' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <p>활동 내역이 없습니다</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
