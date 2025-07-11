'use client';

import React from 'react';
import Link from 'next/link';
import '@/styles/documentation.css';

export default function Documentation() {
  return (
    <div className="docs-container">
      <div className="docs-content">
        <header className="docs-header">
          <h1 className="docs-title">Documentation</h1>
          <p className="docs-subtitle">
            Complete guide to using Payteams for project and team management
          </p>
        </header>

        <div className="docs-nav">
          <div className="nav-section">
            <h3>Quick Start</h3>
            <ul>
              <li><a href="#getting-started">Getting Started</a></li>
              <li><a href="#first-project">Creating Your First Project</a></li>
              <li><a href="#team-setup">Setting Up Teams</a></li>
            </ul>
          </div>
          <div className="nav-section">
            <h3>Features</h3>
            <ul>
              <li><a href="#projects">Project Management</a></li>
              <li><a href="#teams">Team Management</a></li>
              <li><a href="#analytics">Dashboard Analytics</a></li>
              <li><a href="#security">Security Features</a></li>
            </ul>
          </div>
        </div>

        <div className="docs-sections">
          <section id="getting-started" className="docs-section">
            <h2>🚀 Getting Started</h2>
            <p>
              Welcome to Payteams! This modern project management platform helps you streamline 
              your business operations, track projects, and manage teams effectively.
            </p>
            
            <h3>What is Payteams?</h3>
            <p>
              Payteams is a comprehensive project management solution designed for modern businesses. 
              It combines powerful project tracking, team collaboration, and insightful analytics 
              in a responsive, user-friendly interface.
            </p>

            <h3>Key Features Overview</h3>
            <ul>
              <li><strong>Project Management:</strong> Create, track, and manage projects with budgets, deadlines, and status updates</li>
              <li><strong>Team Management:</strong> Organize teams, assign roles, and coordinate member activities</li>
              <li><strong>Dashboard Analytics:</strong> Visual progress charts and detailed project statistics</li>
              <li><strong>User Authentication:</strong> Secure login system with protected routes and user sessions</li>
              <li><strong>Database Integration:</strong> Reliable PostgreSQL database with Prisma ORM</li>
              <li><strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile devices</li>
            </ul>

            <h3>System Requirements</h3>
            <ul>
              <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
              <li>Internet connection for real-time synchronization</li>
              <li>JavaScript enabled</li>
            </ul>
          </section>

          <section id="first-project" className="docs-section">
            <h2>📋 Creating Your First Project</h2>
            
            <h3>Step 1: Access the Projects Page</h3>
            <p>
              After signing in, navigate to the Projects page using the main navigation menu, 
              or click "New Project" from your Dashboard.
            </p>

            <h3>Step 2: Fill Project Details</h3>
            <ul>
              <li><strong>Project Name:</strong> Enter a descriptive name for your project</li>
              <li><strong>Description:</strong> Provide details about project goals and scope</li>
              <li><strong>Budget:</strong> Set the project budget (optional)</li>
              <li><strong>Deadline:</strong> Choose the project completion date</li>
              <li><strong>Status:</strong> Select initial status (Planning, In Progress, etc.)</li>
            </ul>

            <h3>Step 3: Save and Manage</h3>
            <p>
              Once created, your project will appear in your Dashboard with progress tracking. 
              You can edit details, update status, and assign teams at any time.
            </p>
          </section>

          <section id="team-setup" className="docs-section">
            <h2>👥 Setting Up Teams</h2>
            
            <h3>Creating a Team</h3>
            <ol>
              <li>Go to the Teams page from the main navigation</li>
              <li>Click "New Team" or "Create Team"</li>
              <li>Enter team name and description</li>
              <li>Add team members by email address</li>
              <li>Assign roles and permissions</li>
              <li>Save the team configuration</li>
            </ol>

            <h3>Managing Team Members</h3>
            <ul>
              <li><strong>Adding Members:</strong> Use the "Add Member" button and enter email addresses</li>
              <li><strong>Removing Members:</strong> Select members and choose "Remove" from team settings</li>
              <li><strong>Role Management:</strong> Assign administrator or member roles based on responsibilities</li>
              <li><strong>Project Assignment:</strong> Assign teams to specific projects for collaboration</li>
            </ul>
          </section>

          <section id="projects" className="docs-section">
            <h2>📊 Project Management</h2>
            
            <h3>Project Dashboard</h3>
            <p>
              Each project has its own dashboard showing:
            </p>
            <ul>
              <li>Current status and progress percentage</li>
              <li>Budget tracking and financial overview</li>
              <li>Timeline and deadline information</li>
              <li>Assigned team members and their roles</li>
              <li>Recent activity and updates</li>
            </ul>

            <h3>Status Management</h3>
            <p>Available project statuses:</p>
            <ul>
              <li><strong>Planning:</strong> Project is in initial planning phase</li>
              <li><strong>In Progress:</strong> Active development or execution</li>
              <li><strong>Review:</strong> Project completed, pending review</li>
              <li><strong>Completed:</strong> Project successfully finished</li>
              <li><strong>On Hold:</strong> Project temporarily paused</li>
              <li><strong>Cancelled:</strong> Project discontinued</li>
            </ul>

            <h3>Budget Tracking</h3>
            <p>
              Monitor project finances with budget allocation, spending tracking, 
              and cost analysis tools. Set budget alerts and generate financial reports.
            </p>
          </section>

          <section id="teams" className="docs-section">
            <h2>🤝 Team Management</h2>
            
            <h3>Team Collaboration</h3>
            <p>
              Teams can collaborate on projects through:
            </p>
            <ul>
              <li>Shared project access and editing permissions</li>
              <li>Real-time updates and status synchronization</li>
              <li>Team member activity tracking</li>
              <li>Collaborative project planning and execution</li>
            </ul>

            <h3>Permission Levels</h3>
            <ul>
              <li><strong>Administrator:</strong> Full access to team and project management</li>
              <li><strong>Member:</strong> Can view and update assigned projects</li>
              <li><strong>Viewer:</strong> Read-only access to project information</li>
            </ul>

            <h3>Team Analytics</h3>
            <p>
              Track team performance with metrics on project completion rates, 
              time allocation, and collaboration patterns.
            </p>
          </section>

          <section id="analytics" className="docs-section">
            <h2>📈 Dashboard Analytics</h2>
            
            <h3>Overview Dashboard</h3>
            <p>
              Your main dashboard provides a comprehensive view of:
            </p>
            <ul>
              <li>Active projects and their current status</li>
              <li>Team performance and workload distribution</li>
              <li>Budget allocation and spending analysis</li>
              <li>Upcoming deadlines and milestones</li>
              <li>Progress charts and trend analysis</li>
            </ul>

            <h3>Progress Charts</h3>
            <p>
              Visual representations include:
            </p>
            <ul>
              <li><strong>Project Progress:</strong> Completion percentage over time</li>
              <li><strong>Budget Analysis:</strong> Spending vs. allocation charts</li>
              <li><strong>Team Activity:</strong> Member contribution and activity levels</li>
              <li><strong>Timeline View:</strong> Project schedules and deadline tracking</li>
            </ul>

            <h3>Custom Reports</h3>
            <p>
              Generate detailed reports for project performance, team productivity, 
              and financial analysis. Export data for external analysis or presentations.
            </p>
          </section>

          <section id="security" className="docs-section">
            <h2>🔐 Security Features</h2>
            
            <h3>User Authentication</h3>
            <ul>
              <li>Secure registration and login process</li>
              <li>Password encryption and protection</li>
              <li>Session management and automatic timeout</li>
              <li>Protected routes for sensitive information</li>
            </ul>

            <h3>Data Protection</h3>
            <ul>
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Secure PostgreSQL database storage</li>
              <li>Regular security updates and patches</li>
              <li>Access logging and monitoring</li>
            </ul>

            <h3>Privacy Controls</h3>
            <ul>
              <li>User-specific data isolation</li>
              <li>Team-based access permissions</li>
              <li>Data export and deletion options</li>
              <li>Compliance with privacy regulations</li>
            </ul>
          </section>
        </div>

        <div className="docs-footer">
          <h2>Need More Help?</h2>
          <p>
            Can't find what you're looking for in the documentation? 
            Check out our Help Center or contact our support team.
          </p>
          <div className="docs-actions">
            <Link href="/help" className="docs-btn primary">
              Visit Help Center
            </Link>
            <Link href="/contact" className="docs-btn secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
