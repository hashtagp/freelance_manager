'use client';

import React from 'react';
import '@/styles/contact.css';

export default function ContactUs() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <header className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Get in touch with our support team. We're here to help you succeed with Payteams.
          </p>
        </header>

        <div className="contact-layout">
          {/* Contact Information */}
          <div className="contact-info-full">
            <div className="info-section">
              <h2>Get in Touch</h2>
              <p>
                Have questions about Payteams? Need help with your projects or teams? 
                Our dedicated support team is ready to assist you. Please reach out to us 
                using the contact information below.
              </p>
            </div>

            <div className="info-section">
              <h3>📧 Email Support</h3>
              <p>
                <strong>General Support:</strong><br />
                <a href="mailto:support@payteams.com" className="email-link">
                  support@payteams.com
                </a>
              </p>
              <p>
                <strong>Technical Issues:</strong><br />
                <a href="mailto:tech@payteams.com" className="email-link">
                  tech@payteams.com
                </a>
              </p>
              <p>
                <strong>Business Inquiries:</strong><br />
                <a href="mailto:business@payteams.com" className="email-link">
                  business@payteams.com
                </a>
              </p>
            </div>

            <div className="info-section">
              <h3>💬 Response Times</h3>
              <ul>
                <li><strong>General Support:</strong> Within 24 hours</li>
                <li><strong>Technical Issues:</strong> Within 4-8 hours</li>
                <li><strong>Critical Issues:</strong> Within 2 hours</li>
                <li><strong>Business Inquiries:</strong> Within 48 hours</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>🕒 Support Hours</h3>
              <p>
                <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (IST)<br />
                <strong>Saturday:</strong> 10:00 AM - 4:00 PM (IST)<br />
                <strong>Sunday:</strong> Closed
              </p>
              <p>
                <em>Emergency technical support available 24/7 for critical issues.</em>
              </p>
            </div>

            <div className="info-section">
              <h3>🔗 Quick Links</h3>
              <ul>
                <li><a href="/help">Help Center & FAQs</a></li>
                <li><a href="/documentation">Documentation</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>

            <div className="info-section contact-cta">
              <h3>📬 How to Contact Us</h3>
              <p>
                For the fastest response, please email us directly using the appropriate 
                email address above based on your inquiry type. Include as much detail 
                as possible about your question or issue to help us assist you effectively.
              </p>
              <div className="email-buttons">
                <a href="mailto:support@payteams.com" className="email-btn primary">
                  📧 General Support
                </a>
                <a href="mailto:tech@payteams.com" className="email-btn secondary">
                  🔧 Technical Help
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-additional">
          <h2>Additional Resources</h2>
          <div className="resource-grid">
            <div className="resource-card">
              <span className="resource-icon">📚</span>
              <h3>Documentation</h3>
              <p>Comprehensive guides on using all Payteams features</p>
              <a href="/documentation" className="resource-link">Read Docs →</a>
            </div>
            <div className="resource-card">
              <span className="resource-icon">❓</span>
              <h3>Help Center</h3>
              <p>Frequently asked questions and troubleshooting guides</p>
              <a href="/help" className="resource-link">Get Help →</a>
            </div>
            <div className="resource-card">
              <span className="resource-icon">🔒</span>
              <h3>Security</h3>
              <p>Information about data protection and privacy measures</p>
              <a href="/privacy" className="resource-link">Privacy Policy →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
