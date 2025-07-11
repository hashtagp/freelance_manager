'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import '@/styles/home.css';

export default function HomePage() {
  const { isAuthenticated, setShowAuthModal } = useAuth();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">
            Payteams
          </h1>
          <p className="hero-subtitle animate-fade-in-delay-1">
            Streamline your business with our modern, intuitive project management solution. 
            Track projects, manage teams, and grow your business with ease.
          </p>
          <div className="hero-buttons animate-fade-in-delay-2">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn-primary">
                  Go to Dashboard →
                </Link>
                <Link href="/projects" className="btn-secondary">
                  View Projects
                </Link>
              </>
            ) : (
              <>
                <button 
                  className="btn-primary"
                  onClick={() => setShowAuthModal(true)}
                >
                  Get Started →
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">
            Why Choose Our Platform?
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">�</span>
              <h3 className="feature-title">Project Management</h3>
              <p className="feature-description">
                Create, track, and manage projects with status updates, budgets, and deadlines.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">👥</span>
              <h3 className="feature-title">Team Management</h3>
              <p className="feature-description">
                Organize and manage your teams with dedicated team pages and member coordination.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">�</span>
              <h3 className="feature-title">Dashboard Analytics</h3>
              <p className="feature-description">
                Get insights with visual progress charts and project statistics on your dashboard.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔐</span>
              <h3 className="feature-title">User Authentication</h3>
              <p className="feature-description">
                Secure login and registration system with protected routes and user sessions.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">�️</span>
              <h3 className="feature-title">Database Integration</h3>
              <p className="feature-description">
                Powered by PostgreSQL and Prisma for reliable data storage and management.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h3 className="feature-title">Responsive Design</h3>
              <p className="feature-description">
                Modern, mobile-first design that works perfectly on all devices and screen sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Transform Your Business?</h2>
          <p className="cta-subtitle">
            Join us to efficieantly manage your projects and grow your business.
          </p>
          <Link href="/dashboard" className="btn-cta">
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </div>
  );
}