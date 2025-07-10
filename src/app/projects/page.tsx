"use client";

import React from 'react';
import Link from 'next/link';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/ProjectCard';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Card from '../../components/ui/Card';

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h2 className="empty-state-title">Error Loading Projects</h2>
          <p className="empty-state-description">{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            <span>🔄</span>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Manage and track all your projects</p>
      </div>
      
      <div className="page-actions">
        <Link href="/projects/new" className="btn btn-primary">
          <span>➕</span>
          New Project
        </Link>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="card-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h2 className="empty-state-title">No Projects Yet</h2>
          <p className="empty-state-description">
            Create your first project to get started with managing your freelance work
          </p>
          <Link href="/projects/new" className="btn btn-primary">
            <span>✨</span>
            Create Your First Project
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;