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
        icon: 'layout-dashboard',
        href: '/dashboard',
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        id: 'partners',
        label: 'Partners',
        icon: 'users',
        children: [
          {
            id: 'partners-list',
            label: 'All Partners',
            icon: 'list',
            href: '/dashboard/partners',
          },
          {
            id: 'partners-create',
            label: 'Create Partner',
            icon: 'plus',
            href: '/dashboard/partners/create',
          },
        ],
      },
      {
        id: 'branches',
        label: 'Branches',
        icon: 'git-branch',
        children: [
          {
            id: 'branches-list',
            label: 'All Branches',
            icon: 'list',
            href: '/dashboard/branches',
          },
          {
            id: 'branches-create',
            label: 'Create Branch',
            icon: 'plus',
            href: '/dashboard/branches/create',
          },
        ],
      },
      {
        id: 'packages',
        label: 'Insurance Packages',
        icon: 'shield',
        children: [
          {
            id: 'packages-list',
            label: 'All Packages',
            icon: 'list',
            href: '/dashboard/packages',
          },
          {
            id: 'packages-create',
            label: 'Create Package',
            icon: 'plus',
            href: '/dashboard/packages/create',
          },
        ],
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        id: 'profile',
        label: 'Profile',
        icon: 'user-circle',
        href: '/dashboard/profile',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
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
