'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TeamForm } from '../../../components/forms/TeamForm';
import { TeamFormData } from '@/types';
import { useTeams } from '@/hooks/useTeams';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const NewTeamPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { createTeam } = useTeams();
  const router = useRouter();

  const handleSubmit = async (data: TeamFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newTeam = await createTeam({
        name: data.name,
        description: data.description,
        skills: data.skills,
        status: data.status,
      });
      
      setSuccess(true);
      setTimeout(() => {
        router.push(`/teams/${newTeam.id}`);
      }, 1500);
    } catch (error) {
      console.error('Error creating team:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/teams');
  };

  return (
    <ProtectedRoute>
      {success && (
        <div className="page-container">
          <div className="empty-state">
            <div className="empty-state-icon" style={{ background: 'var(--gradient-success)' }}>
              ✅
            </div>
            <h2 className="empty-state-title">Team Created Successfully!</h2>
            <p className="empty-state-description">
              Your team has been created and you're being redirected to the teams page.
            </p>
            <div className="spinner" style={{ margin: '20px auto' }}></div>
          </div>
        </div>
      )}

      {!success && (
        <div className="page-container">
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.9rem' }}>
          <Link href="/teams" style={{ color: '#667eea', textDecoration: 'none' }}>Teams</Link>
          <span>→</span>
          <span>Create New Team</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--gradient-primary)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            👥
          </div>
          <div>
            <h1 className="page-title">Create New Team</h1>
            <p className="page-subtitle">Build your dream team and collaborate on amazing projects</p>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(102, 126, 234, 0.05)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.2rem' }}>🚀</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Boost Productivity</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Collaborate seamlessly</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(102, 126, 234, 0.05)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.2rem' }}>💬</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Better Communication</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Stay connected always</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(102, 126, 234, 0.05)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.2rem' }}>📊</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Track Progress</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Monitor team performance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ fontSize: '1.2rem' }}>❌</div>
          <div>
            <div style={{ fontWeight: '600', color: '#dc2626' }}>Error Creating Team</div>
            <div style={{ color: '#dc2626', fontSize: '0.9rem' }}>{error}</div>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="form-container">
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
            Team Information
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Tell us about your team. You can always update this information later.
          </p>
        </div>

        <TeamForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>

      {/* Help Section */}
      <div style={{ marginTop: '32px' }}>
        <div className="card-modern">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ fontSize: '1.5rem' }}>💡</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                Tips for Creating a Great Team
              </h3>
              <ul style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Choose a clear, descriptive name that reflects your team's purpose</li>
                <li>Write a detailed description to help team members understand their role</li>
                <li>Consider your team's goals and how they align with your projects</li>
                <li>Think about the skills and expertise you need for success</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default NewTeamPage;