"use client";

import React, { useState } from 'react';
import { TeamFormData } from '@/types';

interface TeamFormProps {
  onSubmit: (data: TeamFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<TeamFormData>;
  isLoading?: boolean;
}

interface TeamFormErrors {
  name?: string;
  description?: string;
  skills?: string;
  status?: string;
}

export const TeamForm: React.FC<TeamFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<TeamFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    skills: initialData?.skills || [],
    status: initialData?.status || 'active'
  });

  const [errors, setErrors] = useState<TeamFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: TeamFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Team name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (field: keyof TeamFormData, value: string) => {
    if (field === 'skills') {
      setFormData(prev => ({
        ...prev,
        skills: value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
      }));
    } else if (field === 'status') {
      setFormData(prev => ({
        ...prev,
        status: value as 'active' | 'inactive'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Team Name Field */}
      <div className="form-group">
        <label className="form-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>👥</span>
            Team Name
          </span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="form-input"
          placeholder="e.g., Design Dream Team, Marketing Masters..."
          required
          style={{ 
            background: errors.name ? 'rgba(239, 68, 68, 0.05)' : 'white',
            borderColor: errors.name ? '#ef4444' : '#e5e7eb'
          }}
        />
        {errors.name && (
          <div style={{ 
            color: '#ef4444', 
            fontSize: '0.85rem', 
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>⚠️</span>
            {errors.name}
          </div>
        )}
      </div>

      {/* Team Description Field */}
      <div className="form-group">
        <label className="form-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📝</span>
            Team Description
          </span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="form-textarea"
          placeholder="Describe your team's purpose, goals, and what makes them special..."
          required
          style={{ 
            background: errors.description ? 'rgba(239, 68, 68, 0.05)' : 'white',
            borderColor: errors.description ? '#ef4444' : '#e5e7eb'
          }}
        />
        {errors.description && (
          <div style={{ 
            color: '#ef4444', 
            fontSize: '0.85rem', 
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>⚠️</span>
            {errors.description}
          </div>
        )}
      </div>

      {/* Team Skills Field */}
      <div className="form-group">
        <label className="form-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎯</span>
            Skills
          </span>
        </label>
        <input
          type="text"
          value={formData.skills.join(', ')}
          onChange={(e) => handleChange('skills', e.target.value)}
          className="form-input"
          placeholder="e.g., React, Node.js, Design, Marketing (comma-separated)"
          style={{ 
            background: errors.skills ? 'rgba(239, 68, 68, 0.05)' : 'white',
            borderColor: errors.skills ? '#ef4444' : '#e5e7eb'
          }}
        />
        <div style={{ 
          fontSize: '0.85rem', 
          color: '#6b7280', 
          marginTop: '6px',
          fontStyle: 'italic'
        }}>
          Separate multiple skills with commas
        </div>
        {errors.skills && (
          <div style={{ 
            color: '#ef4444', 
            fontSize: '0.85rem', 
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>⚠️</span>
            {errors.skills}
          </div>
        )}
      </div>

      {/* Team Status Field */}
      <div className="form-group">
        <label className="form-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📊</span>
            Status
          </span>
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="form-input"
          style={{ 
            background: 'white',
            borderColor: '#e5e7eb'
          }}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Additional Team Settings */}
      <div style={{ 
        background: 'rgba(102, 126, 234, 0.05)', 
        borderRadius: '12px', 
        padding: '20px',
        border: '1px solid rgba(102, 126, 234, 0.1)'
      }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#1f2937', 
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>⚙️</span>
          Team Settings
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="notifications" defaultChecked />
            <label htmlFor="notifications" style={{ fontSize: '0.9rem', color: '#4b5563' }}>
              Enable notifications
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="publicTeam" />
            <label htmlFor="publicTeam" style={{ fontSize: '0.9rem', color: '#4b5563' }}>
              Make team public
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="allowInvites" defaultChecked />
            <label htmlFor="allowInvites" style={{ fontSize: '0.9rem', color: '#4b5563' }}>
              Allow member invites
            </label>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        justifyContent: 'flex-end',
        paddingTop: '24px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="btn btn-secondary"
          style={{ minWidth: '120px' }}
        >
          <span>❌</span>
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
          style={{ minWidth: '160px' }}
        >
          {isLoading ? (
            <>
              <div className="spinner" style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid rgba(255,255,255,0.3)', 
                borderTop: '2px solid white',
                margin: '0'
              }}></div>
              Creating Team...
            </>
          ) : (
            <>
              <span>✨</span>
              {initialData ? 'Update Team' : 'Create Team'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};
