import React from 'react';
import Link from 'next/link';
import { Project } from '../types';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Progress from './ui/Progress';
import Avatar from './ui/Avatar';

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'success';
            case 'in_progress': return 'info';
            case 'planning': return 'secondary';
            case 'review': return 'warning';
            case 'cancelled': return 'danger';
            default: return 'primary';
        }
    };

    const getProgressValue = () => {
        switch (project.status.toLowerCase()) {
            case 'completed': return 100;
            case 'in_progress': return 65;
            case 'review': return 85;
            case 'planning': return 20;
            case 'cancelled': return 0;
            default: return 0;
        }
    };

    return (
        <div className="cursor-pointer" onClick={onClick}>
            <Card hover gradient className="group">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <Link href={`/projects/${project.id}`} className="block">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                                {project.title}
                            </h3>
                        </Link>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {project.description || 'No description provided'}
                        </p>
                    </div>
                    <Badge variant={getStatusVariant(project.status)} size="sm">
                        {project.status.replace('_', ' ')}
                    </Badge>
                </div>

                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">{getProgressValue()}%</span>
                    </div>
                    <Progress value={getProgressValue()} color="primary" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Avatar 
                            src={project.user?.avatar} 
                            name={project.user?.name} 
                            size="sm" 
                        />
                        <span className="text-sm text-gray-600">{project.user?.name || 'Unknown'}</span>
                    </div>
                    <div className="text-right">
                        {project.budget && (
                            <div className="text-lg font-bold text-green-600">
                                ${project.budget.toLocaleString()}
                            </div>
                        )}
                        {project.deadline && (
                            <div className="text-xs text-gray-500">
                                Due: {new Date(project.deadline).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                </div>

                {project.teamMembers && project.teamMembers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Team</span>
                            <div className="flex -space-x-2">
                                {project.teamMembers.slice(0, 3).map((member, index) => (
                                    <Avatar 
                                        key={member.id} 
                                        src={member.user?.avatar} 
                                        name={member.user?.name} 
                                        size="sm" 
                                        className="border-2 border-white"
                                    />
                                ))}
                                {project.teamMembers.length > 3 && (
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white">
                                        <span className="text-xs font-medium text-gray-600">
                                            +{project.teamMembers.length - 3}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ProjectCard;