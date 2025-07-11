'use client';

import React, { useState } from 'react';
import '@/styles/help.css';

export default function HelpCenter() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create my first project?",
      answer: "To create your first project, go to the Dashboard and click on 'New Project' or navigate to the Projects page and click the 'Create Project' button. Fill in the project name, description, budget, and deadline, then click 'Save' to create your project."
    },
    {
      question: "How can I add team members to my project?",
      answer: "First, create a team by going to the Teams page and clicking 'New Team'. Add team members by entering their email addresses. Once your team is created, you can assign it to projects from the project details page."
    },
    {
      question: "Where can I view project analytics and progress?",
      answer: "You can view detailed analytics on your Dashboard, which shows progress charts, project statistics, and completion rates. Each individual project page also displays specific progress metrics and visual charts for that project."
    },
    {
      question: "How do I update project status and deadlines?",
      answer: "Navigate to the specific project page and click the 'Edit' button. You can update the project status, modify deadlines, adjust budgets, and change other project details. All changes are automatically saved and reflected in your analytics."
    },
    {
      question: "Can I access Payteams on my mobile device?",
      answer: "Yes! Payteams features a responsive design that works perfectly on all devices including smartphones, tablets, and desktop computers. Simply access the website through your mobile browser for the full experience."
    },
    {
      question: "How secure is my project data?",
      answer: "Your data is highly secure. We use encrypted data transmission (HTTPS), secure authentication systems, protected routes, and store all data in encrypted PostgreSQL databases. Only you and team members you invite can access your project information."
    },
    {
      question: "How do I invite team members?",
      answer: "Go to the Teams page, select your team, and click 'Add Member'. Enter the email addresses of people you want to invite. They'll receive an invitation to join your team and access assigned projects."
    },
    {
      question: "Can I export my project data?",
      answer: "Yes, you can export project data and analytics reports from your Dashboard. Look for the export options in the analytics section to download your project information in various formats."
    },
    {
      question: "What happens if I forget my password?",
      answer: "Click on 'Forgot Password' on the sign-in page. Enter your email address and you'll receive instructions to reset your password. For additional security, you may need to verify your identity."
    },
    {
      question: "How do I delete a project or team?",
      answer: "To delete a project, go to the project page and click 'Delete Project'. For teams, go to the Teams page, select the team, and choose 'Delete Team'. Note that deleted data cannot be recovered, so please be certain before deleting."
    },
    {
      question: "Can I collaborate with team members in real-time?",
      answer: "Yes! Team members can access shared projects simultaneously, update project status, and view real-time changes in project analytics. All team activities are synchronized across the platform."
    },
    {
      question: "How do I manage team permissions?",
      answer: "When creating or editing a team, you can assign different roles to team members. Team administrators can manage members and project assignments, while regular members can view and update assigned projects."
    }
  ];

  return (
    <div className="help-container">
      <div className="help-content">
        <header className="help-header">
          <h1 className="help-title">Help Center</h1>
          <p className="help-subtitle">
            Find answers to frequently asked questions about using Payteams
          </p>
        </header>

        <div className="help-search">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search for help topics..." 
              className="search-input"
            />
          </div>
        </div>

        <div className="help-categories">
          <div className="category-card">
            <span className="category-icon">🚀</span>
            <h3>Getting Started</h3>
            <p>Learn the basics of setting up projects and teams</p>
          </div>
          <div className="category-card">
            <span className="category-icon">👥</span>
            <h3>Team Management</h3>
            <p>Organize and collaborate with your team members</p>
          </div>
          <div className="category-card">
            <span className="category-icon">📊</span>
            <h3>Analytics & Reports</h3>
            <p>Understanding your dashboard and project metrics</p>
          </div>
          <div className="category-card">
            <span className="category-icon">🔐</span>
            <h3>Security & Privacy</h3>
            <p>Account security and data protection information</p>
          </div>
        </div>

        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-toggle ${activeIndex === index ? 'rotate' : ''}`}>
                    ▼
                  </span>
                </button>
                <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="help-contact">
          <h2>Still need help?</h2>
          <p>Can't find what you're looking for? Our support team is here to help.</p>
          <div className="contact-options">
            <a href="/contact" className="contact-btn primary">
              Contact Support
            </a>
            <a href="/documentation" className="contact-btn secondary">
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
