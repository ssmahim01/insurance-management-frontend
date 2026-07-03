import { ElementType } from "react";
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  children?: SidebarItem[];
}


export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ElementType;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface DashboardMetadata {
  title: string;
  description: string;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface FilterState {
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}
