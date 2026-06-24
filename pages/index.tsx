import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { LanguageToggle } from '@/components/LanguageToggle'

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

export default function Home() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError(t('login.required'))
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || t('login.error'))
      }

      const data = await response.json()
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Check if user has selected a team
        if (data.user.selectedTeam) {
          await router.push('/app')
        } else {
          await router.push('/team-selection')
        }
      }
    } catch (err: any) {
      setError(err.message || t('login.error'))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Language Toggle in Header */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
        <LanguageToggle />
      </div>

      {/* Left Section - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
        {/* Background Image */}
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663766023039/6feq7sSR5cPzhnk9XQd9fb/kleague-stadium-fans-jxdcWbreWUGgwVdrXQVX5U.webp"
          alt="K리그 경기장"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-55"></div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top Content with Blur Background */}
          <div>
            <div className="text-white mb-8 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-5xl font-bold mb-4 text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{t('login.title')}</h2>
              <p className="text-xl font-light text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{t('login.tagline')}</p>
            </div>
          </div>
          
          {/* Bottom Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-400 bg-opacity-20">
                    <svg className="h-6 w-6 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{t('login.features.shareOpinion')}</p>
                  <p className="text-primary-100 text-sm">{t('login.features.shareOpinionDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-400 bg-opacity-20">
                    <svg className="h-6 w-6 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{t('login.features.participateSurvey')}</p>
                  <p className="text-primary-100 text-sm">{t('login.features.participateSurveyDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-400 bg-opacity-20">
                    <svg className="h-6 w-6 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{t('login.features.fanCommunity')}</p>
                  <p className="text-primary-100 text-sm">{t('login.features.fanCommunityDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('login.title')}</h1>
            <p className="text-gray-600 text-sm">{t('login.tagline')}</p>
          </div>

          {/* Form Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('login.heading')}</h2>
            <p className="text-gray-600">{t('login.description')}</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}
          
          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">{t('login.email')}</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder')}
                disabled={loading}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">{t('login.password')}</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
                disabled={loading}
                className="w-full"
              />
            </div>
            
            {/* Enhanced CTA Button with Red Arrow */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 font-semibold text-base bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
            >
              <span>{loading ? t('common.processing') : t('login.loginButton')}</span>
              {!loading && (
                <svg 
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="#EF4444" 
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t('login.or')}</span>
            </div>
          </div>
          
          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              {t('login.noAccount')}{' '}
              <Link href="/signup" className="font-semibold text-primary-600 hover:text-primary-700 transition">
                {t('login.signupLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
