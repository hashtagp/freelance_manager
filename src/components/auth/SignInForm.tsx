'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import '@/styles/auth-forms.css';
import '@/styles/signin-form.css';

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn(formData.email, formData.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form signin-form">
      <div className="auth-form-header">
        <h2 className="auth-form-title">Welcome Back</h2>
        <p className="auth-form-subtitle">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form-content">
        {error && (
          <div className="auth-form-error">
            {error}
          </div>
        )}

        <div className="auth-form-fields">
          <Input
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            disabled={isLoading}
            variant="glass"
            icon={<span className="text-lg">📧</span>}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            disabled={isLoading}
            variant="glass"
            icon={<span className="text-lg">🔒</span>}
          />
        </div>

        <div className="auth-form-actions">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading || !formData.email || !formData.password}
            className="auth-form-submit"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>

        <div className="auth-form-footer">
          <p className="auth-form-switch">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="auth-form-switch-btn"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
