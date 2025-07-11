import React from 'react';
import Link from 'next/link';
import { Team } from '../types';

interface TeamCardProps {
    team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
    const formatDate = (date: string | Date | null | undefined) => {
        if (!date) return 'Not set';
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="project-card-enhanced">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <Link href={`/teams/${team.id}`} className="project-card-title">
                    {team.name}
                </Link>
                <span className="project-status-badge status-active">
                    {team.members?.length || 0} members
                </span>
            </div>

            <p className="project-card-description">
                {team.description || 'No description provided for this team.'}
            </p>

            <div className="project-card-stats">
                <div className="project-stat">
                    <div className="project-stat-label">Members</div>
                    <div className="project-stat-value">
                        {team.members?.length || 0}
                    </div>
                </div>
                <div className="project-stat">
                    <div className="project-stat-label">Projects</div>
                    <div className="project-stat-value">
                        {team.projects?.length || 0}
                    </div>
                </div>
            </div>

            <div className="project-card-footer">
                <div className="project-deadline">
                    <span>👥</span>
                    <span>Created: {formatDate(team.createdAt)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {team.members && team.members.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {team.members.slice(0, 3).map((member) => (
                                <div key={member.id} style={{ 
                                    width: '24px', 
                                    height: '24px', 
                                    backgroundColor: '#3b82f6', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: 'white', 
                                    fontSize: '0.7rem', 
                                    fontWeight: '600' 
                                }}>
                                    {member.user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            ))}
                            {team.members.length > 3 && (
                                <div style={{ 
                                    width: '24px', 
                                    height: '24px', 
                                    backgroundColor: '#6b7280', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: 'white', 
                                    fontSize: '0.6rem', 
                                    fontWeight: '600' 
                                }}>
                                    +{team.members.length - 3}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamCard;