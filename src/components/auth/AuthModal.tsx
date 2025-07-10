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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
        onClick={() => setShowAuthModal(false)}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md animate-scale-in">
        {/* Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20" />
        
        {/* Modal Content */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-500/20 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                     flex items-center justify-center transition-all duration-200 group border border-white/20"
          >
            <span className="text-white/70 group-hover:text-white text-xl font-light">×</span>
          </button>

          {/* Content */}
          <div className="relative p-8 pt-12">
            {/* Auth forms */}
            {authMode === 'signin' ? (
              <SignInForm onSwitchToSignUp={() => setAuthMode('signup')} />
            ) : (
              <SignUpForm onSwitchToSignIn={() => setAuthMode('signin')} />
            )}
          </div>
          
          {/* Footer Decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>
      </div>
    </div>
  );
}
