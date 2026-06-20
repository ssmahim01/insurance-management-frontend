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
import type { Partner } from '@/lib/schemas/partner.schema';
import type { TableColumn } from '@/types/dashboard';

interface PartnerTableProps {
  partners: Partner[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
}

export function PartnerTable({
  partners,
  isLoading,
  onDelete,
  onSort,
  sortKey,
  sortOrder,
}: PartnerTableProps) {
  const columns: TableColumn<Partner>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value: any, item: Partner) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      ),
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
      data={partners}
      isLoading={isLoading}
      onSort={onSort}
      sortKey={sortKey}
      sortOrder={sortOrder}
      actions={(item: Partner) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/dashboard/partners/${item.id}/edit`}>
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
