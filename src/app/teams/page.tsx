"use client";

import React from 'react';
import Link from 'next/link';
import { useTeams } from '../../hooks/useTeams';

const TeamsPage = () => {
  const { teams, loading, error } = useTeams();

  if (loading) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="spinner"></div>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h3 className="empty-state-title">Error Loading Teams</h3>
          <p className="empty-state-description">{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Teams</h1>
        <p className="page-subtitle">Manage and collaborate with your team members</p>
      </div>
      
      <div className="page-actions">
        <Link href="/teams/new" className="btn btn-primary">
          <span>➕</span>
          New Team
        </Link>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3 className="empty-state-title">No Teams Yet</h3>
          <p className="empty-state-description">Create your first team to start collaborating with others</p>
          <Link href="/teams/new" className="btn btn-primary">
            <span>➕</span>
            Create Your First Team
          </Link>
        </div>
      ) : (
        <div className="card-grid">
          {teams.map((team) => (
            <div key={team.id} className="card-modern animate-fadeIn">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: 'var(--gradient-primary)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {team.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="card-title">{team.name}</h3>
                    <p className="card-description">{team.description}</p>
                  </div>
                </div>
                <div style={{ 
                  background: 'rgba(102, 126, 234, 0.1)', 
                  color: '#667eea', 
                  padding: '4px 12px', 
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {team.members?.length || 0} Members
                </div>
              </div>
              <div className="card-footer">
                <Link href={`/teams/${team.id}`} className="btn btn-primary">
                  View Details
                </Link>
                <button className="btn btn-secondary">
                  Edit Team
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsPage;