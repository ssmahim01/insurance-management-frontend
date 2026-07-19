import { ElementType } from "react";
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  children?: SidebarItem[];
}

export interface IRevenueChartPoint {
  month: string;
  revenue: number;
  subscriptions: number;
}

export interface IStatusChartPoint {
  name: string;
  value: number;
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

export interface IRecentBranch {
  _id: string;

  name: string;

  partner: {
    _id: string;
    name: string;
    logo?: string;
  };

  phone?: string;

  email?: string;

  city?: string;

  address?: string;

  isActive: boolean;

  createdAt: Date;
}


export interface IManagerDashboardSummary {
  totalPartners: number;
  activePartners: number;
  inactivePartners: number;

  totalBranches: number;
  activeBranches: number;
  inactiveBranches: number;
}

export interface IRecentPartner {
  _id: string;

  name: string;

  logo?: string;

  email?: string;

  phone?: string;

  isActive: boolean;

  createdAt: Date;
}

export interface IManagerDashboardResponse {
  summary: IManagerDashboardSummary;

  recentPartners: IRecentPartner[];

  recentBranches: IRecentBranch[];
}

export interface IDashboardSummary {
  totalRevenue: number;
  totalSubscriptions: number;
  totalCustomers: number;
  totalPackages: number;
  totalAgents: number;
  totalAgentLeaders: number;
 color?: "emerald" | "blue" | "violet" | "amber" | "cyan" | "rose";

  activeSubscriptions: number;
  pendingSubscriptions: number;
  expiredSubscriptions: number;
  cancelledSubscriptions: number;

  paidSubscriptions: number;
  unpaidSubscriptions: number;

  averageRevenue: number;
}

export interface IDashboardPackageRevenue {
  packageId: string;
  packageName: string;
  subscriptions: number;
  totalRevenue: number;
  averageRevenue: number;
}

export interface IDashboardOverviewCard {
  subscriptions: number;
  revenue: number;
  averageRevenue: number;

  packageWiseRevenue: IDashboardPackageRevenue[];
}

export interface IDashboardOverview {
  today: IDashboardOverviewCard;
  month: IDashboardOverviewCard;
  lifetime: IDashboardOverviewCard;
}

export interface IRevenueChart {
  month: string;
  revenue: number;
  subscriptions: number;
}

export interface IStatusChart {
  name: string;
  value: number;
}

export interface IRecentSubscription {
  _id: string;

  customerName: string;
  customerPhone: string;
  customerPicture?: string;

  packageName: string;

  amount: number;

  paymentStatus: string;
  subscriptionStatus: string;

  agentName: string;
  agentRole: string;

  createdAt: string;
}

export interface IRecentCustomer {
  _id: string;

  name: string;
  phone: string;
  picture?: string;

  createdBy: string;
  createdByRole: string;

  createdAt: string;

  totalSubscriptions: number;
  totalSpent: number;
}

export interface IDashboardResponse {
  data: {
    summary: IDashboardSummary;

    overview: IDashboardOverview;

    topPackages: IDashboardPackageRevenue[];

    revenueChart: IRevenueChart[];

    subscriptionStatusChart: IStatusChart[];

    paymentStatusChart: IStatusChart[];

    recentSubscriptions: IRecentSubscription[];

    recentCustomers: IRecentCustomer[];
  };
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
  sortOrder?: "asc" | "desc";
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}
