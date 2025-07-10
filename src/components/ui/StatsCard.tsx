"use client";

import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  className = ''
}) => {
  const changeColorClass = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[changeType];

  return (
    <div className={`stat-card hover-lift ${className}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          background: 'var(--gradient-primary)', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
          {icon}
        </div>
        {change && (
          <div className={`text-sm font-semibold ${changeColorClass}`}>
            {change}
          </div>
        )}
      </div>
      
      <div className="stat-number" style={{ marginBottom: '4px' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      
      <div className="stat-label">
        {title}
      </div>
    </div>
  );
};

export default StatsCard;
