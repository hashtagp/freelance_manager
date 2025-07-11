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

const DashboardNew: React.FC = () => {
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
                <p className="page-subtitle">Here's an overview of your freelance business</p>
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
                    value={`$${totalRevenue.toLocaleString()}`}
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
                <div className="card-header">
                    <h2 className="card-title">Recent Projects</h2>
                    <Link href="/projects" className="btn btn-outline">
                        <span>📋</span>
                        View All
                    </Link>
                </div>

                {projects.length > 0 ? (
                    <div className="card-grid">
                        {projects.slice(0, 3).map(project => (
                            <ProjectCard 
                                key={project.id} 
                                project={project}
                                className="animate-fadeIn"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state" style={{ margin: '32px 0' }}>
                        <div className="empty-state-icon">📋</div>
                        <h3 className="empty-state-title">No Projects Yet</h3>
                        <p className="empty-state-description">
                            Create your first project to get started with managing your freelance work
                        </p>
                        <Link href="/projects/new" className="btn btn-primary">
                            <span>✨</span>
                            Create Project
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardNew;
