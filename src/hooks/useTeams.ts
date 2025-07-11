'use client';

import { useEffect, useState } from 'react';
import { Team, TeamFormData } from '../types';
import { fetchTeams } from '../lib/api';

const API_BASE = '/api';

export const useTeams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadTeams = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await fetchTeams();
            setTeams(data);
        } catch (err) {
            setError('Failed to load teams');
            console.error('Error fetching teams:', err);
        } finally {
            setLoading(false);
        }
    };

    const createTeam = async (teamData: TeamFormData) => {
        setError(null);
        
        try {
            const response = await fetch(`${API_BASE}/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                throw new Error('Failed to create team');
            }

            const newTeam = await response.json();
            setTeams(prev => [...prev, newTeam]);
            return newTeam;
        } catch (err) {
            const error = err instanceof Error ? err.message : 'Failed to create team';
            setError(error);
            throw new Error(error);
        }
    };

    const updateTeam = async (id: string, teamData: Partial<Team>) => {
        setError(null);
        
        try {
            const response = await fetch(`${API_BASE}/teams/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                throw new Error('Failed to update team');
            }

            const updatedTeam = await response.json();
            setTeams(prev => prev.map(team => team.id === id ? updatedTeam : team));
            return updatedTeam;
        } catch (err) {
            const error = err instanceof Error ? err.message : 'Failed to update team';
            setError(error);
            throw new Error(error);
        }
    };

    const deleteTeam = async (id: string) => {
        setError(null);
        
        try {
            const response = await fetch(`${API_BASE}/teams/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete team');
            }

            setTeams(prev => prev.filter(team => team.id !== id));
        } catch (err) {
            const error = err instanceof Error ? err.message : 'Failed to delete team';
            setError(error);
            throw new Error(error);
        }
    };

    useEffect(() => {
        loadTeams();
    }, []);

    return {
        teams,
        loading,
        error,
        loadTeams,
        createTeam,
        updateTeam,
        deleteTeam,
    };
};

export default useTeams;
