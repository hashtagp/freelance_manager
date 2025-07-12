import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'filled' | 'floating' | 'glass'
  icon?: React.ReactNode
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  icon,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const variantClasses = {
    default: 'bg-white border-gray-300 hover:border-gray-400 text-gray-900',
    filled: 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900',
    floating: 'bg-transparent border-gray-300 peer placeholder-transparent text-gray-900',
    glass: 'bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md'
  };

  const focusClasses = {
    default: 'focus:ring-purple-500 focus:border-purple-500',
    filled: 'focus:ring-purple-500 focus:border-purple-500',
    floating: 'focus:ring-purple-500 focus:border-purple-500',
    glass: 'focus:ring-pink-400/50 focus:border-pink-400/50 focus:bg-white/15'
  };

  return (
    <div className="space-y-1">
      {label && variant !== 'floating' && (
        <label
          htmlFor={inputId}
          className={cn(
            "block text-sm font-medium transition-colors",
            variant === 'glass' ? "text-white/90" : "text-gray-700"
          )}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={cn(
            "absolute left-4 top-1/2 transform -translate-y-1/2 z-10",
            variant === 'glass' ? "text-white/60" : "text-gray-400"
          )}>
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(
            'w-full py-3 border rounded-xl transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'placeholder:transition-colors placeholder:duration-300',
            icon ? 'pl-12 pr-4' : 'px-4',
            variantClasses[variant],
            focusClasses[variant],
            error && (variant === 'glass' ? 
              'border-red-400/60 focus:ring-red-400/30' : 
              'border-red-500 focus:ring-red-500'
            ),
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            variant === 'glass' && 'hover:bg-white/15 hover:border-white/30',
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
        <p className={cn(
          "text-sm flex items-center gap-1",
          variant === 'glass' ? "text-red-300" : "text-red-600"
        )}>
          <span className="text-xs">⚠️</span>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className={cn(
          "text-sm",
          variant === 'glass' ? "text-white/60" : "text-gray-500"
        )}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input
