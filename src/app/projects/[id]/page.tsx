"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Project } from '../../../types';
import { fetchProject } from '../../../lib/api';
import ProjectTeamPricing from '../../../components/ProjectTeamPricing';
import ProjectPayouts from '../../../components/ProjectPayouts';
import ProjectPayins from '../../../components/ProjectPayins';

const ProjectPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getProject = async () => {
        const data = await fetchProject(id as string);
        setProject(data);
        setLoading(false);
      };
      getProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="spinner"></div>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h2 className="empty-state-title">Project Not Found</h2>
          <p className="empty-state-description">The project you're looking for doesn't exist or has been deleted.</p>
          <Link href="/projects" className="btn btn-primary">
            <span>📋</span>
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{project.title}</h1>
        <p className="page-subtitle">{project.description}</p>
      </div>

      <div className="page-actions">
        <Link href="/projects" className="btn btn-secondary">
          <span>←</span>
          Back to Projects
        </Link>
        <Link href={`/projects/${project.id}/edit`} className="btn btn-primary">
          <span>✏️</span>
          Edit Project
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Status</div>
          <div className="stat-number" style={{ fontSize: '1.5rem' }}>{project.status}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Budget</div>
          <div className="stat-number" style={{ fontSize: '1.5rem' }}>${project.budget || 'Not set'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Start Date</div>
          <div className="stat-number" style={{ fontSize: '1.2rem' }}>
            {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Deadline</div>
          <div className="stat-number" style={{ fontSize: '1.2rem' }}>
            {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not set'}
          </div>
        </div>
      </div>

      <div className="card-grid">
        {/* Team Pricing Overview */}
        <div style={{ gridColumn: '1 / -1', marginBottom: '2rem' }}>
          <ProjectTeamPricing projectId={project.id} />
        </div>

        {/* Client Payments */}
        <div style={{ gridColumn: '1 / -1', marginBottom: '2rem' }}>
          <ProjectPayins projectId={project.id} projectBudget={project.budget} />
        </div>

        {/* Project Payouts */}
        <div style={{ gridColumn: '1 / -1', marginBottom: '2rem' }}>
          <ProjectPayouts projectId={project.id} />
        </div>

        {project.client && (
          <div className="card-modern">
            <h3 className="card-title">Client Information</h3>
            <div className="card-description">
              <p><strong>Name:</strong> {project.client.name}</p>
              {project.client.email && <p><strong>Email:</strong> {project.client.email}</p>}
            </div>
          </div>
        )}
        
        {project.teamMembers && project.teamMembers.length > 0 && (
          <div className="card-modern">
            <h3 className="card-title">Team Members</h3>
            <div className="card-description">
              {project.teamMembers.map(member => (
                <div key={member.id} className="card-description" style={{ marginBottom: '8px' }}>
                  <strong>{member.role}</strong> - ${member.hourlyRate || 0}/hr
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;