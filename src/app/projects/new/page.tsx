'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProject } from '@/lib/api';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import '../../../styles/projects.css';

const NewProjectPage = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        console.log('Creating project with data:', { name: projectName, description });
        
        try {
            await createProject({
                name: projectName,  // API expects 'name' field
                description,
            });
            
            router.push('/projects');
        } catch (error) {
            console.error('Failed to create project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="projects-container">
            <div className="projects-header">
                <h1 className="projects-title">Create New Project</h1>
                <p className="projects-subtitle">Start a new freelance project and track your progress</p>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="project-card-enhanced">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="projectName" style={{ 
                                display: 'block', 
                                marginBottom: '0.5rem', 
                                fontWeight: '600', 
                                color: '#374151' 
                            }}>
                                Project Name
                            </label>
                            <input
                                type="text"
                                id="projectName"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
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
                                placeholder="Enter project name..."
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>
                        
                        <div className="form-group" style={{ marginBottom: '2rem' }}>
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
                                required
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
                                    minHeight: '100px'
                                }}
                                placeholder="Describe your project..."
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                            <Link href="/projects" style={{
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
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <span>✨</span>
                                        Create Project
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </ProtectedRoute>
    );
};

export default NewProjectPage;