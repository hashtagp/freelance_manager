'use client';

import React, { useState, useEffect } from 'react';
import { Payout, ProjectTeamMemberPricing } from '@/types';
import { fetchProjectPayouts, fetchProjectPricing } from '@/lib/api';
import PayoutModal from './PayoutModal';

interface ProjectPayoutsProps {
    projectId: string;
}

const ProjectPayouts: React.FC<ProjectPayoutsProps> = ({ projectId }) => {
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [pricing, setPricing] = useState<ProjectTeamMemberPricing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, [projectId]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [payoutsData, pricingData] = await Promise.all([
                fetchProjectPayouts(projectId),
                fetchProjectPricing(projectId)
            ]);
            setPayouts(payoutsData);
            setPricing(pricingData);
        } catch (error) {
            console.error('Failed to load payout data:', error);
            setError('Failed to load payout data');
        } finally {
            setLoading(false);
        }
    };

    const calculateMemberSummary = () => {
        const summary: { [userId: string]: { user: any; allocated: number; paid: number; balance: number } } = {};

        // Initialize with pricing data
        pricing.forEach(price => {
            if (!summary[price.userId]) {
                summary[price.userId] = {
                    user: price.user,
                    allocated: 0,
                    paid: 0,
                    balance: 0
                };
            }
            summary[price.userId].allocated += price.fixedRate;
        });

        // Add paid amounts from payouts
        payouts.forEach(payout => {
            if (payout.status === 'COMPLETED') {
                payout.members.forEach(member => {
                    if (summary[member.userId]) {
                        summary[member.userId].paid += member.amount;
                    }
                });
            }
        });

        // Calculate balance
        Object.keys(summary).forEach(userId => {
            summary[userId].balance = summary[userId].allocated - summary[userId].paid;
        });

        return Object.values(summary);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return '#059669';
            case 'PENDING': return '#d97706';
            case 'CANCELLED': return '#dc2626';
            default: return '#6b7280';
        }
    };

    const getTotalStats = () => {
        const memberSummary = calculateMemberSummary();
        const totalAllocated = memberSummary.reduce((sum, member) => sum + member.allocated, 0);
        const totalPaid = memberSummary.reduce((sum, member) => sum + member.paid, 0);
        const totalBalance = totalAllocated - totalPaid;

        return { totalAllocated, totalPaid, totalBalance };
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
                <p style={{ marginTop: '0.5rem', color: '#64748b' }}>Loading payouts...</p>
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

    const memberSummary = calculateMemberSummary();
    const { totalAllocated, totalPaid, totalBalance } = getTotalStats();

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
                    <span>💸</span>
                    Project Payouts
                </h3>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <span>+</span>
                    New Payout
                </button>
            </div>

            {/* Summary Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        Total Allocated
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151' }}>
                        {formatCurrency(totalAllocated)}
                    </div>
                </div>
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#064e3b', marginBottom: '0.25rem' }}>
                        Total Paid
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#059669' }}>
                        {formatCurrency(totalPaid)}
                    </div>
                </div>
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#fef3c7',
                    borderRadius: '8px',
                    border: '1px solid #fde68a'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '0.25rem' }}>
                        Remaining Balance
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#d97706' }}>
                        {formatCurrency(totalBalance)}
                    </div>
                </div>
            </div>

            {/* Member Summary */}
            {memberSummary.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '1rem'
                    }}>
                        Member Summary
                    </h4>
                    <div style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        {memberSummary.map((member, index) => (
                            <div key={member.user.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                                borderBottom: index < memberSummary.length - 1 ? '1px solid #e5e7eb' : 'none'
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
                                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                            {member.user.email}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Allocated</div>
                                        <div style={{ fontWeight: '500', color: '#374151' }}>
                                            {formatCurrency(member.allocated)}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Paid</div>
                                        <div style={{ fontWeight: '500', color: '#059669' }}>
                                            {formatCurrency(member.paid)}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Balance</div>
                                        <div style={{ 
                                            fontWeight: '600', 
                                            color: member.balance > 0 ? '#d97706' : member.balance < 0 ? '#dc2626' : '#059669'
                                        }}>
                                            {formatCurrency(member.balance)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Payout History */}
            <div>
                <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '1rem'
                }}>
                    Payout History ({payouts.length})
                </h4>
                
                {payouts.length === 0 ? (
                    <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💸</div>
                        <h5 style={{ color: '#374151', marginBottom: '0.5rem' }}>No Payouts Yet</h5>
                        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                            Create your first payout to start tracking payments to team members.
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            Create First Payout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {payouts.map(payout => (
                            <div key={payout.id} style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '1rem',
                                backgroundColor: '#ffffff'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem'
                                }}>
                                    <div>
                                        <h5 style={{
                                            margin: '0 0 0.25rem 0',
                                            fontWeight: '600',
                                            color: '#374151'
                                        }}>
                                            {payout.title}
                                        </h5>
                                        {payout.description && (
                                            <p style={{
                                                margin: '0 0 0.5rem 0',
                                                fontSize: '0.875rem',
                                                color: '#6b7280'
                                            }}>
                                                {payout.description}
                                            </p>
                                        )}
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                            {new Date(payout.payoutDate).toLocaleDateString()} • {payout.members.length} members
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            color: 'white',
                                            backgroundColor: getStatusColor(payout.status),
                                            marginBottom: '0.5rem'
                                        }}>
                                            {payout.status}
                                        </div>
                                        <div style={{
                                            fontSize: '1.125rem',
                                            fontWeight: '600',
                                            color: '#374151'
                                        }}>
                                            {formatCurrency(payout.totalAmount)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: '0.5rem'
                                }}>
                                    {payout.members.map(member => (
                                        <div key={member.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.5rem',
                                            backgroundColor: '#f9fafb',
                                            borderRadius: '6px',
                                            fontSize: '0.875rem'
                                        }}>
                                            <span style={{ color: '#374151' }}>{member.user?.name || 'Unknown Member'}</span>
                                            <span style={{ fontWeight: '500', color: '#059669' }}>
                                                {formatCurrency(member.amount)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Payout Modal */}
            <PayoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectId={projectId}
                memberSummary={memberSummary}
                onPayoutCreated={loadData}
            />
        </div>
    );
};

export default ProjectPayouts;
