import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getTeamColorByName } from '../utils/teamColors'

interface User {
  id: string
  email: string
  nickname: string
  selectedTeamId?: string
  selectedTeam?: any
}

interface Team {
  id: string
  name: string
  nameEn: string
  city: string
  cityEn: string
  logo_url: string
}

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  const [showTeamChangeModal, setShowTeamChangeModal] = useState(false)
  const [clubs, setClubs] = useState<Club[]>([])
  const [selectedNewTeam, setSelectedNewTeam] = useState<Club | null>(null)

  interface Club {
    id: string
    name: string
    nameEn: string
    logo_url: string
    city: string
    cityEn: string
  }

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

  const handleOpenTeamChangeModal = async () => {
    try {
      const response = await fetch('/api/clubs')
      if (response.ok) {
        const data = await response.json()
        setClubs(data)
        setShowTeamChangeModal(true)
      }
    } catch (err) {
      console.error('클럽 로드 오류:', err)
    }
  }

  const handleChangeTeam = async () => {
    if (!selectedNewTeam) {
      alert('구단을 선택해주세요')
      return
    }

    try {
      const teamData = {
        id: selectedNewTeam.id,
        name: selectedNewTeam.name,
        nameEn: selectedNewTeam.nameEn,
        city: selectedNewTeam.city,
        cityEn: selectedNewTeam.cityEn,
        logo_url: selectedNewTeam.logo_url,
      }

      // localStorage에 팀 정보 저장
      localStorage.setItem('selectedTeam', JSON.stringify(teamData))
      localStorage.setItem('selectedTeamId', selectedNewTeam.id)

      // 사용자 프로필에도 팀 정보 저장
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const userData = JSON.parse(userStr)
        userData.selectedTeamId = selectedNewTeam.id
        userData.selectedTeam = teamData
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
      }

      setTeam(teamData)
      const color = getTeamColorByName(teamData.name)
      setTeamColor(color)
      setShowTeamChangeModal(false)
      setSelectedNewTeam(null)

      alert('응원 팀이 변경되었습니다')
    } catch (err) {
      console.error('오류:', err)
      alert('오류가 발생했습니다')
    }
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

  const bgColor = teamColor?.bgColor || '#1a1a1a'
  const primaryColor = teamColor?.primary || '#000000'
  const textColor = teamColor?.textColor || '#FFFFFF'

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      {/* Header */}
      <header className="border-b" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold" style={{ color: textColor }}>
              FANCLUV
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/app/dashboard')}
              className="text-sm font-medium transition"
              style={{ color: textColor, opacity: 0.8 }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.8')}
            >
              대시보드
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('user')
                router.push('/login')
              }}
              className="text-sm font-medium transition"
              style={{ color: textColor, opacity: 0.8 }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.8')}
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: textColor }}>
            프로필
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            계정 정보 및 응원 팀을 관리하세요
          </p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Account Info */}
          <section className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">계정 정보</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  이메일
                </label>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  닉네임
                </label>
                <p className="text-lg font-semibold text-gray-900">{user.nickname}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  가입일
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
          </section>

          {/* Team Info */}
          <section className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">응원 팀</h3>

            {team ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    팀 이름
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{team.logo_url}</span>
                    <p className="text-lg font-semibold text-gray-900">{team.name}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    도시
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{team.city}</p>
                </div>

                <button
                  onClick={handleOpenTeamChangeModal}
                  className="w-full text-white font-medium py-3 rounded-lg transition"
                  style={{ backgroundColor: primaryColor }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.opacity = '0.9')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.opacity = '1')
                  }
                >
                  응원 팀 변경
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">아직 응원 팀을 선택하지 않았습니다</p>
                <button
                  onClick={handleOpenTeamChangeModal}
                  className="px-6 py-2 text-white font-medium rounded-lg transition"
                  style={{ backgroundColor: primaryColor }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.opacity = '0.9')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.opacity = '1')
                  }
                >
                  팀 선택
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Team Change Modal */}
      {showTeamChangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">응원 팀 선택</h3>
              <button
                onClick={() => {
                  setShowTeamChangeModal(false)
                  setSelectedNewTeam(null)
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {clubs.map((club) => (
                  <div
                    key={club.id}
                    onClick={() => setSelectedNewTeam(club)}
                    className={`p-6 rounded-lg border-2 transition cursor-pointer ${
                      selectedNewTeam?.id === club.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-4xl mb-2 text-center">{club.logo_url}</div>
                    <p className="font-semibold text-sm text-center text-gray-900">
                      {club.name}
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-1">{club.city}</p>
                    {selectedNewTeam?.id === club.id && (
                      <div className="text-center mt-3 text-blue-600 text-sm font-bold">
                        ✓ 선택됨
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowTeamChangeModal(false)
                    setSelectedNewTeam(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  취소
                </button>
                <button
                  onClick={handleChangeTeam}
                  disabled={!selectedNewTeam}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
