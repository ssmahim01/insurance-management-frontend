/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Shield,
  Settings,
  UserCircle,
  LogOut,
  Plus,
  List,
} from 'lucide-react';
import type { NavGroup } from '@/types/dashboard';

export const dashboardNavigation: NavGroup[] = [
  {
    label: 'Main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        id: 'partners-list',
        label: 'All Partners',
        icon: List,
        href: '/dashboard/partners',
      },
      {
        id: 'partners-create',
        label: 'Create Partner',
        icon: Plus,
        href: '/dashboard/partners/create',
      },
      {
        id: 'branches-list',
        label: 'All Branches',
        icon: List,
        href: '/dashboard/branches',
      },
      {
        id: 'branches-create',
        label: 'Create Branch',
        icon: Plus,
        href: '/dashboard/branches/create',
      },
      {
        id: 'packages-list',
        label: 'All Packages',
        icon: List,
        href: '/dashboard/packages',
      },
      {
        id: 'packages-create',
        label: 'Create Package',
        icon: Plus,
        href: '/dashboard/packages/create',
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        id: 'profile',
        label: 'Profile',
        icon: UserCircle,
        href: '/dashboard/profile',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '/dashboard/settings',
      },
    ],
  },
];

export const iconMap: Record<string, React.ComponentType<any>> = {
  'layout-dashboard': LayoutDashboard,
  users: Users,
  'git-branch': GitBranch,
  shield: Shield,
  settings: Settings,
  'user-circle': UserCircle,
  logout: LogOut,
  plus: Plus,
  list: List,
};
