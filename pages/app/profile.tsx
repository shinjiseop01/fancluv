import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useEffect, useState } from 'react'

interface UserProfile {
  id: string
  email: string
  nickname: string
  favorite_club_id: string
  created_at: string
}

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState({ opinions: 0, surveys: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userStr = localStorage.getItem('user')
        if (!userStr) throw new Error('사용자 정보 없음')

        const user = JSON.parse(userStr)

        // Get user profile
        const profileRes = await fetch(`/api/users/profile?userId=${user.id}`)
        if (!profileRes.ok) throw new Error('프로필 로드 실패')
        const profileData = await profileRes.json()
        setProfile(profileData)

        // Get user stats (opinions and surveys)
        const opinionsRes = await fetch(`/api/opinions?userId=${user.id}`)
        const surveysRes = await fetch(`/api/surveys?userId=${user.id}`)

        const opinionsCount = opinionsRes.ok ? (await opinionsRes.json()).length : 0
        const surveysCount = surveysRes.ok ? (await surveysRes.json()).length : 0

        setStats({ opinions: opinionsCount, surveys: surveysCount })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20 md:pb-0">
        <p className="text-gray-600">로드 중...</p>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20 md:pb-0">
        <p className="text-red-600">{error || '프로필을 찾을 수 없습니다.'}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">프로필</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>사용자 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">닉네임</p>
                <p className="font-semibold">{profile.nickname}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">이메일</p>
                <p className="font-semibold text-sm">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">응원팀</p>
                <p className="font-semibold">구단 {profile.favorite_club_id}</p>
              </div>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                로그아웃
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>활동 통계</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">작성한 의견</p>
                <p className="text-2xl font-bold">{stats.opinions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">참여한 설문</p>
                <p className="text-2xl font-bold">{stats.surveys}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>기여도</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">레벨</p>
                <p className="text-2xl font-bold">⭐ {Math.floor(stats.opinions / 5) + 1}</p>
              </div>
              <p className="text-xs text-gray-500">의견 작성으로 레벨 상승</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>계정 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">가입일:</span>{' '}
                <span className="font-semibold">{new Date(profile.created_at).toLocaleDateString()}</span>
              </p>
              <p>
                <span className="text-gray-600">사용자 ID:</span>{' '}
                <span className="font-semibold text-xs">{profile.id}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
