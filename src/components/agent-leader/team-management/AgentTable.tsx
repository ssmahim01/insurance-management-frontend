"use client";

import React from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types/user.types";
import { AgentStatusBadge } from "./AgentStatusBadge";
import { AgentActions } from "./AgentActions";

interface AgentTableProps {
  agents: IUser[];
  isLoading: boolean;
  onViewDetails: (agentId: string) => void;
  onViewCustomers?: (agentId: string) => void;
  onEdit?: (agentId: string) => void;
  onToggleBlock: (agentId: string, isBlocked: boolean) => void;
  onDelete: (agentId: string) => void;
}

export function AgentTable({
  agents,
  isLoading,
  onViewDetails,
  // onViewCustomers,
  // onEdit,
  onToggleBlock,
  onDelete,
}: AgentTableProps) {
  // const router = useRouter();
  if (isLoading) {
    return (
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                Agent
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                Customers
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50 sticky top-0">
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="font-semibold text-foreground">
              Agent
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Contact
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Customers
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Last Login
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Joined
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow
              key={agent._id}
              className="border-b border-border hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={agent.picture} alt={agent.name} />
                    <AvatarFallback className="text-xs font-semibold">
                      {agent.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {agent.name}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <p className="text-foreground">{agent.phone}</p>
                  {agent.email && (
                    <p className="text-xs text-muted-foreground">
                      {agent.email}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-foreground">0</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {agent.lastLoginAt
                    ? format(new Date(agent.lastLoginAt), "MMM dd, yyyy")
                    : "Never"}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(agent.createdAt || ""), "MMM dd, yyyy")}
                </span>
              </TableCell>
              <TableCell>
                <AgentStatusBadge status={agent.isActive} />
              </TableCell>
              <TableCell className="text-right">
                <AgentActions
                  agentId={agent._id as string}
                  agentStatus={agent.isActive}
                  onViewDetails={() => onViewDetails(agent._id as string)}
                  // onViewCustomers={() => onViewCustomers(agent._id as string)}
                  // onEdit={() => {
                  //   router.push(`/agent-leader/my-agents/${agent._id}/edit`);
                  // }}
                  onToggleBlock={() =>
                    onToggleBlock(
                      agent._id as string,
                      agent.isActive === "BLOCKED",
                    )
                  }
                  onDelete={() => onDelete(agent._id as string)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
