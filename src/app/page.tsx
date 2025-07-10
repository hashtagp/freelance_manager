'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated, setShowAuthModal } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 gradient-text animate-fadeIn">
            Freelance Project Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Streamline your freelance business with our modern, intuitive project management solution. 
            Track projects, manage teams, and grow your business with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Go to Dashboard 🚀
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Projects
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => setShowAuthModal(true)}
                >
                  Get Started 🚀
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover gradient className="text-center animate-fadeIn">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Smart Dashboard</h3>
              <p className="text-gray-600">
                Get a comprehensive overview of all your projects, deadlines, and team performance in one place.
              </p>
            </Card>
            <Card hover gradient className="text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Seamlessly collaborate with your team members, track their progress, and manage roles efficiently.
              </p>
            </Card>
            <Card hover gradient className="text-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3">Growth Analytics</h3>
              <p className="text-gray-600">
                Monitor your business growth with detailed analytics and insights to make data-driven decisions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Freelance Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful freelancers who trust our platform to manage their projects and grow their business.
          </p>
          <Link href="/dashboard">
            <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}