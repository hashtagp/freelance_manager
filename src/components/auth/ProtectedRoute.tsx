'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, setShowAuthModal } = useAuth();
  const pathname = usePathname();

  // List of public routes that don't require authentication
  const publicRoutes = ['/', '/about', '/contact'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // If not on a public route and not authenticated, show auth modal
    if (!isPublicRoute && !isAuthenticated && !isLoading) {
      setShowAuthModal(true);
    }
  }, [isPublicRoute, isAuthenticated, isLoading, setShowAuthModal]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // For public routes, always show content
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes, only show content if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Show a placeholder while auth modal is displayed
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="relative text-center space-y-8 p-8 animate-fade-in">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 
                        flex items-center justify-center animate-pulse shadow-2xl">
            <span className="text-3xl font-bold text-white">PM</span>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 animate-pulse" />
        </div>
        
        {/* Welcome Text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to Project Manager
          </h1>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            Your modern workspace for managing projects, teams, and growing your business
          </p>
        </div>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm text-white">
            📊 Smart Analytics
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm text-white">
            👥 Team Collaboration
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm text-white">
            🚀 Modern Design
          </div>
        </div>
        
        {/* Loading Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
}
