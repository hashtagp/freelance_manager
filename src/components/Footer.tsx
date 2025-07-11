"use client";

import React from 'react';
import Link from 'next/link';
import '@/styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <span>P</span>
              </div>
              <span className="footer-logo-text">Payteams</span>
            </div>
            <p className="footer-description">
              Streamline your business with our modern, intuitive project management solution. 
              Track projects, manage teams, and grow your business with ease.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#" className="footer-social-link" aria-label="GitHub">
                <span>💻</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/dashboard" className="footer-link">Dashboard</Link></li>
              <li><Link href="/projects" className="footer-link">Projects</Link></li>
              <li><Link href="/teams" className="footer-link">Teams</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="footer-section">
            <h3 className="footer-section-title">Features</h3>
            <ul className="footer-links">
              <li><span className="footer-link">Project Management</span></li>
              <li><span className="footer-link">Team Collaboration</span></li>
              <li><span className="footer-link">Analytics & Reports</span></li>
              <li><span className="footer-link">User Authentication</span></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-section-title">Support</h3>
            <ul className="footer-links">
              <li><Link href="/help" className="footer-link">Help Center</Link></li>
              <li><Link href="/documentation" className="footer-link">Documentation</Link></li>
              <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Payteams. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link href="/terms" className="footer-bottom-link">Terms of Service</Link>
              <Link href="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
