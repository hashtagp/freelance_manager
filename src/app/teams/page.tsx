"use client";

import React from 'react';
import Link from 'next/link';
import { useTeams } from '../../hooks/useTeams';
import TeamCard from '../../components/TeamCard';
import '../../styles/projects.css';

const TeamsPage = () => {
  const { teams, loading, error } = useTeams();

  if (loading) {
    return (
      <div className="projects-container">
        <div className="projects-loading">
          <div className="projects-loading-spinner"></div>
          <p className="projects-loading-text">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-container">
        <div className="projects-empty-state">
          <div className="projects-empty-icon">❌</div>
          <h2 className="projects-empty-title">Error Loading Teams</h2>
          <p className="projects-empty-description">{error}</p>
          <button className="projects-new-btn" onClick={() => window.location.reload()}>
            <span>🔄</span>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      {/* Header */}
      <div className="projects-header">
        <h1 className="projects-title">Teams</h1>
        <p className="projects-subtitle">Manage and organize your project teams</p>
      </div>
      
      <div className="projects-actions">
        <Link href="/teams/new" className="projects-new-btn">
          <span>👥</span>
          New Team
        </Link>
      </div>

      {/* Teams Grid */}
      {teams.length > 0 ? (
        <div className="projects-grid">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="projects-empty-state">
          <div className="projects-empty-icon">👥</div>
          <h2 className="projects-empty-title">No Teams Yet</h2>
          <p className="projects-empty-description">
            Create your first team to organize and manage your project collaborations
          </p>
          <Link href="/teams/new" className="projects-new-btn">
            <span>✨</span>
            Create Your First Team
          </Link>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;