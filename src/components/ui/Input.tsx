import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'filled' | 'floating'
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const variantClasses = {
    default: 'bg-white border-gray-300 hover:border-gray-400',
    filled: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
    floating: 'bg-transparent border-gray-300 peer placeholder-transparent'
  };

  return (
    <div className="space-y-1">
      {label && variant !== 'floating' && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            'w-full px-4 py-3 border rounded-xl transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
            'placeholder-gray-400',
            variantClasses[variant],
            error && 'border-red-500 focus:ring-red-500',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        
        {label && variant === 'floating' && (
          <label 
            htmlFor={inputId}
            className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600"
          >
            {label}
          </label>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

export default Input
