'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                      flex items-center justify-center mb-4 shadow-lg">
          <span className="text-2xl">👋</span>
        </div>
        <h2 className="text-3xl font-bold text-white">
          Welcome Back
        </h2>
        <p className="text-white/70">Sign in to your account and continue your journey</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm backdrop-blur-sm animate-fade-in">
          <div className="flex items-center space-x-2">
            <span className="text-red-400">⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white/90">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-white/50">📧</span>
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 
                       focus:border-purple-400 focus:ring-purple-400/50"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-white/90">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-white/50">🔒</span>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 
                       focus:border-purple-400 focus:ring-purple-400/50"
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 
                 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg 
                 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 
                 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner size="sm" />
            <span>Signing in...</span>
          </div>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <span>Sign In</span>
            <span>🚀</span>
          </span>
        )}
      </Button>

      {/* Switch to Sign Up */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-white/70">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-purple-300 hover:text-purple-200 font-semibold transition-colors 
                     underline underline-offset-2 decoration-purple-300/50 hover:decoration-purple-200"
          >
            Create one now
          </button>
        </p>
      </div>
    </form>
  );
}
