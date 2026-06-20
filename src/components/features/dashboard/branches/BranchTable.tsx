/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import type { Branch } from '@/lib/schemas/branch.schema';
import type { TableColumn } from '@/types/dashboard';

interface BranchTableProps {
  branches: Branch[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
}

export function BranchTable({
  branches,
  isLoading,
  onDelete,
  onSort,
  sortKey,
  sortOrder,
}: BranchTableProps) {
  const columns: TableColumn<Branch>[] = [
    {
      key: 'name',
      label: 'Branch Name',
      sortable: true,
      render: (value: any, item: Branch) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      ),
    },
    {
      key: 'city',
      label: 'City',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: any) => <StatusBadge status={value} />,
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value: any) =>
        value ? new Date(value).toLocaleDateString() : '-',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={branches}
      isLoading={isLoading}
      onSort={onSort}
      sortKey={sortKey}
      sortOrder={sortOrder}
      actions={(item: Branch) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/dashboard/branches/${item.id}/edit`}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(item.id!)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
}
