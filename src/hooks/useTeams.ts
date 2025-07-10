'use client';

import { useEffect, useState } from 'react';
import { Team } from '../types';
import { fetchTeams } from '../lib/api';

export const useTeams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const data = await fetchTeams();
                setTeams(data);
            } catch (err) {
                setError('Failed to load teams');
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, []);

    return { teams, loading, error };
};

export default useTeams;
