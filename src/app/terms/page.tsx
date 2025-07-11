'use client';

import React from 'react';
import '@/styles/legal.css';

export default function TermsOfService() {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <header className="legal-header">
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-subtitle">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="legal-section">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using Payteams ("Service"), you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Description of Service</h2>
          <p>
            Payteams is a project management platform that provides the following services:
          </p>
          <ul>
            <li><strong>Project Management:</strong> Create, track, and manage projects with status updates, budgets, and deadlines</li>
            <li><strong>Team Management:</strong> Organize and manage your teams with dedicated team pages and member coordination</li>
            <li><strong>Dashboard Analytics:</strong> Access visual progress charts and project statistics</li>
            <li><strong>User Authentication:</strong> Secure login and registration system with protected routes</li>
            <li><strong>Database Integration:</strong> Reliable data storage and management powered by PostgreSQL and Prisma</li>
            <li><strong>Responsive Design:</strong> Mobile-first design that works on all devices</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. User Accounts</h2>
          <p>
            To access certain features of the Service, you must register for an account. When creating an account, you agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept all risks of unauthorized access to your account</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>4. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Upload, post, or transmit any content that is unlawful, harmful, threatening, or abusive</li>
            <li>Impersonate any person or entity or falsely state your affiliation with a person or entity</li>
            <li>Interfere with or disrupt the Service or servers connected to the Service</li>
            <li>Attempt to gain unauthorized access to any portion of the Service</li>
            <li>Use the Service for any commercial purpose without our express written consent</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. Project and Team Data</h2>
          <p>
            You retain ownership of all data, content, and information you submit to the Service, including:
          </p>
          <ul>
            <li>Project information, timelines, and budgets</li>
            <li>Team member details and organizational structures</li>
            <li>Progress reports and analytics data</li>
            <li>Any files or documents uploaded to projects</li>
          </ul>
          <p>
            By using our Service, you grant us a limited license to use, store, and process this data 
            solely for the purpose of providing and improving our services.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Dashboard and Analytics</h2>
          <p>
            Our dashboard analytics feature provides insights based on your project data. You acknowledge that:
          </p>
          <ul>
            <li>Analytics are generated from your submitted project data</li>
            <li>Progress charts and statistics are based on information you provide</li>
            <li>We do not guarantee the accuracy of analytics if based on incomplete data</li>
            <li>You are responsible for the accuracy of data entered into the system</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>7. Data Security and Authentication</h2>
          <p>
            We implement security measures to protect your account and data:
          </p>
          <ul>
            <li>Secure authentication system with protected routes</li>
            <li>Encrypted data transmission and storage</li>
            <li>Regular security updates and monitoring</li>
            <li>User session management and timeout policies</li>
          </ul>
          <p>
            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Service Availability</h2>
          <p>
            While we strive to maintain continuous service availability, we do not guarantee that:
          </p>
          <ul>
            <li>The Service will be available at all times</li>
            <li>The Service will be error-free or uninterrupted</li>
            <li>Database systems will be immune from data loss</li>
            <li>All features will work perfectly on all devices despite responsive design</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>9. Termination</h2>
          <p>
            Either party may terminate this agreement at any time. Upon termination:
          </p>
          <ul>
            <li>Your access to the Service will be immediately suspended</li>
            <li>We will retain your data for 30 days to allow for account recovery</li>
            <li>After 30 days, all project and team data may be permanently deleted</li>
            <li>You may request immediate data deletion upon account termination</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>10. Limitation of Liability</h2>
          <p>
            In no event shall Payteams be liable for any indirect, incidental, special, consequential, 
            or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
            or other intangible losses resulting from your use of the Service.
          </p>
        </div>

        <div className="legal-section">
          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any 
            material changes via email or through the Service. Your continued use of the Service 
            after such modifications constitutes acceptance of the updated terms.
          </p>
        </div>

        <div className="legal-section">
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us through 
            our support channels available in the application dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
