import React, { useState, useEffect } from 'react';
import { Team, ProjectTeamMemberPricing, MemberPricingFormData } from '../types';
import { fetchTeams, assignTeamToProject, removeTeamFromProject, saveProjectTeamPricing, fetchProjectPricing } from '../lib/api';
import MemberPricingModal from './MemberPricingModal';

interface TeamSelectorProps {
    projectId: string;
    onTeamsChange: (teams: Team[]) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ projectId, onTeamsChange }) => {
    const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
    const [assignedTeams, setAssignedTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAssigning, setIsAssigning] = useState<string | null>(null);
    const [pricingModalOpen, setPricingModalOpen] = useState(false);
    const [selectedTeamForPricing, setSelectedTeamForPricing] = useState<Team | null>(null);
    const [projectPricing, setProjectPricing] = useState<ProjectTeamMemberPricing[]>([]);

    useEffect(() => {
        loadTeams();
        loadProjectTeams();
        loadProjectPricing();
    }, [projectId]);

    const loadTeams = async () => {
        try {
            const teams = await fetchTeams();
            setAvailableTeams(teams);
        } catch (error) {
            console.error('Failed to load teams:', error);
            setError('Failed to load teams');
        }
    };

    const loadProjectTeams = async () => {
        try {
            setLoading(true);
            // Fetch teams assigned to this project
            const response = await fetch(`/api/projects/${projectId}/teams`);
            if (response.ok) {
                const projectTeams = await response.json();
                setAssignedTeams(projectTeams);
                onTeamsChange(projectTeams);
            }
        } catch (error) {
            console.error('Failed to load project teams:', error);
            setError('Failed to load project teams');
        } finally {
            setLoading(false);
        }
    };

    const loadProjectPricing = async () => {
        try {
            const pricing = await fetchProjectPricing(projectId);
            setProjectPricing(pricing);
        } catch (error) {
            console.error('Failed to load project pricing:', error);
        }
    };

    const handleAssignTeam = async (teamId: string) => {
        try {
            setIsAssigning(teamId);
            await assignTeamToProject(projectId, teamId);
            
            // Find the team and add it to assigned teams
            const team = availableTeams.find(t => t.id === teamId);
            if (team) {
                const updatedAssignedTeams = [...assignedTeams, team];
                setAssignedTeams(updatedAssignedTeams);
                onTeamsChange(updatedAssignedTeams);
            }
        } catch (error) {
            console.error('Failed to assign team:', error);
            setError('Failed to assign team');
        } finally {
            setIsAssigning(null);
        }
    };

    const handleRemoveTeam = async (teamId: string) => {
        try {
            setIsAssigning(teamId);
            await removeTeamFromProject(projectId, teamId);
            
            // Remove the team from assigned teams
            const updatedAssignedTeams = assignedTeams.filter((t: Team) => t.id !== teamId);
            setAssignedTeams(updatedAssignedTeams);
            onTeamsChange(updatedAssignedTeams);
        } catch (error) {
            console.error('Failed to remove team:', error);
            setError('Failed to remove team');
        } finally {
            setIsAssigning(null);
        }
    };

    const handleSetPricing = (team: Team) => {
        setSelectedTeamForPricing(team);
        setPricingModalOpen(true);
    };

    const handleSavePricing = async (pricingData: MemberPricingFormData[]) => {
        if (!selectedTeamForPricing) return;
        
        try {
            await saveProjectTeamPricing(projectId, selectedTeamForPricing.id, pricingData);
            await loadProjectPricing(); // Reload pricing data
        } catch (error) {
            console.error('Failed to save pricing:', error);
            throw error;
        }
    };

    const getTeamPricing = (teamId: string) => {
        return projectPricing.filter(p => p.teamId === teamId);
    };

    const formatPricingSummary = (teamId: string) => {
        const pricing = getTeamPricing(teamId);
        if (pricing.length === 0) return 'No pricing set';
        
        const total = pricing.reduce((sum, p) => sum + p.fixedRate, 0);
        const currency = pricing[0]?.currency || 'INR';
        return `${pricing.length} members: ${currency} ${total.toFixed(2)}`;
    };

    if (loading) {
        return (
            <div style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    border: '3px solid #e5e7eb', 
                    borderTop: '3px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                }}></div>
                <p style={{ marginTop: '0.5rem', color: '#64748b' }}>Loading teams...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                padding: '1rem', 
                backgroundColor: '#fee2e2', 
                color: '#dc2626', 
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                {error}
            </div>
        );
    }

    // Safe null checks for assignedTeams
    const safeAssignedTeams = assignedTeams || [];
    const assignedTeamIds = safeAssignedTeams.map((t: Team) => t.id);
    const unassignedTeams = availableTeams.filter((t: Team) => !assignedTeamIds.includes(t.id));

    // Handle case when no teams are available
    if (availableTeams.length === 0 && !loading) {
        return (
            <div style={{ 
                padding: '2rem', 
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👥</div>
                <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No Teams Available</h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Create your first team to start assigning them to projects.
                </p>
                <a 
                    href="/teams/new" 
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '500'
                    }}
                >
                    <span>✨</span>
                    Create Team
                </a>
            </div>
        );
    }

    return (
        <div>
            <h3 style={{ 
                marginBottom: '1rem', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                color: '#374151' 
            }}>
                Team Management
            </h3>

            {/* Assigned Teams */}
            {safeAssignedTeams.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ 
                        marginBottom: '0.75rem', 
                        fontSize: '0.9rem', 
                        fontWeight: '600', 
                        color: '#374151' 
                    }}>
                        Assigned Teams ({safeAssignedTeams.length})
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {safeAssignedTeams.map((team: Team) => (
                            <div key={team.id} style={{
                                padding: '0.75rem',
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '0.5rem'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#374151' }}>
                                            {team.name}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                            {team.members?.length || 0} members
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem' }}>
                                            {formatPricingSummary(team.id)}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTeam(team.id)}
                                        disabled={isAssigning === team.id}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '0.8rem',
                                            fontWeight: '500',
                                            cursor: isAssigning === team.id ? 'not-allowed' : 'pointer',
                                            opacity: isAssigning === team.id ? 0.6 : 1
                                        }}
                                    >
                                        {isAssigning === team.id ? 'Removing...' : 'Remove'}
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleSetPricing(team)}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    <span>💰</span>
                                    {getTeamPricing(team.id).length > 0 ? 'Update Pricing' : 'Set Pricing'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Available Teams */}
            {unassignedTeams.length > 0 && (
                <div>
                    <h4 style={{ 
                        marginBottom: '0.75rem', 
                        fontSize: '0.9rem', 
                        fontWeight: '600', 
                        color: '#374151' 
                    }}>
                        Available Teams ({unassignedTeams.length})
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {unassignedTeams.map((team: Team) => (
                            <div key={team.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.75rem',
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#374151' }}>
                                        {team.name}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                        {team.members?.length || 0} members
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleAssignTeam(team.id)}
                                    disabled={isAssigning === team.id}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        cursor: isAssigning === team.id ? 'not-allowed' : 'pointer',
                                        opacity: isAssigning === team.id ? 0.6 : 1
                                    }}
                                >
                                    {isAssigning === team.id ? 'Assigning...' : 'Assign'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {unassignedTeams.length === 0 && assignedTeams.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '2rem', 
                    color: '#64748b' 
                }}>
                    <p>No teams available. Create teams first to assign them to projects.</p>
                </div>
            )}

            {unassignedTeams.length === 0 && assignedTeams.length > 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '1rem', 
                    color: '#64748b',
                    fontSize: '0.9rem'
                }}>
                    All available teams have been assigned to this project.
                </div>
            )}

            {/* Pricing Modal */}
            {selectedTeamForPricing && (
                <MemberPricingModal
                    isOpen={pricingModalOpen}
                    onClose={() => {
                        setPricingModalOpen(false);
                        setSelectedTeamForPricing(null);
                    }}
                    projectId={projectId}
                    teamId={selectedTeamForPricing.id}
                    members={selectedTeamForPricing.members?.map(m => m.user) || []}
                    existingPricing={getTeamPricing(selectedTeamForPricing.id)}
                    onSave={handleSavePricing}
                />
            )}
        </div>
    );
};

export default TeamSelector;
