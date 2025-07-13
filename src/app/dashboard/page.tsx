import React from 'react';
import DashboardNew from '@/components/DashboardNew';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const DashboardPage = () => {
    return (
        <ProtectedRoute>
            <div className="page-container">
                <DashboardNew />
            </div>
        </ProtectedRoute>
    );
};

export default DashboardPage;
