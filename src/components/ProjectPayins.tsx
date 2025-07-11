'use client';

import React, { useState, useEffect } from 'react';
import { Payin, Project } from '@/types';
import { fetchProjectPayins } from '@/lib/api';
import PayinModal from './PayinModal';

interface ProjectPayinsProps {
    projectId: string;
    projectBudget?: number;
}

const ProjectPayins: React.FC<ProjectPayinsProps> = ({ projectId, projectBudget }) => {
    const [payins, setPayins] = useState<Payin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, [projectId]);

    const loadData = async () => {
        try {
            setLoading(true);
            const payinsData = await fetchProjectPayins(projectId);
            setPayins(payinsData);
        } catch (error) {
            console.error('Failed to load payin data:', error);
            setError('Failed to load payment data');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'RECEIVED': return '#059669';
            case 'PENDING': return '#d97706';
            case 'CANCELLED': return '#dc2626';
            default: return '#6b7280';
        }
    };

    const getTotalStats = () => {
        const totalReceived = payins
            .filter(payin => payin.status === 'RECEIVED')
            .reduce((sum, payin) => sum + payin.amount, 0);

        const remainingBudget = projectBudget ? projectBudget - totalReceived : null;

        return { totalReceived, remainingBudget };
    };

    if (loading) {
        return (
            <div style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    border: '3px solid #e5e7eb', 
                    borderTop: '3px solid #059669',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                }}></div>
                <p style={{ marginTop: '0.5rem', color: '#64748b' }}>Loading payments...</p>
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

    const { totalReceived, remainingBudget } = getTotalStats();

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
                    Client Payments
                </h3>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#059669',
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
                    Record Payment
                </button>
            </div>

            {/* Summary Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: remainingBudget !== null ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                {projectBudget && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                            Project Budget
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151' }}>
                            {formatCurrency(projectBudget)}
                        </div>
                    </div>
                )}
                
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#064e3b', marginBottom: '0.25rem' }}>
                        Total Received
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#059669' }}>
                        {formatCurrency(totalReceived)}
                    </div>
                </div>
                
                {remainingBudget !== null && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#fef3c7',
                        borderRadius: '8px',
                        border: '1px solid #fde68a'
                    }}>
                        <div style={{ 
                            fontSize: '0.875rem', 
                            color: '#92400e', 
                            marginBottom: '0.25rem' 
                        }}>
                            Remaining Budget
                        </div>
                        <div style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: '600', 
                            color: '#d97706' 
                        }}>
                            {formatCurrency(remainingBudget)}
                        </div>
                    </div>
                )}
            </div>

            {/* Payment History */}
            <div>
                <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '1rem'
                }}>
                    Payment History ({payins.length})
                </h4>
                
                {payins.length === 0 ? (
                    <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💰</div>
                        <h5 style={{ color: '#374151', marginBottom: '0.5rem' }}>No Payments Yet</h5>
                        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                            Record your first client payment to start tracking project income.
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#059669',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            Record First Payment
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {payins.map(payin => (
                            <div key={payin.id} style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '1rem',
                                backgroundColor: '#ffffff'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                    <div>
                                        <h5 style={{
                                            margin: '0 0 0.25rem 0',
                                            fontWeight: '600',
                                            color: '#374151'
                                        }}>
                                            {payin.title}
                                        </h5>
                                        {payin.description && (
                                            <p style={{
                                                margin: '0 0 0.5rem 0',
                                                fontSize: '0.875rem',
                                                color: '#6b7280'
                                            }}>
                                                {payin.description}
                                            </p>
                                        )}
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                            {new Date(payin.payinDate).toLocaleDateString()}
                                            {payin.creator && ` • by ${payin.creator.name}`}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            color: 'white',
                                            backgroundColor: getStatusColor(payin.status),
                                            marginBottom: '0.5rem'
                                        }}>
                                            {payin.status}
                                        </div>
                                        <div style={{
                                            fontSize: '1.125rem',
                                            fontWeight: '600',
                                            color: '#374151'
                                        }}>
                                            {formatCurrency(payin.amount)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Payin Modal */}
            <PayinModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectId={projectId}
                projectBudget={projectBudget}
                totalReceived={totalReceived}
                onPayinCreated={loadData}
            />
        </div>
    );
};

export default ProjectPayins;
