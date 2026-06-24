import { useEffect, useState } from 'react'
import ko from '@/locales/ko.json'
import en from '@/locales/en.json'

export type Language = 'ko' | 'en'

const translations: Record<Language, typeof ko> = {
  ko,
  en: en as typeof ko,
}

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('ko')
  const [isLoaded, setIsLoaded] = useState(true) // 기본값을 true로 설정

  // Load language from localStorage on mount (클라이언트 사이드만)
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language') as Language | null
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        setLanguage(savedLanguage)
      } else {
        setLanguage('ko')
      }
    } catch (err) {
      console.log('localStorage 접근 실패, 기본 언어 사용')
      setLanguage('ko')
    }

    // Listen for language changes from other components
    const handleLanguageChange = (event: any) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language)
      }
    }

    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [])

  // Save language to localStorage when it changes
  const changeLanguage = (newLanguage: Language) => {
    if (Object.keys(translations).includes(newLanguage)) {
      setLanguage(newLanguage)
      try {
        localStorage.setItem('language', newLanguage)
      } catch (err) {
        console.log('localStorage 저장 실패')
      }
      // Trigger a custom event to notify all components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: newLanguage } }))
      }
    }
  }

  // Get translation for a key path (e.g., 'login.title')
  const t = (key: string, defaultValue: string = ''): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return defaultValue || key
      }
    }

    return typeof value === 'string' ? value : defaultValue || key
  }

  return {
    language,
    changeLanguage,
    t,
    isLoaded,
  }
}

// Helper function to get all available languages
export const getAvailableLanguages = (): { code: Language; name: string; flag: string }[] => [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]
