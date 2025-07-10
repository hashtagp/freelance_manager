import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  gradient?: boolean
  glass?: boolean
  style?: React.CSSProperties
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  hover = false,
  gradient = false,
  glass = false,
  style
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const backgroundClasses = glass 
    ? 'bg-white/10 backdrop-blur-lg border-white/20' 
    : gradient 
      ? 'bg-gradient-to-br from-white via-white to-gray-50' 
      : 'bg-white';

  const shadowClasses = glass ? 'shadow-xl' : 'shadow-lg';

  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 transition-all duration-300',
        backgroundClasses,
        shadowClasses,
        hover && 'hover:shadow-2xl hover:-translate-y-1',
        paddingClasses[padding],
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('pb-4 border-b border-gray-200 mb-4', className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h3>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={cn('text-gray-600', className)}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={cn('pt-4 border-t border-gray-200 mt-4', className)}>
      {children}
    </div>
  )
}

export default Card
export { CardHeader, CardTitle, CardContent, CardFooter }