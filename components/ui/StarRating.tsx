'use client'

import { Star } from 'lucide-react'
import React from 'react'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  label?: string
  size?: number
}

export function StarRating({ value, onChange, label, size = 32 }: StarRatingProps) {
  const [hoverValue, setHoverValue] = React.useState(0)

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          >
            <Star
              size={size}
              className={`transition-colors ${
                star <= (hoverValue || value)
                  ? 'fill-accent-500 text-accent-500'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
