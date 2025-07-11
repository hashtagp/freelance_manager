'use client';

import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = '0s' }) => {
  return (
    <div 
      className="group relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_16px_rgba(0,0,0,0.12),0_24px_48px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-3 cursor-pointer animate-fadeIn"
      style={{ animationDelay: delay }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      {/* Content */}
      <div className="relative z-10 p-8 text-center">
        {/* Icon container */}
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-colors duration-300">
            <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
          {/* Floating particles */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 transform translate-x-2 -translate-y-2 group-hover:translate-x-4 group-hover:-translate-y-4" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 transform -translate-x-1 translate-y-1 group-hover:-translate-x-3 group-hover:translate-y-3" />
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {description}
        </p>
        
        {/* Learn more arrow */}
        <div className="mt-6 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-sm font-medium mr-2">Learn more</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }} />
      </div>
    </div>
  );
};

export default FeatureCard;
