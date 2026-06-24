import { useState } from 'react'
import { useRouter } from 'next/router'


export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [navigating, setNavigating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !nickname || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요')
      return
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다')
      return
    }

    setLoading(true)
    try {
      const user = {
        id: 'user-' + Date.now(),
        email: email,
        nickname: nickname,
        selectedTeamId: null,
        selectedTeam: null,
      }

      localStorage.setItem('user', JSON.stringify(user))

      // 회원가입 성공 후 팀 선택 페이지로 즉시 이동
      await router.push('/team-selection')
    } catch (err: any) {
      setError('회원가입 중 오류가 발생했습니다')
      setLoading(false)
    }
  }

  const handleNavigateToLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigating) return
    
    setNavigating(true)
    try {
      await router.push('/login')
    } catch (err) {
      console.error('로그인 페이지 이동 오류:', err)
      setNavigating(false)
    }
  }

  const handleNavigateHome = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigating) return
    
    setNavigating(true)
    try {
      await router.push('/')
    } catch (err) {
      console.error('홈 페이지 이동 오류:', err)
      setNavigating(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
            FANCLUV
          </h1>
          <p style={{ color: '#93c5fd' }}>K리그 팬들의 목소리를 모으다</p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
            회원가입
          </h2>

          {/* Error Message */}
          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Email Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  cursor: loading ? 'not-allowed' : 'text',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Nickname Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  cursor: loading ? 'not-allowed' : 'text',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Password Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  cursor: loading ? 'not-allowed' : 'text',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  cursor: loading ? 'not-allowed' : 'text',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Signup Button - 명확하게 표시 */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '2rem',
                backgroundColor: '#dc2626',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.8 : 1,
                transition: 'all 0.2s',
                boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.3)',
                position: 'relative',
                zIndex: 10,
                display: 'block',
                visibility: 'visible',
              }}
            >
              {loading ? '회원가입 중...' : '회원가입하기'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ position: 'relative', margin: '1.5rem 0' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%', borderTop: '1px solid #d1d5db' }}></div>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', fontSize: '0.875rem' }}>
              <span style={{ padding: '0 0.5rem', backgroundColor: 'white', color: '#6b7280' }}>또는</span>
            </div>
          </div>

          {/* Login Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>
              이미 계정이 있으신가요?{' '}
              <button
                type="button"
                onClick={handleNavigateToLogin}
                disabled={navigating}
                style={{
                  fontWeight: '600',
                  color: '#2563eb',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: navigating ? 'not-allowed' : 'pointer',
                  textDecoration: 'underline',
                  opacity: navigating ? 0.6 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                로그인
              </button>
            </p>
          </div>

          {/* Back Home */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
            <button
              type="button"
              onClick={handleNavigateHome}
              disabled={navigating}
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: '#4b5563',
                fontWeight: '500',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: navigating ? 'not-allowed' : 'pointer',
                opacity: navigating ? 0.6 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
