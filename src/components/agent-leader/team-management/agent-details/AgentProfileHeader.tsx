"use client";

import { format } from "date-fns";
import { ArrowLeft, Mail, Phone, Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.types";
import { AgentStatusBadge } from "../AgentStatusBadge";
import { AgentRoleBadge } from "./AgentRoleBadge";

interface AgentProfileHeaderProps {
  agent: IUser;
  onBack: () => void;
}

export function AgentProfileHeader({ agent, onBack }: AgentProfileHeaderProps) {
  return (
    <div className="rounded-xl border border-border p-6 sm:p-8 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarImage src={agent.picture} alt={agent.name} />
            <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
              {agent.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">{agent.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <AgentRoleBadge role={agent.role} />
                <AgentStatusBadge status={agent.isActive ?? undefined} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                {agent.phone}
              </span>
              {agent.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {agent.email}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Joined{" "}
                {agent.createdAt ? format(new Date(agent.createdAt), "MMM dd, yyyy") : "—"}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Last login{" "}
                {agent.lastLoginAt
                  ? format(new Date(agent.lastLoginAt), "MMM dd, yyyy 'at' hh:mm a")
                  : "Never"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2 flex-1 sm:flex-none transition-all duration-300 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {/* <Button
            onClick={onEdit}
            className="gap-2 flex-1 sm:flex-none transition-all duration-300 hover:shadow-md"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button> */}
        </div>
      </div>
    </div>
  );
}