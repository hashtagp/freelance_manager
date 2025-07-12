'use client';

import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { useTeams } from '../hooks/useTeams';
import ProjectCard from './ProjectCard';
import StatsCard from './ui/StatsCard';
import QuickActions from './ui/QuickActions';
import ProgressChart from './charts/ProgressChart';
import LoadingSpinner from './ui/LoadingSpinner';
import Link from 'next/link';

const Dashboard: React.FC = () => {
    const { projects, loading: projectsLoading, error: projectsError } = useProjects();
    const { teams, loading: teamsLoading, error: teamsError } = useTeams();

    if (projectsLoading || teamsLoading) {
        return (
            <div className="empty-state">
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (projectsError || teamsError) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">❌</div>
                <h2 className="empty-state-title">Error Loading Dashboard</h2>
                <p className="empty-state-description">Please try refreshing the page</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                    <span>🔄</span>
                    Refresh
                </button>
            </div>
        );
    }

    const completedProjects = projects.filter(p => p.status.toLowerCase() === 'completed').length;
    const activeProjects = projects.filter(p => p.status.toLowerCase() === 'in_progress').length;
    const totalRevenue = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const planningProjects = projects.filter(p => p.status.toLowerCase() === 'planning').length;

    const progressData = [
        {
            label: 'Completed Projects',
            value: completedProjects,
            total: projects.length,
            color: 'var(--gradient-success)'
        },
        {
            label: 'Active Projects',
            value: activeProjects,
            total: projects.length,
            color: 'var(--gradient-primary)'
        },
        {
            label: 'Planning Projects',
            value: planningProjects,
            total: projects.length,
            color: 'var(--gradient-secondary)'
        }
    ];

    return (
        <div className="animate-fadeIn">
            {/* Welcome Section */}
            <div className="page-header">
                <h1 className="page-title">Welcome to Your Dashboard</h1>
                <p className="page-subtitle">Here's an overview of your business</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid" style={{ marginBottom: '32px' }}>
                <StatsCard
                    title="Total Projects"
                    value={projects.length}
                    icon="📊"
                    change={projects.length > 0 ? "+1 this month" : ""}
                    changeType="positive"
                />
                <StatsCard
                    title="Active Projects"
                    value={activeProjects}
                    icon="🚀"
                    change={activeProjects > 0 ? "In progress" : "None active"}
                    changeType={activeProjects > 0 ? "positive" : "neutral"}
                />
                <StatsCard
                    title="Completed"
                    value={completedProjects}
                    icon="✅"
                    change={completedProjects > 0 ? `${((completedProjects/projects.length)*100).toFixed(0)}% complete` : ""}
                    changeType="positive"
                />
                <StatsCard
                    title="Total Revenue"
                    value={`₹${totalRevenue.toLocaleString()}`}
                    icon="💰"
                    change={totalRevenue > 0 ? "Revenue goal" : ""}
                    changeType="positive"
                />
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '32px' }}>
                
                {/* Quick Actions */}
                <QuickActions />
                
                {/* Progress Chart */}
                <ProgressChart 
                    title="Project Progress Overview" 
                    data={progressData}
                />
            </div>

            {/* Recent Projects Section */}
            <div className="card-modern">
                <div className="card-header" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <div>
                        <h2 className="card-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Recent Projects</h2>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
                            Your latest projects and their current status
                        </p>
                    </div>
                    <Link href="/projects" className="btn btn-outline" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                    }}>
                        <span>📋</span>
                        View All
                    </Link>
                </div>

                {projects.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {projects.slice(0, 4).map(project => (
                            <Link 
                                key={project.id} 
                                href={`/projects/${project.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div style={{
                                    padding: '1.25rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    backgroundColor: '#ffffff',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#3b82f6';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                margin: 0,
                                                fontSize: '1.125rem',
                                                fontWeight: '600',
                                                color: '#374151',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {project.title}
                                            </h3>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '0.875rem',
                                                color: '#6b7280',
                                                lineHeight: '1.4'
                                            }}>
                                                {project.description && project.description.length > 100 
                                                    ? `${project.description.substring(0, 100)}...` 
                                                    : project.description || 'No description'}
                                            </p>
                                        </div>
                                        <div style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            backgroundColor: 
                                                project.status.toLowerCase() === 'completed' ? '#ecfdf5' :
                                                project.status.toLowerCase() === 'in_progress' ? '#eff6ff' :
                                                project.status.toLowerCase() === 'planning' ? '#fef3c7' : '#f3f4f6',
                                            color:
                                                project.status.toLowerCase() === 'completed' ? '#059669' :
                                                project.status.toLowerCase() === 'in_progress' ? '#2563eb' :
                                                project.status.toLowerCase() === 'planning' ? '#d97706' : '#6b7280',
                                            border: `1px solid ${
                                                project.status.toLowerCase() === 'completed' ? '#bbf7d0' :
                                                project.status.toLowerCase() === 'in_progress' ? '#bfdbfe' :
                                                project.status.toLowerCase() === 'planning' ? '#fde68a' : '#d1d5db'
                                            }`,
                                            marginLeft: '1rem'
                                        }}>
                                            {project.status.replace('_', ' ')}
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <span>💰</span>
                                                <span>₹{project.budget?.toLocaleString() || 'Not set'}</span>
                                            </div>
                                            {project.deadline && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <span>📅</span>
                                                    <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                            {project.client && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <span>👤</span>
                                                    <span>{project.client.name}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            color: '#9ca3af',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        }}>
                                            <span>→</span>
                                            <span>View Details</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state" style={{ margin: '2rem 0', textAlign: 'center' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            fontSize: '1.5rem'
                        }}>
                            📋
                        </div>
                        <h3 style={{
                            margin: '0 0 0.5rem 0',
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#374151'
                        }}>
                            No Projects Yet
                        </h3>
                        <p style={{
                            margin: '0 0 1.5rem 0',
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            maxWidth: '300px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: '1.5'
                        }}>
                            Create your first project to get started with managing your freelance work
                        </p>
                        <Link href="/projects/new" className="btn btn-primary" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}>
                            <span>✨</span>
                            Create Project
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
