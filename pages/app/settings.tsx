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

interface Team {
  id: string
  name: string
  nameEn: string
  city: string
  cityEn: string
  logo_url: string
}

interface Club {
  id: string
  name: string
  nameEn: string
  logo_url: string
  city: string
  cityEn: string
}

export default function Settings() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)
  const [teamColor, setTeamColor] = useState<any>(null)
  
  // 닉네임 변경
  const [newNickname, setNewNickname] = useState('')
  const [nicknameEditing, setNicknameEditing] = useState(false)
  const [nicknameSaving, setNicknameSaving] = useState(false)
  
  // 팀 변경
  const [showTeamChangeModal, setShowTeamChangeModal] = useState(false)
  const [clubs, setClubs] = useState<Club[]>([])
  const [selectedNewTeam, setSelectedNewTeam] = useState<Club | null>(null)
  
  // 언어 설정
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login')
      return
    }

    const userData = JSON.parse(userStr)
    setUser(userData)
    setNewNickname(userData.nickname)

    // 언어 설정 확인
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

  const handleSaveNickname = async () => {
    if (!newNickname.trim()) {
      alert('닉네임을 입력해주세요')
      return
    }

    if (newNickname === user?.nickname) {
      setNicknameEditing(false)
      return
    }

    setNicknameSaving(true)
    try {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const userData = JSON.parse(userStr)
        userData.nickname = newNickname
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        setNicknameEditing(false)
        alert('닉네임이 변경되었습니다')
      }
    } catch (err) {
      alert('오류가 발생했습니다')
    } finally {
      setNicknameSaving(false)
    }
  }

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

      localStorage.setItem('selectedTeam', JSON.stringify(teamData))
      localStorage.setItem('selectedTeamId', selectedNewTeam.id)

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

  const handleChangeLanguage = (lang: 'ko' | 'en') => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    // 다른 페이지에 언어 변경을 알림
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }))
    }
    alert(`언어가 ${lang === 'ko' ? '한국어' : 'English'}로 변경되었습니다`)
  }

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

  return (
    <div style={{ backgroundColor: pastelBg }} className="min-h-screen">
      {/* Navigation */}
      <DashboardNavigation
        user={user}
        team={team}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Settings Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: textDark }}>
            설정
          </h2>
          <p className="text-gray-600">
            계정 정보, 응원 팀, 언어를 관리하세요
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Account Settings */}
          <section className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">계정 설정</h3>

            <div className="space-y-6">
              {/* Nickname */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  닉네임
                </label>
                {nicknameEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newNickname}
                      onChange={(e) => setNewNickname(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      disabled={nicknameSaving}
                    />
                    <button
                      onClick={handleSaveNickname}
                      disabled={nicknameSaving}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition"
                    >
                      {nicknameSaving ? '저장 중...' : '저장'}
                    </button>
                    <button
                      onClick={() => {
                        setNicknameEditing(false)
                        setNewNickname(user.nickname)
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">{user.nickname}</p>
                    <button
                      onClick={() => setNicknameEditing(true)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                    >
                      변경
                    </button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  이메일
                </label>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">이메일은 변경할 수 없습니다</p>
              </div>
            </div>
          </section>

          {/* Team Settings */}
          <section className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">응원 팀</h3>

            {team ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{team.logo_url}</span>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{team.name}</p>
                    <p className="text-sm text-gray-500">{team.city}</p>
                  </div>
                </div>
                <button
                  onClick={handleOpenTeamChangeModal}
                  className="w-full text-white font-medium py-3 rounded-lg transition"
                  style={{ backgroundColor: accentColor }}
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
                  style={{ backgroundColor: accentColor }}
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

          {/* Language Settings */}
          <section className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">언어 설정</h3>

            <div className="space-y-3">
              <button
                onClick={() => handleChangeLanguage('ko')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                  language === 'ko'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: language === 'ko' ? accentColor : undefined,
                }}
              >
                한국어 {language === 'ko' && '✓'}
              </button>
              <button
                onClick={() => handleChangeLanguage('en')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                  language === 'en'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: language === 'en' ? accentColor : undefined,
                }}
              >
                English {language === 'en' && '✓'}
              </button>
            </div>
          </section>

          {/* Logout */}
          <section className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">로그아웃</h3>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
            >
              로그아웃
            </button>
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
