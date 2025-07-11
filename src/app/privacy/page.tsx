'use client';

import React from 'react';
import '@/styles/legal.css';

export default function PrivacyPolicy() {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <header className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-subtitle">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="legal-section">
          <h2>1. Information We Collect</h2>
          <p>
            When you use Payteams, we collect information that you provide directly to us and information 
            that is automatically collected when you use our Service.
          </p>
          
          <h3>Personal Information</h3>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, and password when you register</li>
            <li><strong>Profile Information:</strong> Additional details you choose to add to your profile</li>
            <li><strong>Contact Information:</strong> Information you provide when contacting our support</li>
          </ul>

          <h3>Project and Business Data</h3>
          <ul>
            <li><strong>Project Information:</strong> Project names, descriptions, budgets, deadlines, and status updates</li>
            <li><strong>Team Data:</strong> Team member information, roles, and organizational structures</li>
            <li><strong>Analytics Data:</strong> Project progress, completion rates, and performance metrics</li>
            <li><strong>Files and Documents:</strong> Any files you upload or attach to projects</li>
          </ul>

          <h3>Technical Information</h3>
          <ul>
            <li><strong>Usage Data:</strong> How you interact with our Service, features used, and time spent</li>
            <li><strong>Device Information:</strong> Device type, operating system, and browser information</li>
            <li><strong>Log Data:</strong> IP address, access times, and pages viewed</li>
            <li><strong>Authentication Data:</strong> Login sessions, security tokens, and access patterns</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          
          <h3>Provide and Maintain the Service</h3>
          <ul>
            <li>Create and manage your account and user authentication</li>
            <li>Store and organize your project and team data</li>
            <li>Generate dashboard analytics and progress charts</li>
            <li>Ensure responsive design functionality across all devices</li>
            <li>Maintain database integrity and data synchronization</li>
          </ul>

          <h3>Improve and Develop the Service</h3>
          <ul>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Develop new features based on user needs</li>
            <li>Optimize performance and fix technical issues</li>
            <li>Improve our analytics and reporting capabilities</li>
          </ul>

          <h3>Communicate with You</h3>
          <ul>
            <li>Send important updates about your projects and teams</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Send notifications about service changes or updates</li>
            <li>Share relevant tips and best practices for project management</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. Data Storage and Security</h2>
          
          <h3>Database Security</h3>
          <p>
            Your data is stored securely using PostgreSQL with Prisma ORM, which provides:
          </p>
          <ul>
            <li>Encrypted data transmission using HTTPS/TLS protocols</li>
            <li>Secure database connections and access controls</li>
            <li>Regular security updates and patches</li>
            <li>Automated backups and data redundancy</li>
          </ul>

          <h3>Authentication Security</h3>
          <ul>
            <li>Secure user authentication with password encryption</li>
            <li>Protected routes that require valid authentication</li>
            <li>Session management and automatic logout policies</li>
            <li>Multi-layer security verification for sensitive operations</li>
          </ul>

          <h3>Access Controls</h3>
          <ul>
            <li>Role-based access to team and project information</li>
            <li>User-specific data isolation and privacy controls</li>
            <li>Administrative access logging and monitoring</li>
            <li>Regular security audits and vulnerability assessments</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>4. Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
          
          <h3>Within Your Team</h3>
          <ul>
            <li>Project information is shared with team members you invite</li>
            <li>Dashboard analytics may be visible to team administrators</li>
            <li>Team management features allow designated leaders to view member activity</li>
          </ul>

          <h3>Legal Requirements</h3>
          <ul>
            <li>When required by law or legal process</li>
            <li>To protect our rights, property, or safety</li>
            <li>To enforce our Terms of Service</li>
            <li>In connection with fraud prevention or security issues</li>
          </ul>

          <h3>Service Providers</h3>
          <ul>
            <li>Third-party services that help us operate the platform</li>
            <li>Cloud hosting providers for database and application hosting</li>
            <li>Analytics services to understand platform usage (anonymized data only)</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. Your Data Rights and Controls</h2>
          
          <h3>Access and Portability</h3>
          <ul>
            <li>View all your personal and project data through the dashboard</li>
            <li>Export your project data and analytics reports</li>
            <li>Download team information and member lists</li>
            <li>Access your account activity and login history</li>
          </ul>

          <h3>Modification and Deletion</h3>
          <ul>
            <li>Edit your profile information and account settings</li>
            <li>Update or delete project and team information</li>
            <li>Remove team members and revoke access permissions</li>
            <li>Delete your account and request data removal</li>
          </ul>

          <h3>Privacy Controls</h3>
          <ul>
            <li>Control who can see your project information</li>
            <li>Manage team member access levels and permissions</li>
            <li>Configure notification preferences and communication settings</li>
            <li>Opt out of non-essential communications</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>6. Data Retention</h2>
          <p>We retain your information for as long as necessary to provide the Service and fulfill the purposes outlined in this policy:</p>
          <ul>
            <li><strong>Account Data:</strong> Until you delete your account</li>
            <li><strong>Project Information:</strong> Until you delete projects or your account</li>
            <li><strong>Team Data:</strong> Until teams are disbanded or accounts are deleted</li>
            <li><strong>Analytics Data:</strong> Aggregated and anonymized data may be retained for service improvement</li>
            <li><strong>Log Data:</strong> Typically retained for 12 months for security and debugging purposes</li>
          </ul>
          <p>
            After account deletion, we will delete your personal data within 30 days, except where we are legally required to retain certain information.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Maintain your login session and authentication state</li>
            <li>Remember your preferences and dashboard settings</li>
            <li>Ensure responsive design adapts to your device</li>
            <li>Analyze how you use the Service to improve functionality</li>
            <li>Provide analytics on project and team performance</li>
          </ul>
          <p>
            You can control cookie settings through your browser, but some features may not work properly if cookies are disabled.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Third-Party Integrations</h2>
          <p>
            Our Service may integrate with third-party tools to enhance project management capabilities. 
            When you use these integrations:
          </p>
          <ul>
            <li>You may be sharing data with the third-party service</li>
            <li>Third-party privacy policies will also apply</li>
            <li>We recommend reviewing privacy policies of integrated services</li>
            <li>You can disconnect integrations at any time through your dashboard</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. 
            We ensure that such transfers are conducted in accordance with applicable privacy laws and 
            that appropriate safeguards are in place to protect your data.
          </p>
        </div>

        <div className="legal-section">
          <h2>10. Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We do not knowingly collect 
            personal information from children under 13. If you are a parent or guardian and believe 
            your child has provided us with personal information, please contact us.
          </p>
        </div>

        <div className="legal-section">
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material 
            changes by posting the new Privacy Policy on this page and updating the "Last updated" date. 
            We encourage you to review this Privacy Policy periodically.
          </p>
        </div>

        <div className="legal-section">
          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us through:
          </p>
          <ul>
            <li>The support section in your dashboard</li>
            <li>The contact form available in the application</li>
            <li>The help center accessible from the main navigation</li>
          </ul>
          <p>
            We are committed to resolving any privacy concerns you may have and will respond to your 
            inquiry within a reasonable timeframe.
          </p>
        </div>
      </div>
    </div>
  );
}
