'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setShowAuthModal(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 animate-scale-in">
        <div className="glass-card p-8 rounded-2xl border border-white/20 shadow-2xl">
          {/* Close button */}
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 
                     flex items-center justify-center transition-colors group"
          >
            <span className="text-gray-400 group-hover:text-white text-xl">×</span>
          </button>

          {/* Auth forms */}
          {authMode === 'signin' ? (
            <SignInForm onSwitchToSignUp={() => setAuthMode('signup')} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => setAuthMode('signin')} />
          )}
        </div>
      </div>
    </div>
  );
}
