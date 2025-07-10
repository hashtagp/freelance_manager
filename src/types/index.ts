export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  address?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  title: string
  description?: string
  status: ProjectStatus
  budget?: number
  startDate?: Date
  deadline?: Date
  createdAt: Date
  updatedAt: Date
  userId: string
  clientId?: string
  user: User
  client?: Client
  teamMembers: ProjectTeamMember[]
  payments: Payment[]
  deadlines: Deadline[]
}

export interface ProjectTeamMember {
  id: string
  role: string
  hourlyRate?: number
  totalAllocation?: number
  createdAt: Date
  updatedAt: Date
  projectId: string
  userId: string
  project: Project
  user: User
}

export interface Payment {
  id: string
  amount: number
  description?: string
  type: PaymentType
  status: PaymentStatus
  dueDate?: Date
  paidDate?: Date
  createdAt: Date
  updatedAt: Date
  projectId: string
  fromUserId?: string
  toUserId?: string
  project: Project
  fromUser?: User
  toUser?: User
}

export interface Deadline {
  id: string
  title: string
  description?: string
  dueDate: Date
  status: DeadlineStatus
  priority: Priority
  createdAt: Date
  updatedAt: Date
  projectId: string
  project: Project
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentType {
  CLIENT_TO_PROJECT = 'CLIENT_TO_PROJECT',
  PROJECT_TO_MEMBER = 'PROJECT_TO_MEMBER'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export enum DeadlineStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProjectFormData {
  title: string
  description?: string
  budget?: number
  startDate?: string
  deadline?: string
  clientId?: string
  teamMembers?: {
    userId: string
    role: string
    hourlyRate?: number
    totalAllocation?: number
  }[]
}

export interface ClientFormData {
  name: string
  email?: string
  phone?: string
  company?: string
  address?: string
}

export interface PaymentFormData {
  amount: number
  description?: string
  type: PaymentType
  dueDate?: string
  toUserId?: string
}

export interface DeadlineFormData {
  title: string
  description?: string
  dueDate: string
  priority: Priority
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Dashboard types
export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalRevenue: number
  pendingPayments: number
  overdueDeadlines: number
  teamMembers: number
}

export interface ProjectWithStats extends Project {
  progress: number
  totalPaid: number
  totalPending: number
  upcomingDeadlines: number
}

export interface Team {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  members: User[]
  projects: Project[]
}