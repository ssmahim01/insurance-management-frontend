'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { SidebarItem as SidebarItemType } from '@/types/dashboard';
import { iconMap } from './sidebar-config';

interface SidebarItemProps {
  item: SidebarItemType;
  isCollapsed: boolean;
  showTooltip?: (label: string, e: React.MouseEvent) => void;
  hideTooltip?: () => void;
}

export function SidebarItem({
  item,
  isCollapsed,
  showTooltip,
  hideTooltip,
}: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const IconComponent = iconMap[item.icon] || null;
  const isActive = item.href ? pathname === item.href : false;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={(e) => isCollapsed && showTooltip?.(item.label, e)}
          onMouseLeave={hideTooltip}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-primary/10 text-primary' : 'text-foreground/60 hover:bg-muted'
          } ${isCollapsed ? 'px-2' : ''}`}
        >
          {IconComponent && <IconComponent className="w-5 h-5 shrink-0" />}
          {!isCollapsed && (
            <>
              <span className="ml-3 flex-1 text-left text-sm font-medium">{item.label}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </>
          )}
        </button>

        {isOpen && !isCollapsed && (
          <div className="ml-2 mt-2 space-y-1 border-l-2 border-border pl-2">
            {item?.children?.map((child) => (
              <SidebarItem key={child.id} item={child} isCollapsed={false} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      onMouseEnter={(e) => isCollapsed && showTooltip?.(item.label, e)}
      onMouseLeave={hideTooltip}
      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground/60 hover:bg-muted'
      } ${isCollapsed ? 'justify-center px-2' : ''}`}
    >
      {IconComponent && <IconComponent className="w-5 h-5 shrink-0" />}
      {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
    </Link>
  );
}
