'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import '@/styles/auth-modal.css';

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Close modal when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setShowAuthModal(false);
    }
  }, [isAuthenticated, setShowAuthModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAuthModal(false);
      }
    };

    if (showAuthModal) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showAuthModal, setShowAuthModal]);

  if (!showAuthModal) return null;

  return (
    <div className="auth-modal-overlay">
      {/* Enhanced Backdrop */}
      <div 
        className="auth-modal-backdrop"
        onClick={() => setShowAuthModal(false)}
      />
      
      {/* Modal Container */}
      <div className="auth-modal-container">
        {/* Background Glow */}
        <div className="auth-modal-glow" />
        
        {/* Modal Content */}
        <div className="auth-modal-content">
          {/* Header Gradient */}
          <div className="auth-modal-header-gradient" />
          
          {/* Close Button */}
          <button
            onClick={() => setShowAuthModal(false)}
            className="auth-modal-close"
          >
            <span className="auth-modal-close-icon">×</span>
          </button>

          {/* Content */}
          <div className="auth-modal-body">
            {/* Auth forms */}
            {authMode === 'signin' ? (
              <SignInForm onSwitchToSignUp={() => setAuthMode('signup')} />
            ) : (
              <SignUpForm onSwitchToSignIn={() => setAuthMode('signin')} />
            )}
          </div>
          
          {/* Footer Decoration */}
          <div className="auth-modal-footer-decoration" />
        </div>
      </div>
    </div>
  );
}
