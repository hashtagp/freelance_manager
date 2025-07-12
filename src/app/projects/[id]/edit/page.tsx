'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchProject, updateProject } from '@/lib/api';
import { Project, Team } from '@/types';
import TeamSelector from '@/components/TeamSelector';
import ProjectTeamPricing from '@/components/ProjectTeamPricing';
import '@/styles/projects.css';

const EditProjectPage = () => {
    const [project, setProject] = useState<Project | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active');
    const [budget, setBudget] = useState('');
    const [startDate, setStartDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedTeams, setAssignedTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingProject, setIsLoadingProject] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();
    const params = useParams();
    const projectId = params?.id as string;

    // Load project data on component mount
    useEffect(() => {
        const loadProject = async () => {
            if (!projectId) return;
            
            try {
                setIsLoadingProject(true);
                const projectData = await fetchProject(projectId);
                setProject(projectData);
                
                // Pre-populate form with existing data
                setTitle(projectData.title || '');
                setDescription(projectData.description || '');
                setStatus(projectData.status || 'active');
                setBudget(projectData.budget?.toString() || '');
                
                // Format dates for input fields
                if (projectData.startDate) {
                    const startDateObj = new Date(projectData.startDate);
                    setStartDate(startDateObj.toISOString().split('T')[0]);
                }
                if (projectData.deadline) {
                    const deadlineObj = new Date(projectData.deadline);
                    setDeadline(deadlineObj.toISOString().split('T')[0]);
                }
            } catch (error) {
                console.error('Failed to load project:', error);
                setError('Failed to load project data');
            } finally {
                setIsLoadingProject(false);
            }
        };

        loadProject();
    }, [projectId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        console.log('Updating project with data:', { title, description, status, budget, startDate, deadline });
        
        try {
            const updateData: any = {
                title,
                description,
                status,
            };

            // Only include budget if it's provided
            if (budget) {
                updateData.budget = parseFloat(budget);
            }

            // Only include dates if they're provided
            if (startDate) {
                updateData.startDate = new Date(startDate).toISOString();
            }
            if (deadline) {
                updateData.deadline = new Date(deadline).toISOString();
            }

            await updateProject(projectId, updateData);
            
            router.push(`/projects/${projectId}`);
        } catch (error) {
            console.error('Failed to update project:', error);
            setError(error instanceof Error ? error.message : 'Failed to update project');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingProject) {
        return (
            <div className="projects-container">
                <div className="projects-loading">
                    <div className="projects-loading-spinner"></div>
                    <p className="projects-loading-text">Loading project data...</p>
                </div>
            </div>
        );
    }

    if (error && !project) {
        return (
            <div className="projects-container">
                <div className="projects-empty-state">
                    <div className="projects-empty-icon">❌</div>
                    <h2 className="projects-empty-title">Error Loading Project</h2>
                    <p className="projects-empty-description">{error}</p>
                    <Link href="/projects" className="projects-new-btn">
                        <span>←</span>
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="projects-container">
            <div className="projects-header">
                <h1 className="projects-title">Edit Project</h1>
                <p className="projects-subtitle">Update your project details and settings</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {error && (
                    <div style={{ 
                        backgroundColor: '#fee2e2', 
                        color: '#dc2626', 
                        padding: '16px 20px', 
                        borderRadius: '12px', 
                        marginBottom: '24px',
                        border: '1px solid #fecaca',
                        textAlign: 'center',
                        fontWeight: '500'
                    }}>
                        {error}
                    </div>
                )}

                <div className="project-card-enhanced">
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <label htmlFor="title" style={{ 
                                    display: 'block', 
                                    marginBottom: '0.5rem', 
                                    fontWeight: '600', 
                                    color: '#374151' 
                                }}>
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#ffffff'
                                    }}
                                    placeholder="Enter project title..."
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="description" style={{ 
                                    display: 'block', 
                                    marginBottom: '0.5rem', 
                                    fontWeight: '600', 
                                    color: '#374151' 
                                }}>
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#ffffff',
                                        resize: 'vertical',
                                        minHeight: '120px'
                                    }}
                                    placeholder="Describe your project..."
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label htmlFor="status" style={{ 
                                    display: 'block', 
                                    marginBottom: '0.5rem', 
                                    fontWeight: '600', 
                                    color: '#374151' 
                                }}>
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                >
                                    <option value="PLANNING">Planning</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="REVIEW">Review</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="budget" style={{ 
                                    display: 'block', 
                                    marginBottom: '0.5rem', 
                                    fontWeight: '600', 
                                    color: '#374151' 
                                }}>
                                    Budget ($)
                                </label>
                                <input
                                    type="number"
                                    id="budget"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#ffffff'
                                    }}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <label htmlFor="startDate" style={{ 
                                    display: 'block', 
                                    marginBottom: '0.5rem', 
                                    fontWeight: '600', 
                                    color: '#374151' 
                                }}>
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>

                            <div>
                                <label htmlFor="deadline" style={{ 
                                    display: 'block', 
                                    marginBottom: '0.5rem', 
                                    fontWeight: '600', 
                                    color: '#374151' 
                                }}>
                                    Deadline
                                </label>
                                <input
                                    type="date"
                                    id="deadline"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>
                        </div>

                        {/* Team Management Section */}
                        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ 
                                fontSize: '1.2rem', 
                                fontWeight: '600', 
                                color: '#374151', 
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span>👥</span>
                                Assigned Teams
                            </h3>
                            <TeamSelector 
                                projectId={projectId}
                                onTeamsChange={(teams) => setAssignedTeams(teams)}
                            />
                        </div>

                        {/* Pricing Overview Section */}
                        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <ProjectTeamPricing projectId={projectId} />
                        </div>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                            <Link href={`/projects/${projectId}`} style={{
                                padding: '12px 24px',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                border: '2px solid #e5e7eb',
                                color: '#374151',
                                backgroundColor: '#ffffff',
                                transition: 'all 0.3s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span>←</span>
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                className="projects-new-btn"
                                disabled={isLoading}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <div style={{ 
                                            width: '16px', 
                                            height: '16px', 
                                            border: '2px solid rgba(255,255,255,0.3)', 
                                            borderTop: '2px solid white',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }}></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <span>💾</span>
                                        Update Project
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProjectPage;
