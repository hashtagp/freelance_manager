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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                      flex items-center justify-center">
          <span className="text-2xl font-bold text-white">PM</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Welcome to Project Manager</h2>
        <p className="text-gray-400">Please sign in to continue</p>
      </div>
    </div>
  );
}
