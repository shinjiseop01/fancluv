'use client'

import { cn } from '@/lib/cn'
import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          error && 'border-accent-500 focus:ring-accent-500',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-sm text-accent-600 mt-1">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'

export { Input }
