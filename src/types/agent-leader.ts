import { IUser, IsActive } from '@/types/user.types';

export interface IAgent extends IUser {
  totalCustomers?: number;
  agentLeaderName?: string;
}

export interface IAgentStatsCard {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  variant: 'default' | 'success' | 'warning' | 'destructive';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export interface IAgentFilters {
  searchTerm?: string;
  status?: IsActive | 'all';
  sortBy?: 'newest' | 'oldest' | 'name-asc' | 'name-desc';
  startDate?: string;
  endDate?: string;
}

export interface IAgentTableRow {
  agent: IAgent;
  onViewDetails: (agentId: string) => void;
  onViewCustomers: (agentId: string) => void;
  onEdit: (agentId: string) => void;
  onBlock: (agentId: string, isBlocked: boolean) => void;
  onDelete: (agentId: string) => void;
}

export interface IMyAgentsPageState {
  filters: IAgentFilters;
  page: number;
  limit: number;
}

export interface IDeleteAgentDialogProps {
  isOpen: boolean;
  agentId: string;
  agentName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}
