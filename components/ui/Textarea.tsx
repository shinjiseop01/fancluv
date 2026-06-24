'use client'

import { cn } from '@/lib/cn'
import React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, maxLength, ...props }, ref) => {
    const [count, setCount] = React.useState(0)

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 resize-none',
            error && 'border-accent-500 focus:ring-accent-500',
            className
          )}
          ref={ref}
          maxLength={maxLength}
          onChange={(e) => {
            setCount(e.target.value.length)
            props.onChange?.(e)
          }}
          {...props}
        />
        {maxLength && (
          <p className="text-xs text-gray-500 mt-1">
            {count}/{maxLength}
          </p>
        )}
        {error && <p className="text-sm text-accent-600 mt-1">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
