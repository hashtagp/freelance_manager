'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Team, TeamFormData } from '@/types';
import { TeamForm } from '@/components/forms/TeamForm';
import { useTeams } from '@/hooks/useTeams';
import TeamMemberSelector from '@/components/TeamMemberSelector';
import '@/styles/projects.css';

const EditTeamPage = () => {
    const [team, setTeam] = useState<Team | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTeam, setIsLoadingTeam] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { updateTeam } = useTeams();
    
    const router = useRouter();
    const params = useParams();
    const teamId = params?.id as string;

    useEffect(() => {
        const fetchTeam = async () => {
            if (!teamId) return;
            
            try {
                setIsLoadingTeam(true);
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
                setIsLoadingTeam(false);
            }
        };

        fetchTeam();
    }, [teamId]);

    const handleSubmit = async (teamData: TeamFormData) => {
        if (!team) return;
        
        setIsLoading(true);
        
        try {
            await updateTeam(team.id, teamData);
            router.push(`/teams/${team.id}`);
        } catch (error) {
            console.error('Failed to update team:', error);
            throw error; // Re-throw to let TeamForm handle the error display
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push(`/teams/${teamId}`);
    };

    if (isLoadingTeam) {
        return (
            <div className="projects-container">
                <div className="projects-loading">
                    <div className="projects-loading-spinner"></div>
                    <p className="projects-loading-text">Loading team data...</p>
                </div>
            </div>
        );
    }

    if (error || !team) {
        return (
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
        );
    }

    return (
        <div className="projects-container">
            <div className="projects-header">
                <div className="projects-header-content">
                    <h1 className="projects-title">Edit Team</h1>
                    <p className="projects-subtitle">
                        Update {team.name}'s details and settings
                    </p>
                </div>
                <Link href={`/teams/${team.id}`} className="projects-new-btn" style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#374151',
                    border: '2px solid #e5e7eb'
                }}>
                    <span>←</span>
                    Back to Team
                </Link>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <TeamForm
                    initialData={{
                        name: team.name,
                        description: team.description || '',
                        skills: team.skills || [],
                        status: team.status
                    }}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isLoading}
                />

                {/* Team Members Management */}
                <div style={{ 
                    marginTop: '2rem',
                    padding: '2rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                }}>
                    <h3 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: '600', 
                        color: '#374151', 
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>👥</span>
                        Manage Team Members
                    </h3>
                    <TeamMemberSelector 
                        teamId={team.id}
                        onMembersChange={(members) => {
                            // Update team members in the team object
                            setTeam(prev => prev ? { ...prev, members } : null);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditTeamPage;
