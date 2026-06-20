'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { dashboardNavigation } from './sidebar-config';
import { TooltipProvider } from '@/components/ui/tooltip';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({ isCollapsed, onToggle }: DashboardSidebarProps) {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleShowTooltip = (label: string, e: React.MouseEvent) => {
    if (isCollapsed) {
      setTooltipContent(label);
      setTooltipOpen(true);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTooltipPos({ x: rect.right + 8, y: rect.top });
    }
  };

  const handleHideTooltip = () => {
    setTooltipOpen(false);
  };

  return (
    <TooltipProvider>
      <aside
        className={`fixed left-0 top-0 h-screen bg-background border-r border-border transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">SH</span>
              </div>
              <span className="font-bold text-sm text-foreground">Shurokkha</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-2 space-y-8">
          {dashboardNavigation.map((group) => (
            <div key={group.label}>
              {!isCollapsed && (
                <h3 className="px-4 py-2 text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                  {group.label}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    isCollapsed={isCollapsed}
                    showTooltip={handleShowTooltip}
                    hideTooltip={handleHideTooltip}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Tooltip */}
        {isCollapsed && tooltipOpen && (
          <div
            className="fixed bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium z-50 whitespace-nowrap pointer-events-none"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
            }}
          >
            {tooltipContent}
            <div
              className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent"
              style={{
                borderRightColor: 'rgb(15, 23, 42)',
              }}
            />
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
