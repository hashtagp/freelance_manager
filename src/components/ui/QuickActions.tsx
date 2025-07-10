"use client";

import React from 'react';
import Link from 'next/link';

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const defaultActions: QuickAction[] = [
  {
    title: 'New Project',
    description: 'Start a new freelance project',
    href: '/projects/new',
    icon: '✨',
    color: 'primary'
  },
  {
    title: 'Create Team',
    description: 'Set up a new team',
    href: '/teams/new',
    icon: '👥',
    color: 'secondary'
  },
  {
    title: 'View Reports',
    description: 'Check your analytics',
    href: '#',
    icon: '📊',
    color: 'success'
  },
  {
    title: 'Settings',
    description: 'Manage your account',
    href: '#',
    icon: '⚙️',
    color: 'warning'
  }
];

const QuickActions: React.FC<QuickActionsProps> = ({ actions = defaultActions }) => {
  const getColorClasses = (color: string) => {
    const classes = {
      primary: 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600',
      secondary: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
      success: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      warning: 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
    };
    return classes[color as keyof typeof classes] || classes.primary;
  };

  return (
    <div className="card-modern">
      <h3 className="card-title" style={{ marginBottom: '20px' }}>Quick Actions</h3>
      <div className="card-grid" style={{ gap: '16px' }}>
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="block p-4 rounded-xl bg-gradient-to-r transition-all duration-300 hover:scale-105 hover:shadow-lg text-white text-decoration-none"
            style={{
              background: `linear-gradient(135deg, var(--gradient-${action.color === 'primary' ? 'primary' : action.color === 'secondary' ? 'dark' : action.color === 'success' ? 'success' : 'secondary'}))`,
              textDecoration: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
              <span style={{ fontWeight: '600', fontSize: '1rem' }}>{action.title}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.4 }}>
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
