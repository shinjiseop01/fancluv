import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Club {
  id: string
  name: string
  nameEn: string
  logo_url: string
  city: string
  cityEn: string
}

export default function TeamSelection() {
  const router = useRouter()
  const [clubs, setClubs] = useState<Club[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Club | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [hasExistingTeam, setHasExistingTeam] = useState(false)

  useEffect(() => {
    // 기존 팀이 있는지 확인
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login')
      return
    }

    const user = JSON.parse(userStr)
    if (user.selectedTeamId) {
      // 기존 팀이 있으면 대시보드로 직접 이동
      setHasExistingTeam(true)
      router.push('/app/dashboard')
      return
    }

    const fetchClubs = async () => {
      try {
        const response = await fetch('/api/clubs')
        if (response.ok) {
          const data = await response.json()
          setClubs(data)
        }
      } catch (err) {
        console.error('클럽 로드 오류:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchClubs()
  }, [router])

  const handleTeamSelect = (club: Club) => {
    if (!submitting) {
      setSelectedTeam(club)
    }
  }

  const handleContinue = async () => {
    if (!selectedTeam) {
      alert('구단을 선택해주세요')
      return
    }

    setSubmitting(true)
    try {
      const teamData = {
        id: selectedTeam.id,
        name: selectedTeam.name,
        nameEn: selectedTeam.nameEn,
        city: selectedTeam.city,
        cityEn: selectedTeam.cityEn,
        logo_url: selectedTeam.logo_url,
      }

      // 팀 정보를 localStorage에 저장
      localStorage.setItem('selectedTeam', JSON.stringify(teamData))
      localStorage.setItem('selectedTeamId', selectedTeam.id)

      // 사용자 프로필에도 팀 정보 저장
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        user.selectedTeamId = selectedTeam.id
        user.selectedTeam = teamData
        localStorage.setItem('user', JSON.stringify(user))
      }

      // 즉시 이동
      router.push('/app/dashboard')
    } catch (err) {
      console.error('오류:', err)
      alert('오류가 발생했습니다')
      setSubmitting(false)
    }
  }

  if (hasExistingTeam) {
    return null
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">응원 구단 선택</h1>
          <p className="text-gray-600">당신이 응원하는 K리그 구단을 선택해주세요</p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {clubs.map((club) => (
            <div
              key={club.id}
              onClick={() => handleTeamSelect(club)}
              className={`p-6 rounded-lg border-2 transition cursor-pointer ${
                selectedTeam?.id === club.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
              } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-4xl mb-2 text-center">{club.logo_url}</div>
              <p className="font-semibold text-sm text-center text-gray-900">{club.name}</p>
              <p className="text-xs text-gray-500 text-center mt-1">{club.city}</p>
              {selectedTeam?.id === club.id && (
                <div className="text-center mt-3 text-blue-600 text-sm font-bold">
                  ✓ 선택됨
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          {selectedTeam ? (
            <button
              onClick={handleContinue}
              disabled={submitting}
              className="px-12 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg transition duration-200 text-lg shadow-lg hover:shadow-xl"
            >
              {submitting ? '처리 중...' : '다음'}
            </button>
          ) : (
            <button disabled className="px-12 py-3 bg-gray-300 text-gray-600 font-bold rounded-lg cursor-not-allowed">
              구단을 선택해주세요
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
