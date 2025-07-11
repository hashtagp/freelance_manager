import React from 'react';
import Link from 'next/link';
import { Project } from '../types';

interface ProjectCardEnhancedProps {
    project: Project;
}

const ProjectCardEnhanced: React.FC<ProjectCardEnhancedProps> = ({ project }) => {
    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'status-completed';
            case 'active': return 'status-active';
            case 'planning': return 'status-planning';
            case 'on_hold': return 'status-on_hold';
            default: return 'status-planning';
        }
    };

    const getProgressValue = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 100;
            case 'active': return 65;
            case 'planning': return 20;
            case 'on_hold': return 45;
            default: return 0;
        }
    };

    const formatCurrency = (amount: number | null | undefined) => {
        if (!amount) return 'Not set';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date: string | Date | null | undefined) => {
        if (!date) return 'Not set';
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const progressValue = getProgressValue(project.status);

    return (
        <div className="project-card-enhanced">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <Link href={`/projects/${project.id}`} className="project-card-title">
                    {project.title || 'Untitled Project'}
                </Link>
                <span className={`project-status-badge ${getStatusClass(project.status)}`}>
                    {project.status.replace('_', ' ')}
                </span>
            </div>

            <p className="project-card-description">
                {project.description || 'No description provided for this project.'}
            </p>

            <div className="project-progress">
                <div className="project-progress-label">
                    <span>Progress</span>
                    <span>{progressValue}%</span>
                </div>
                <div className="project-progress-bar">
                    <div 
                        className="project-progress-fill" 
                        style={{ width: `${progressValue}%` }}
                    ></div>
                </div>
            </div>

            <div className="project-card-stats">
                <div className="project-stat">
                    <div className="project-stat-label">Budget</div>
                    <div className={`project-stat-value ${project.budget ? 'project-budget' : ''}`}>
                        {formatCurrency(project.budget)}
                    </div>
                </div>
                <div className="project-stat">
                    <div className="project-stat-label">Team Size</div>
                    <div className="project-stat-value">
                        {project.teamMembers?.length || 0} members
                    </div>
                </div>
            </div>

            <div className="project-card-footer">
                <div className="project-deadline">
                    <span>📅</span>
                    <span>Due: {formatDate(project.deadline)}</span>
                </div>
                {project.user && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            backgroundColor: '#3b82f6', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: 'white', 
                            fontSize: '0.8rem', 
                            fontWeight: '600' 
                        }}>
                            {project.user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            {project.user.name || 'Unknown User'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCardEnhanced;
