import { useRouter } from 'next/router'

interface FooterProps {
  teamColor?: any
}

export default function Footer({ teamColor }: FooterProps) {
  const router = useRouter()
  const accentColor = teamColor?.accentColor || '#3182CE'

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const footerLinks = [
    { label: 'FANCLUV 소개', action: () => alert('FANCLUV는 K리그 팬 커뮤니티 플랫폼입니다.') },
    { label: '이용약관', action: () => alert('이용약관 내용') },
    { label: '개인정보처리방침', action: () => alert('개인정보처리방침 내용') },
    { label: '문의하기', action: () => alert('문의: contact@fancluv.com') },
    { label: '구단 제휴 문의', action: () => alert('제휴 문의: partnership@fancluv.com') },
  ]

  return (
    <footer style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* Footer Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Brand */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: accentColor, marginBottom: '1rem' }}>
              FANCLUV
            </h3>
            <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.6' }}>
              K리그 팬들을 위한 최고의 커뮤니티 플랫폼
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
              서비스
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: '홈', path: '/app/dashboard' },
                { label: '설문', path: '/app/surveys' },
                { label: '팬 의견', path: '/app/opinions' },
                { label: '팀 뉴스', path: '/app/news' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = accentColor)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#666')}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
              커뮤니티
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: '커뮤니티', path: '/app/community' },
                { label: '경기센터', path: '/app/match-center' },
                { label: 'AI 인사이트', path: '/app/ai-insights' },
                { label: '팬 랭킹', path: '/app/rankings' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = accentColor)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#666')}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
              정보
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={link.action}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = accentColor)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#666')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          {/* Copyright */}
          <div style={{ textAlign: 'center', color: '#999', fontSize: '0.875rem' }}>
            <p>© 2026 FANCLUV. All rights reserved.</p>
            <p style={{ marginTop: '0.5rem' }}>
              K리그 팬 커뮤니티 플랫폼 | 팬들의 목소리를 모으는 공간
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
