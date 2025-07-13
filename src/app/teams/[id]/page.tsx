'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Team } from '@/types';
import TeamMemberSelector from '@/components/TeamMemberSelector';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import '@/styles/projects.css';

const TeamDetailPage = () => {
    const [team, setTeam] = useState<Team | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();
    const params = useParams();
    const teamId = params?.id as string;

    useEffect(() => {
        const fetchTeam = async () => {
            if (!teamId) return;
            
            try {
                setIsLoading(true);
                const response = await fetch(`/api/teams/${teamId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch team');
                }
                const teamData = await response.json();
                setTeam(teamData);
            } catch (error) {
                console.error('Failed to load team:', error);
                setError('Failed to load team data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeam();
    }, [teamId]);

    const handleDelete = async () => {
        if (!team || !confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/teams/${team.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete team');
            }

            router.push('/teams');
        } catch (error) {
            console.error('Failed to delete team:', error);
            setError('Failed to delete team');
        }
    };

    return (
        <ProtectedRoute>
            {isLoading && (
                <div className="projects-container">
                    <div className="projects-loading">
                        <div className="projects-loading-spinner"></div>
                        <p className="projects-loading-text">Loading team...</p>
                    </div>
                </div>
            )}

            {(error || !team) && !isLoading && (
                <div className="projects-container">
                    <div className="projects-empty-state">
                        <div className="projects-empty-icon">❌</div>
                        <h2 className="projects-empty-title">Error Loading Team</h2>
                        <p className="projects-empty-description">{error || 'Team not found'}</p>
                        <Link href="/teams" className="projects-new-btn">
                            <span>←</span>
                            Back to Teams
                        </Link>
                    </div>
                </div>
            )}

            {!isLoading && !error && team && (
                <div className="projects-container">
                    <div className="projects-header">
                <div className="projects-header-content">
                    <h1 className="projects-title">{team.name}</h1>
                    <p className="projects-subtitle">
                        {team.description || 'No description provided'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link href="/teams" className="projects-new-btn" style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#374151',
                        border: '2px solid #e5e7eb'
                    }}>
                        <span>←</span>
                        Back to Teams
                    </Link>
                    <Link href={`/teams/${team.id}/edit`} className="projects-new-btn" style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    }}>
                        <span>✏️</span>
                        Edit Team
                    </Link>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="project-card-enhanced">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ 
                                fontSize: '1.2rem', 
                                fontWeight: '600', 
                                color: '#374151', 
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span>📊</span>
                                Team Status
                            </h3>
                            <div className={`projects-status-badge projects-status-${team.status || 'active'}`}>
                                {(team.status || 'active') === 'active' ? '🟢' : '🔴'} {(team.status || 'active').toUpperCase()}
                            </div>
                        </div>

                        <div>
                            <h3 style={{ 
                                fontSize: '1.2rem', 
                                fontWeight: '600', 
                                color: '#374151', 
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span>📅</span>
                                Created
                            </h3>
                            <p style={{ color: '#6b7280' }}>
                                {new Date(team.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {team.skills && team.skills.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ 
                                fontSize: '1.2rem', 
                                fontWeight: '600', 
                                color: '#374151', 
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span>🎯</span>
                                Skills
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {team.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                            color: 'white',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginBottom: '2rem' }}>
                        <TeamMemberSelector 
                            teamId={team.id}
                            onMembersChange={(members) => {
                                // Update team members in the team object
                                setTeam(prev => prev ? { ...prev, members } : null);
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ 
                            fontSize: '1.2rem', 
                            fontWeight: '600', 
                            color: '#374151', 
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span>🚀</span>
                            Assigned Projects
                        </h3>
                        {team.projects && team.projects.length > 0 ? (
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {team.projects.map((projectTeam) => (
                                    <div
                                        key={projectTeam.id}
                                        style={{
                                            background: '#f9fafb',
                                            padding: '16px',
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb'
                                        }}
                                    >
                                        <Link
                                            href={`/projects/${projectTeam.projectId}`}
                                            style={{
                                                color: '#3b82f6',
                                                textDecoration: 'none',
                                                fontWeight: '600'
                                            }}
                                        >
                                            View Project →
                                        </Link>
                                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '4px' }}>
                                            Assigned: {new Date(projectTeam.assignedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
                                This team is not assigned to any projects yet.
                            </p>
                        )}
                    </div>

                    <div style={{ 
                        borderTop: '1px solid #e5e7eb', 
                        paddingTop: '2rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <button
                            onClick={handleDelete}
                            style={{
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                border: 'none',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <span>�️</span>
                            Delete Team
                        </button>

                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            Last updated: {new Date(team.updatedAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                </div>
                </div>
            )}
        </ProtectedRoute>
    );
};

export default TeamDetailPage;