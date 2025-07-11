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
                        <span>F</span>
                    </div>
                    <span className="nav-logo-text">Paymento</span>
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
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <button className="nav-item">
                                <span className="nav-item-icon">🔔</span>
                            </button>
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {user?.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-white/90 text-sm font-medium hidden sm:block">
                                        {user?.name || 'User'}
                                    </span>
                                </button>
                                
                                {/* Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50">
                                        <div className="p-3 border-b border-gray-200">
                                            <p className="font-medium text-gray-900">{user?.name}</p>
                                            <p className="text-sm text-gray-600">{user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium"
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
