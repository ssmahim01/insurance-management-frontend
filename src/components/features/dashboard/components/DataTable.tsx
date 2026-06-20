/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from './EmptyState';
import type { TableColumn } from '@/types/dashboard';

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
  actions?: (item: T) => React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  isLoading,
  onSort,
  sortKey,
  sortOrder,
  actions,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title="No data found" description="Start by creating your first entry." />;
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2">
                    {col.sortable ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-medium text-foreground hover:bg-transparent"
                        onClick={() =>
                          onSort?.(String(col.key), sortOrder === 'asc' ? 'desc' : 'asc')
                        }
                      >
                        <div className="flex items-center gap-1">
                          {col.label}
                          {sortKey === String(col.key) && (
                            sortOrder === 'asc' ? (
                              <ArrowUp className="w-4 h-4" />
                            ) : (
                              <ArrowDown className="w-4 h-4" />
                            )
                          )}
                        </div>
                      </Button>
                    ) : (
                      <span className="font-medium text-foreground">{col.label}</span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4">
                    <div className="text-sm">
                      {col.render
                        ? col.render(item[col.key], item)
                        : String(item[col.key])}
                    </div>
                  </td>
                ))}
                {actions && <td className="px-6 py-4 text-right">{actions(item)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
