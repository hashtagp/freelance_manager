import { Project, Team } from '../types';

// API base URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Get authentication headers for API requests
 */
function getAuthHeaders(): HeadersInit {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return {
      'Content-Type': 'application/json',
    };
  }

  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Fetch all projects from the API
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

/**
 * Fetch a single project by ID
 */
export async function fetchProject(id: string): Promise<Project> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
}

// API request interfaces that match backend expectations
interface CreateProjectRequest {
  name: string;
  description?: string;
}

interface UpdateProjectRequest {
  title?: string;
  description?: string;
  status?: string;
  budget?: number;
  startDate?: string;
  deadline?: string;
  clientId?: string;
}

interface CreateTeamRequest {
  name: string;
  description: string;
  skills: string[];
  status: 'active' | 'inactive';
}

interface UpdateTeamRequest {
  name?: string;
  description?: string;
}

/**
 * Create a new project
 */
export async function createProject(projectData: CreateProjectRequest): Promise<Project> {
  try {
    console.log('Creating project with data:', projectData);
    
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required. Please sign in again.');
      }
      
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // If response isn't JSON, use the default message
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error instanceof Error ? error : new Error('Failed to create project');
  }
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, projectData: UpdateProjectRequest): Promise<Project> {
  try {
    console.log('Updating project with data:', projectData);
    
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required. Please sign in again.');
      }
      
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // If response isn't JSON, use the default message
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error instanceof Error ? error : new Error('Failed to update project');
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
}

/**
 * Fetch all teams from the API
 */
export async function fetchTeams(): Promise<Team[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw new Error('Failed to fetch teams');
  }
}

/**
 * Fetch a single team by ID
 */
export async function fetchTeam(id: string): Promise<Team> {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw new Error('Failed to fetch team');
  }
}

/**
 * Create a new team
 */
export async function createTeam(teamData: CreateTeamRequest): Promise<Team> {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(teamData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw new Error('Failed to create team');
  }
}

/**
 * Update an existing team
 */
export async function updateTeam(id: string, teamData: UpdateTeamRequest): Promise<Team> {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(teamData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating team:', error);
    throw new Error('Failed to update team');
  }
}

/**
 * Delete a team
 */
export async function deleteTeam(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting team:', error);
    throw new Error('Failed to delete team');
  }
}

/**
 * Assign a team to a project
 */
export async function assignTeamToProject(projectId: string, teamId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/teams`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ teamId }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error assigning team to project:', error);
    throw new Error('Failed to assign team to project');
  }
}

/**
 * Remove a team from a project
 */
export async function removeTeamFromProject(projectId: string, teamId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/teams/${teamId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error removing team from project:', error);
    throw new Error('Failed to remove team from project');
  }
}

/**
 * Get project team member pricing
 */
export async function fetchProjectPricing(projectId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/pricing`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching project pricing:', error);
    throw new Error('Failed to fetch project pricing');
  }
}

/**
 * Save project team member pricing
 */
export async function saveProjectTeamPricing(projectId: string, teamId: string, pricingData: any[]) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/pricing`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ teamId, pricingData }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error saving project pricing:', error);
    throw new Error('Failed to save project pricing');
  }
}

/**
 * Update project team member pricing
 */
export async function updateProjectPricing(projectId: string, pricingId: string, pricingData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/pricing`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ pricingId, ...pricingData }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating project pricing:', error);
    throw new Error('Failed to update project pricing');
  }
}

/**
 * Delete project team member pricing
 */
export async function deleteProjectPricing(projectId: string, options: { pricingId?: string; teamId?: string; userId?: string }) {
  try {
    const searchParams = new URLSearchParams();
    if (options.pricingId) searchParams.append('pricingId', options.pricingId);
    if (options.teamId) searchParams.append('teamId', options.teamId);
    if (options.userId) searchParams.append('userId', options.userId);

    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/pricing?${searchParams.toString()}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting project pricing:', error);
    throw new Error('Failed to delete project pricing');
  }
}

/**
 * Get project payouts
 */
export async function fetchProjectPayouts(projectId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/payouts`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching project payouts:', error);
    throw new Error('Failed to fetch project payouts');
  }
}

/**
 * Create project payout
 */
export async function createProjectPayout(projectId: string, payoutData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/payouts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payoutData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating project payout:', error);
    throw new Error('Failed to create project payout');
  }
}

/**
 * Get single payout
 */
export async function fetchPayout(payoutId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/payouts/${payoutId}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching payout:', error);
    throw new Error('Failed to fetch payout');
  }
}

/**
 * Update payout
 */
export async function updatePayout(payoutId: string, payoutData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/payouts/${payoutId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payoutData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating payout:', error);
    throw new Error('Failed to update payout');
  }
}

/**
 * Delete payout
 */
export async function deletePayout(payoutId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/payouts/${payoutId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting payout:', error);
    throw new Error('Failed to delete payout');
  }
}

// ==========================================
// PAYIN API FUNCTIONS
// ==========================================

/**
 * Get project payins
 */
export async function fetchProjectPayins(projectId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/payins`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching project payins:', error);
    throw new Error('Failed to fetch project payins');
  }
}

/**
 * Create project payin
 */
export async function createProjectPayin(projectId: string, payinData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/payins`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payinData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating project payin:', error);
    throw new Error('Failed to create project payin');
  }
}

/**
 * Get single payin
 */
export async function fetchPayin(payinId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/payins/${payinId}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching payin:', error);
    throw new Error('Failed to fetch payin');
  }
}

/**
 * Update payin
 */
export async function updatePayin(payinId: string, payinData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/payins/${payinId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payinData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating payin:', error);
    throw new Error('Failed to update payin');
  }
}

/**
 * Delete payin
 */
export async function deletePayin(payinId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/payins/${payinId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting payin:', error);
    throw new Error('Failed to delete payin');
  }
}
