'use client';

import React, { useState, useEffect } from 'react';
import { ProjectTeamMemberPricing } from '@/types';
import { fetchProjectPricing } from '@/lib/api';

interface ProjectTeamPricingProps {
    projectId: string;
}

const ProjectTeamPricing: React.FC<ProjectTeamPricingProps> = ({ projectId }) => {
    const [pricing, setPricing] = useState<ProjectTeamMemberPricing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPricing();
    }, [projectId]);

    const loadPricing = async () => {
        try {
            setLoading(true);
            const pricingData = await fetchProjectPricing(projectId);
            setPricing(pricingData);
        } catch (error) {
            console.error('Failed to load pricing:', error);
            setError('Failed to load pricing data');
        } finally {
            setLoading(false);
        }
    };

    const groupPricingByTeam = () => {
        const grouped: { [key: string]: { team: any; members: ProjectTeamMemberPricing[] } } = {};
        
        pricing.forEach(item => {
            if (!grouped[item.teamId]) {
                grouped[item.teamId] = {
                    team: item.team,
                    members: []
                };
            }
            grouped[item.teamId].members.push(item);
        });
        
        return grouped;
    };

    const calculateTotalBudget = () => {
        return pricing.reduce((total, item) => total + item.fixedRate, 0);
    };

    const formatCurrency = (amount: number, currency: string = 'INR') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
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
                <p style={{ marginTop: '0.5rem', color: '#64748b' }}>Loading pricing data...</p>
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

    if (pricing.length === 0) {
        return (
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💰</div>
                <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No Pricing Set</h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Assign teams to this project and set their pricing to see budget breakdown.
                </p>
            </div>
        );
    }

    const groupedPricing = groupPricingByTeam();
    const totalBudget = calculateTotalBudget();

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
            }}>
                <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span>💰</span>
                    Team Pricing Overview
                </h3>
                <div style={{
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: '600'
                }}>
                    Total: {formatCurrency(totalBudget)}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.values(groupedPricing).map(({ team, members }) => {
                    const teamTotal = members.reduce((sum, member) => sum + member.fixedRate, 0);
                    const currency = members[0]?.currency || 'INR';

                    return (
                        <div key={team.id} style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            backgroundColor: '#ffffff'
                        }}>
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#f8fafc',
                                borderBottom: '1px solid #e5e7eb',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <h4 style={{
                                        margin: 0,
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        {team?.name || 'Unknown Team'}
                                    </h4>
                                    <p style={{
                                        margin: '0.25rem 0 0 0',
                                        fontSize: '0.875rem',
                                        color: '#6b7280'
                                    }}>
                                        {members.length} member{members.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <div style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    color: '#059669'
                                }}>
                                    {formatCurrency(teamTotal, currency)}
                                </div>
                            </div>
                            
                            <div style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {members.map(member => (
                                        <div key={member.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.75rem',
                                            backgroundColor: '#f9fafb',
                                            borderRadius: '8px'
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
                                                    fontSize: '14px',
                                                    fontWeight: '600'
                                                }}>
                                                    {member.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '500', color: '#374151' }}>
                                                        {member.user?.name || 'Unknown Member'}
                                                    </div>
                                                    {member.notes && (
                                                        <div style={{ 
                                                            fontSize: '0.75rem', 
                                                            color: '#6b7280',
                                                            marginTop: '0.125rem'
                                                        }}>
                                                            {member.notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{
                                                fontWeight: '600',
                                                color: '#059669'
                                            }}>
                                                {formatCurrency(member.fixedRate, member.currency)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectTeamPricing;
