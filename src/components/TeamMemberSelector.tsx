'use client';

import React, { useState, useEffect } from 'react';
import { User, TeamMember } from '@/types';

interface TeamMemberSelectorProps {
    teamId: string;
    onMembersChange?: (members: TeamMember[]) => void;
}

const TeamMemberSelector: React.FC<TeamMemberSelectorProps> = ({ 
    teamId, 
    onMembersChange 
}) => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRole, setSelectedRole] = useState('Member');

    useEffect(() => {
        loadTeamMembers();
        loadAvailableUsers();
    }, [teamId]);

    const loadTeamMembers = async () => {
        try {
            const response = await fetch(`/api/teams/${teamId}/members`);
            if (response.ok) {
                const members = await response.json();
                setTeamMembers(members);
                onMembersChange?.(members);
            }
        } catch (error) {
            console.error('Failed to load team members:', error);
            setError('Failed to load team members');
        }
    };

    const loadAvailableUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/users');
            if (response.ok) {
                const users = await response.json();
                setAvailableUsers(users);
            }
        } catch (error) {
            console.error('Failed to load users:', error);
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleAddMember = async () => {
        if (!selectedUserId || !selectedRole) {
            setError('Please select a user and role');
            return;
        }

        try {
            setIsAdding(true);
            const response = await fetch(`/api/teams/${teamId}/members`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: selectedUserId,
                    role: selectedRole,
                }),
            });

            if (response.ok) {
                const newMember = await response.json();
                const updatedMembers = [...teamMembers, newMember];
                setTeamMembers(updatedMembers);
                onMembersChange?.(updatedMembers);
                setSelectedUserId('');
                setSelectedRole('Member');
                setError(null);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to add member');
            }
        } catch (error) {
            console.error('Failed to add member:', error);
            setError('Failed to add member');
        } finally {
            setIsAdding(false);
        }
    };

    const handleRemoveMember = async (userId: string) => {
        if (!confirm('Are you sure you want to remove this member from the team?')) {
            return;
        }

        try {
            const response = await fetch(`/api/teams/${teamId}/members?userId=${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedMembers = teamMembers.filter(member => member.userId !== userId);
                setTeamMembers(updatedMembers);
                onMembersChange?.(updatedMembers);
            } else {
                setError('Failed to remove member');
            }
        } catch (error) {
            console.error('Failed to remove member:', error);
            setError('Failed to remove member');
        }
    };

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '2rem',
                color: '#6b7280'
            }}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #e5e7eb',
                    borderTop: '2px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '0.5rem'
                }}></div>
                Loading members...
            </div>
        );
    }

    const unassignedUsers = availableUsers.filter(user => 
        !teamMembers.some(member => member.userId === user.id)
    );

    return (
        <div>
            <h4 style={{ 
                marginBottom: '1rem', 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: '#374151' 
            }}>
                Team Members ({teamMembers.length})
            </h4>

            {error && (
                <div style={{ 
                    padding: '0.75rem', 
                    backgroundColor: '#fee2e2', 
                    color: '#dc2626', 
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}>
                    {error}
                </div>
            )}

            {/* Current Members */}
            {teamMembers.length > 0 ? (
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {teamMembers.map((member) => (
                            <div key={member.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.75rem',
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: '#3b82f6',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: '0.875rem'
                                    }}>
                                        {member.user?.name?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '500', color: '#374151' }}>
                                            {member.user?.name || 'Unknown User'}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                            {member.role} • Joined {new Date(member.joinedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveMember(member.userId)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        padding: '0.25rem',
                                        borderRadius: '4px',
                                        fontSize: '0.875rem'
                                    }}
                                    title="Remove member"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '1.5rem',
                    color: '#6b7280',
                    fontStyle: 'italic',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                }}>
                    No members in this team yet
                </div>
            )}

            {/* Add New Member */}
            {unassignedUsers.length > 0 ? (
                <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '8px',
                    padding: '1rem'
                }}>
                    <h5 style={{ 
                        marginBottom: '0.75rem', 
                        fontSize: '0.875rem', 
                        fontWeight: '600', 
                        color: '#374151' 
                    }}>
                        Add New Member
                    </h5>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'end' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ 
                                display: 'block', 
                                fontSize: '0.75rem', 
                                color: '#374151', 
                                marginBottom: '0.25rem' 
                            }}>
                                User
                            </label>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <option value="">Select user...</option>
                                {unassignedUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ minWidth: '120px' }}>
                            <label style={{ 
                                display: 'block', 
                                fontSize: '0.75rem', 
                                color: '#374151', 
                                marginBottom: '0.25rem' 
                            }}>
                                Role
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <option value="Member">Member</option>
                                <option value="Lead">Lead</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Tester">Tester</option>
                            </select>
                        </div>
                        <button
                            onClick={handleAddMember}
                            disabled={isAdding || !selectedUserId}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedUserId ? '#3b82f6' : '#9ca3af',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: selectedUserId ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {isAdding ? (
                                <>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <span>+</span>
                                    Add
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '1rem',
                    color: '#6b7280',
                    fontStyle: 'italic',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    fontSize: '0.875rem'
                }}>
                    All users are already members of this team
                </div>
            )}
        </div>
    );
};

export default TeamMemberSelector;
