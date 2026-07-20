/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import {
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
  useSoftDeleteNotificationMutation,
  INotification,
  NotificationType,
} from "@/redux/features/notification/notification.api";

import { NotificationCards } from "./NotificationCards";
import { NotificationDetailsModal } from "./NotificationDetailsModal";

const POLL_INTERVAL_MS = 30_000;
const PREVIEW_LIMIT = 7;

function getNotificationHref(n: INotification, role?: string): string | null {
  const anyN = n as any;
  const refId: string | undefined =
    anyN.referenceId ?? anyN.metadata?.referenceId ?? anyN.entityId;

  const base =
    role === "ADMIN" || role === "SUPER_ADMIN"
      ? "/admin/dashboard"
      : role === "AGENT_LEADER"
        ? "/agent-leader/dashboard"
        : role === "AGENT"
          ? "/agent/dashboard"
          : role === "MANAGER"
            ? "/manager/dashboard"
            : "/customer/dashboard";

  switch (n.type) {
    case NotificationType.CLAIM:
      return refId ? `${base}/claims/${refId}` : `${base}/claims`;
    case NotificationType.SUBSCRIPTION_CREATED:
    case NotificationType.SUBSCRIPTION_EXPIRING:
    case NotificationType.SUBSCRIPTION_EXPIRED:
      return refId ? `${base}/subscriptions/${refId}` : `${base}/subscriptions`;
    case NotificationType.PAYMENT_SUCCESS:
    case NotificationType.PAYMENT_FAILED:
      return refId ? `${base}/payments/${refId}` : `${base}/payments`;
    default:
      return null;
  }
}

interface NotificationBellProps {
  role?: string;
  viewAllHref?: string;
}

export function NotificationBell({
  role,
  viewAllHref = "/customer/dashboard/notifications",
}: NotificationBellProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [viewingNotification, setViewingNotification] =
    useState<INotification | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [justArrived, setJustArrived] = useState(false);
  const prevUnreadRef = useRef<number | null>(null);

  const { data, isFetching } = useGetMyNotificationsQuery(
    { page: 1, limit: PREVIEW_LIMIT },
    {
      pollingInterval: POLL_INTERVAL_MS,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  const [markAsRead, { isLoading: isMarking }] = useMarkAsReadMutation();
  const [softDeleteNotification] = useSoftDeleteNotificationMutation();

  const notifications: INotification[] = data?.data ?? [];
  const unreadCount = data?.stats?.unread ?? 0;

  // Brief "new notification" pulse whenever the unread count ticks up.
  useEffect(() => {
    if (prevUnreadRef.current !== null && unreadCount > prevUnreadRef.current) {
      setJustArrived(true);
      const t = setTimeout(() => setJustArrived(false), 2500);
      return () => clearTimeout(t);
    }
    prevUnreadRef.current = unreadCount;
  }, [unreadCount]);

  const handleMarkAsRead = async (n: INotification) => {
    if (n.isRead) return;
    try {
      await markAsRead(n._id).unwrap();
    } catch {
      // Fail silently in the compact preview — the full page surfaces errors.
    }
  };

  const handleDelete = async (n: INotification) => {
    try {
      await softDeleteNotification(n._id).unwrap();
    } catch {
      // Fail silently in the compact preview.
    }
  };

  const handleViewDetails = (n: INotification) => {
    setViewingNotification(n);
    setIsDetailsOpen(true);
    setOpen(false);
    if (!n.isRead) handleMarkAsRead(n);

    const href = getNotificationHref(n, role);
    if (href) router.push(href);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:cursor-pointer h-12 w-12 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell className="h-[30px] w-[30px]" />
            {unreadCount > 0 && (
              <span
                className={cn(
                  "absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white ring-2 ring-white dark:ring-gray-900",
                  justArrived && "animate-bounce",
                )}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            {justArrived && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-400 opacity-75 animate-ping" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={10}
          className="w-[360px] p-0 rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Notifications
            </p>
            <div className="flex items-center gap-2">
              {isFetching && (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-400" />
              )}
              {unreadCount > 0 && (
                <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>

          <ScrollArea className="max-h-[420px]">
            <div className="p-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <Bell className="w-8 h-8 mb-2 opacity-30" />
                  <p className="text-sm">You&apos;re all caught up.</p>
                </div>
              ) : (
                <NotificationCards
                  notifications={notifications}
                  isLoading={false}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                  onViewDetails={handleViewDetails}
                  isMarking={isMarking}
                />
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-gray-100 dark:border-gray-800 p-2">
            <Button
              variant="ghost"
              className="w-full hover:cursor-pointer justify-center text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
              onClick={() => {
                setOpen(false);
                router.push(viewAllHref);
              }}
            >
              View All Notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {viewingNotification && (
        <NotificationDetailsModal
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          item={viewingNotification}
        />
      )}
    </>
  );
}
