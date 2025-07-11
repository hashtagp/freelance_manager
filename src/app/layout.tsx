import React from 'react';
import './globals.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export const metadata = {
  title: 'Freelance Project Manager',
  description: 'A modern project management solution for freelancers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <AuthProvider>
          <div className="min-h-screen">
            <Navigation />
            <main className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-red-400/10 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.3)_1px,_transparent_0)] bg-[size:20px_20px] pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
                <ProtectedRoute>
                  {children}
                </ProtectedRoute>
              </div>
            </main>
            <Footer />
          </div>
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}