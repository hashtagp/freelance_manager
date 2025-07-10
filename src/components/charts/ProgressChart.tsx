"use client";

import React from 'react';

interface ProgressData {
  label: string;
  value: number;
  total: number;
  color: string;
}

interface ProgressChartProps {
  data: ProgressData[];
  title: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, title }) => {
  return (
    <div className="card-modern">
      <h3 className="card-title" style={{ marginBottom: '20px' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {data.map((item, index) => {
          const percentage = item.total > 0 ? (item.value / item.total) * 100 : 0;
          
          return (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '500', color: '#374151' }}>{item.label}</span>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  {item.value} / {item.total}
                </span>
              </div>
              
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: item.color,
                    borderRadius: '4px',
                    transition: 'width 0.6s ease-in-out',
                    animation: 'slideIn 0.6s ease-out'
                  }}
                />
              </div>
              
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#9ca3af', 
                marginTop: '4px',
                textAlign: 'right'
              }}>
                {percentage.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressChart;
