"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';

const TeamPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Team Details</h1>
        <p className="page-subtitle">Team ID: {id}</p>
      </div>
      
      <div className="card-modern">
        <div className="empty-state">
          <div className="empty-state-icon">🚧</div>
          <h2 className="empty-state-title">Feature Coming Soon</h2>
          <p className="empty-state-description">
            Team management features are currently under development. You can manage team members within individual projects for now.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">0</div>
              <div className="stat-label">Team Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">0</div>
              <div className="stat-label">Active Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">0</div>
              <div className="stat-label">Completed Tasks</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/teams" className="btn btn-secondary">
              <span>👥</span>
              Back to Teams
            </Link>
            <Link href="/projects" className="btn btn-primary">
              <span>📋</span>
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;