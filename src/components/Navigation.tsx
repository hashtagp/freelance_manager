"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import "@/styles/navigation.css";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, isAuthenticated, signOut, setShowAuthModal } = useAuth();
    const pathname = usePathname();
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: '📊' },
        { href: '/projects', label: 'Projects', icon: '📋' },
        { href: '/teams', label: 'Teams', icon: '👥' },
        { href: '/projects/new', label: 'New Project', icon: '➕' },
        { href: '/teams/new', label: 'New Team', icon: '👥➕' },
    ];

    const isActive = (path: string) => {
        return pathname === path;
    };

    const handleSignOut = () => {
        signOut();
        setIsUserMenuOpen(false);
    };

    return (
        <nav className="nav-modern">
            <div className="nav-container">
                {/* Logo */}
                <Link href="/" className="nav-logo">
                    <div className="nav-logo-icon">
                        <span>P</span>
                    </div>
                    <span className="nav-logo-text">Payteams</span>
                </Link>

                {/* Desktop Navigation - only show if authenticated */}
                {isAuthenticated && (
                    <div className="nav-menu">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item ${
                                    isActive(item.href) ? 'active' : ''
                                }`}
                            >
                                <span className="nav-item-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                )}

                {/* User Menu */}
                <div className="nav-user-menu">
                    {isAuthenticated ? (
                        <>
                            <button className="nav-notification-btn">
                                <span className="nav-item-icon">🔔</span>
                            </button>
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="nav-user-button"
                                >
                                    <div className="nav-user-avatar">
                                        {user?.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="nav-user-name">
                                        {user?.name || 'User'}
                                    </span>
                                </button>
                                
                                {/* Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="nav-dropdown">
                                        <div className="nav-dropdown-header">
                                            <p className="nav-dropdown-name">{user?.name}</p>
                                            <p className="nav-dropdown-email">{user?.email}</p>
                                        </div>
                                        <div className="nav-dropdown-content">
                                            <button
                                                onClick={handleSignOut}
                                                className="nav-signout-btn"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="nav-signin-btn"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
