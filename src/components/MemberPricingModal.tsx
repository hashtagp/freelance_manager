'use client';

import React, { useState, useEffect } from 'react';
import { User, MemberPricingFormData, ProjectTeamMemberPricing } from '@/types';

interface MemberPricingModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    teamId: string;
    members: User[];
    existingPricing: ProjectTeamMemberPricing[];
    onSave: (pricingData: MemberPricingFormData[]) => Promise<void>;
}

const MemberPricingModal: React.FC<MemberPricingModalProps> = ({
    isOpen,
    onClose,
    projectId,
    teamId,
    members,
    existingPricing,
    onSave
}) => {
    const [pricingData, setPricingData] = useState<MemberPricingFormData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Initialize pricing data for all members
            const initialData = members.map(member => {
                const existing = existingPricing.find(p => p.userId === member.id);
                return {
                    userId: member.id,
                    fixedRate: existing?.fixedRate || 0,
                    currency: existing?.currency || 'INR',
                    notes: existing?.notes || ''
                };
            });
            setPricingData(initialData);
            setError(null);
        }
    }, [isOpen, members, existingPricing]);

    const handlePricingChange = (userId: string, field: keyof MemberPricingFormData, value: string | number) => {
        setPricingData(prev => prev.map(data => 
            data.userId === userId 
                ? { ...data, [field]: value }
                : data
        ));
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Only save pricing for members with a rate > 0
            const validPricing = pricingData.filter(data => data.fixedRate > 0);
            await onSave(validPricing);
            onClose();
        } catch (error) {
            console.error('Failed to save pricing:', error);
            setError(error instanceof Error ? error.message : 'Failed to save pricing');
        } finally {
            setIsLoading(false);
        }
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
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>💰</span>
                        Set Member Pricing
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: '#6b7280',
                            padding: '4px'
                        }}
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px solid #fecaca'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '14px',
                        margin: '0 0 16px 0'
                    }}>
                        Set fixed rates for each team member on this project. Leave rate as 0 if no pricing is needed.
                    </p>

                    {pricingData.map((data, index) => {
                        const member = members.find(m => m.id === data.userId);
                        if (!member) return null;

                        return (
                            <div key={member.id} style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '16px',
                                backgroundColor: '#f9fafb'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '12px'
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
                                        {member.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#1f2937' }}>
                                            {member.name || 'Unknown Member'}
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                            {member.email}
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 100px',
                                    gap: '12px',
                                    marginBottom: '12px'
                                }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '4px'
                                        }}>
                                            Fixed Rate
                                        </label>
                                        <input
                                            type="number"
                                            value={data.fixedRate}
                                            onChange={(e) => handlePricingChange(member.id, 'fixedRate', parseFloat(e.target.value) || 0)}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '4px'
                                        }}>
                                            Currency
                                        </label>
                                        <select
                                            value={data.currency}
                                            onChange={(e) => handlePricingChange(member.id, 'currency', e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                fontSize: '14px'
                                            }}
                                        >
                                            <option value="INR">INR</option>
                                            <option value="INR">INR</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151',
                                        marginBottom: '4px'
                                    }}>
                                        Notes (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.notes}
                                        onChange={(e) => handlePricingChange(member.id, 'notes', e.target.value)}
                                        placeholder="e.g., Includes design and development"
                                        style={{
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isLoading}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? 'Saving...' : 'Save Pricing'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberPricingModal;
