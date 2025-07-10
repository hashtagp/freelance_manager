import React from 'react';
import { Team } from '../types';

interface TeamCardProps {
    team: Team;
    onClick?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClick }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200" onClick={onClick}>
            <h2 className="text-xl font-semibold">{team.name}</h2>
            <p className="text-gray-600 mb-2">{team.description || 'No description'}</p>
            <h3 className="text-md text-gray-600">Members:</h3>
            <ul className="list-disc list-inside">
                {team.members && team.members.length > 0 ? (
                    team.members.map((member, index) => (
                        <li key={index} className="text-gray-800">{member.name}</li>
                    ))
                ) : (
                    <li className="text-gray-500">No members</li>
                )}
            </ul>
        </div>
    );
};

export default TeamCard;