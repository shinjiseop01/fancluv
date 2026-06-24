'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/Button'

interface HeaderProps {
  showBack?: boolean
  title?: string
  showMenu?: boolean
}

export function Header({ showBack = false, title, showMenu = false }: HeaderProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
          ) : (
            <Link href="/" className="text-xl font-bold text-primary-600">
              FANCLUV
            </Link>
          )}
          {title && <h1 className="text-lg font-semibold text-gray-900">{title}</h1>}
        </div>

        <div className="flex items-center gap-2">
          {showMenu && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {isOpen && showMenu && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 space-y-2">
            <Link href="/profile" className="block text-gray-900 hover:text-primary-600">
              프로필
            </Link>
            <Link href="/settings" className="block text-gray-900 hover:text-primary-600">
              설정
            </Link>
            <button className="w-full text-left text-gray-900 hover:text-accent-600">
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
