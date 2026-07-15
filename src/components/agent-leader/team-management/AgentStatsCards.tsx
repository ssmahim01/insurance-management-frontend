'use client';

import React from 'react';
import { Users, UserCheck, UserX, Ban } from 'lucide-react';
import { IStats } from '@/types/user.types';

interface AgentStatsCardsProps {
  stats: IStats | undefined;
  isLoading: boolean;
}

export function AgentStatsCards({ stats, isLoading }: AgentStatsCardsProps) {
  const statCards = [
    {
      title: 'Total Agents',
      value: stats?.total ?? 0,
      icon: Users,
      subtitle: 'Registered under you',
      color: 'from-blue-950 to-blue-900',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Active Agents',
      value: stats?.active ?? 0,
      icon: UserCheck,
      subtitle: 'Currently working',
      color: 'from-emerald-950 to-emerald-900',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
    },
    {
      title: 'Inactive Agents',
      value: stats?.inactive ?? 0,
      icon: UserX,
      subtitle: 'Currently inactive',
      color: 'from-slate-950 to-slate-900',
      iconColor: 'text-slate-400',
      borderColor: 'border-slate-200 dark:border-slate-800',
    },
    {
      title: 'Blocked Agents',
      value: stats?.blocked ?? 0,
      icon: Ban,
      subtitle: 'Restricted accounts',
      color: 'from-red-950 to-red-900',
      iconColor: 'text-red-400',
      borderColor: 'border-red-200 dark:border-red-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`
              rounded-xl border ${card.borderColor} bg-linear-to-br ${card.color}
              p-6 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-105
              ${isLoading ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{card.title}</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-white rounded animate-pulse" />
                  ) : (
                    card.value
                  )}
                </p>
                <p className="text-xs text-white mt-1">{card.subtitle}</p>
              </div>
              <Icon className={`${card.iconColor} w-8 h-8 mt-1`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
