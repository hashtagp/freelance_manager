'use client';

import { useEffect, useState } from 'react';
import { Project } from '../types'; // Adjust the import based on your types file structure
import { fetchProjects } from '../lib/api'; // Adjust the import based on your API utility functions

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    return { projects, loading, error };
};

export default useProjects;