"use client";

import React from 'react';
import Link from 'next/link';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/ProjectCard';
import ProjectCardEnhanced from '../../components/ProjectCardEnhanced';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Card from '../../components/ui/Card';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import '../../styles/projects.css';

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  return (
    <ProtectedRoute>
      {loading && (
        <div className="projects-container">
          <div className="projects-loading">
            <div className="projects-loading-spinner"></div>
            <p className="projects-loading-text">Loading projects...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="projects-container">
          <div className="projects-empty-state">
            <div className="projects-empty-icon">❌</div>
            <h2 className="projects-empty-title">Error Loading Projects</h2>
            <p className="projects-empty-description">{error}</p>
            <button className="projects-new-btn" onClick={() => window.location.reload()}>
              <span>🔄</span>
              Try Again
            </button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="projects-container">
      {/* Header */}
      <div className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">Manage and track all your projects</p>
      </div>
      
      <div className="projects-actions">
        <Link href="/projects/new" className="projects-new-btn">
          <span>➕</span>
          New Project
        </Link>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCardEnhanced key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="projects-empty-state">
          <div className="projects-empty-icon">📋</div>
          <h2 className="projects-empty-title">No Projects Yet</h2>
          <p className="projects-empty-description">
            Create your first project to get started with managing your freelance work
          </p>
          <Link href="/projects/new" className="projects-new-btn">
            <span>✨</span>
            Create Your First Project
          </Link>
        </div>
      )}
        </div>
      )}
    </ProtectedRoute>
  );
};

export default ProjectsPage;