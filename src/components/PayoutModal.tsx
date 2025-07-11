'use client';

import React, { useState } from 'react';
import { PayoutFormData, PayoutMemberFormData, PayoutStatus } from '@/types';
import { createProjectPayout } from '@/lib/api';

interface PayoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    memberSummary: Array<{
        user: any;
        allocated: number;
        paid: number;
        balance: number;
    }>;
    onPayoutCreated: () => void;
}

const PayoutModal: React.FC<PayoutModalProps> = ({
    isOpen,
    onClose,
    projectId,
    memberSummary,
    onPayoutCreated
}) => {
    const [formData, setFormData] = useState<PayoutFormData>({
        title: '',
        description: '',
        payoutDate: new Date().toISOString().split('T')[0],
        status: PayoutStatus.PENDING,
        members: []
    });
    const [memberAmounts, setMemberAmounts] = useState<{ [userId: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        if (isOpen) {
            // Initialize member amounts with empty values
            const initialAmounts: { [userId: string]: string } = {};
            memberSummary.forEach(member => {
                initialAmounts[member.user.id] = '';
            });
            setMemberAmounts(initialAmounts);
            
            // Reset form
            setFormData({
                title: '',
                description: '',
                payoutDate: new Date().toISOString().split('T')[0],
                status: PayoutStatus.PENDING,
                members: []
            });
            setError(null);
        }
    }, [isOpen, memberSummary]);

    const handleMemberAmountChange = (userId: string, amount: string) => {
        // Allow only numbers and decimal points
        if (amount === '' || /^\d*\.?\d*$/.test(amount)) {
            setMemberAmounts(prev => ({
                ...prev,
                [userId]: amount
            }));
        }
    };

    const getTotalAmount = () => {
        return Object.values(memberAmounts).reduce((sum, amount) => {
            const num = parseFloat(amount) || 0;
            return sum + num;
        }, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate form
        if (!formData.title.trim()) {
            setError('Payout title is required');
            return;
        }

        // Get members with amounts
        const payoutMembers: PayoutMemberFormData[] = Object.entries(memberAmounts)
            .filter(([_, amount]) => amount && parseFloat(amount) > 0)
            .map(([userId, amount]) => ({
                userId,
                amount: parseFloat(amount),
                notes: ''
            }));

        if (payoutMembers.length === 0) {
            setError('Please enter amounts for at least one team member');
            return;
        }

        const totalAmount = getTotalAmount();

        try {
            setLoading(true);
            await createProjectPayout(projectId, {
                ...formData,
                totalAmount,
                members: payoutMembers
            });
            
            onPayoutCreated();
            onClose();
        } catch (error) {
            console.error('Failed to create payout:', error);
            setError('Failed to create payout. Please try again.');
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

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>💸</span>
                        Create New Payout
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: '8px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: '#6b7280',
                            fontSize: '1.5rem',
                            lineHeight: 1
                        }}
                    >
                        ×
                    </button>
                </div>

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

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '0.5rem'
                        }}>
                            Payout Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="e.g., Monthly Payout - January 2024"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem'
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '0.5rem'
                        }}>
                            Description
                        </label>
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Optional description for this payout..."
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Payout Date *
                            </label>
                            <input
                                type="date"
                                value={formData.payoutDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, payoutDate: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem'
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Member Amounts */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '1rem'
                        }}>
                            Member Payments
                        </h4>
                        
                        {memberSummary.length === 0 ? (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#f9fafb',
                                borderRadius: '8px',
                                textAlign: 'center',
                                color: '#6b7280'
                            }}>
                                No team members found. Please assign team members and set their rates first.
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {memberSummary.map(member => (
                                    <div key={member.user.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        backgroundColor: '#f9fafb'
                                    }}>
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
                                            {member.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '500', color: '#374151' }}>
                                                {member.user.name}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                                Balance: {formatCurrency(member.balance)}
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.875rem', color: '#374151' }}>$</span>
                                            <input
                                                type="text"
                                                value={memberAmounts[member.user.id] || ''}
                                                onChange={(e) => handleMemberAmountChange(member.user.id, e.target.value)}
                                                placeholder="0.00"
                                                style={{
                                                    width: '100px',
                                                    padding: '0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '6px',
                                                    fontSize: '0.875rem',
                                                    textAlign: 'right'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Total Amount Display */}
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#f0f9ff',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontWeight: '500', color: '#374151' }}>Total Payout Amount:</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1d4ed8' }}>
                            {formatCurrency(getTotalAmount())}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: 'transparent',
                                color: '#6b7280',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            disabled={loading || getTotalAmount() === 0}
                        >
                            {loading && (
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }}></div>
                            )}
                            {loading ? 'Creating...' : 'Create Payout'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PayoutModal;
