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
import type { InsurancePackage } from '@/lib/schemas/package.schema';
import type { TableColumn } from '@/types/dashboard';

interface PackageTableProps {
  packages: InsurancePackage[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
}

export function PackageTable({
  packages,
  isLoading,
  onDelete,
  onSort,
  sortKey,
  sortOrder,
}: PackageTableProps) {
  const columns: TableColumn<InsurancePackage>[] = [
    {
      key: 'name',
      label: 'Package Name',
      sortable: true,
      render: (value: any, item: InsurancePackage) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
        </div>
      ),
    },
    {
      key: 'coverageAmount',
      label: 'Coverage',
      sortable: true,
      render: (value: any) => `₹${(value / 100000).toFixed(1)}L`,
    },
    {
      key: 'plans',
      label: 'Plans',
      render: (value: any) => `${value?.length || 0} plans`,
    },
    {
      key: 'benefits',
      label: 'Benefits',
      render: (value: any) => `${value?.length || 0} benefits`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: any) => <StatusBadge status={value} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={packages}
      isLoading={isLoading}
      onSort={onSort}
      sortKey={sortKey}
      sortOrder={sortOrder}
      actions={(item: InsurancePackage) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/dashboard/packages/${item.id}/edit`}>
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
