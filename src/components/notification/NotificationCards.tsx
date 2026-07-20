"use client";

import React, { useState } from "react";
import { Eye, Trash2, Check, Bell, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { INotification, NotificationType } from "@/redux/features/notification/notification.api";


const formatDate = (iso?: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
    });
};

const formatTime = (iso?: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleTimeString("en-GB", {
        hour: "2-digit", minute: "2-digit",
    });
};

const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
    [NotificationType.SUBSCRIPTION_CREATED]: "Subscription",
    [NotificationType.PAYMENT_SUCCESS]: "Payment Success",
    [NotificationType.PAYMENT_FAILED]: "Payment Failed",
    [NotificationType.SUBSCRIPTION_EXPIRING]: "Expiring Soon",
    [NotificationType.SUBSCRIPTION_EXPIRED]: "Expired",
    [NotificationType.GENERAL]: "General",
    [NotificationType.CLAIM]: "Claim",
};

const NOTIFICATION_TYPE_COLORS: Record<NotificationType, string> = {
    [NotificationType.SUBSCRIPTION_CREATED]:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    [NotificationType.PAYMENT_SUCCESS]:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
    [NotificationType.PAYMENT_FAILED]:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
    [NotificationType.SUBSCRIPTION_EXPIRING]:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
    [NotificationType.SUBSCRIPTION_EXPIRED]:
        "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    [NotificationType.GENERAL]:
        "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
    [NotificationType.CLAIM]:
        "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-700 dark:bg-blue-800 dark:text-blue-400",
};


function NotificationCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-sm p-4">
            <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/3" />
                </div>
            </div>
        </div>
    );
}

function NotificationDetailsDialog({
    notification,
    open,
    onOpenChange,
}: {
    notification: INotification | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    if (!notification) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white shrink-0">
                            <Bell className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                            <DialogTitle className="text-left truncate">{notification.title}</DialogTitle>
                            {notification.type && (
                                <Badge
                                    variant="outline"
                                    className={`text-[10px] px-1.5 py-0 mt-1 whitespace-nowrap ${NOTIFICATION_TYPE_COLORS[notification.type]}`}
                                >
                                    {NOTIFICATION_TYPE_LABELS[notification.type]}
                                </Badge>
                            )}
                        </div>
                    </div>
                </DialogHeader>

                <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                    {notification.message}
                </p>

                <div className="flex items-center gap-1 text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(notification.createdAt)} · {formatTime(notification.createdAt)}
                </div>
            </DialogContent>
        </Dialog>
    );
}


interface NotificationCardProps {
    notification: INotification;
    onViewDetails: (n: INotification) => void;
    onMarkAsRead: (n: INotification) => void;
    onDelete: (n: INotification) => void;
    isMarking?: boolean;
}

function NotificationCard({
    notification,
    onViewDetails,
    onMarkAsRead,
    onDelete,
    isMarking,
}: NotificationCardProps) {
    const isUnread = !notification.isRead;

    return (
        <div
            className={`relative bg-white dark:bg-slate-900 rounded-2xl ring-1 shadow-sm hover:shadow-md transition-all duration-200 p-4 ${isUnread
                    ? "ring-violet-200 dark:ring-violet-900/40 bg-violet-50/40 dark:bg-violet-950/10"
                    : "ring-black/5 dark:ring-white/10"
                }`}
            onClick={() => onViewDetails(notification)}
            role="button"
        >
            {isUnread && (
                <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-green-500" />
            )}

            <div className="flex items-start gap-3 pr-4">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white shrink-0">
                    <Bell className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className={`text-sm truncate ${isUnread ? "font-semibold text-slate-900 dark:text-white" : "font-medium text-slate-700 dark:text-slate-300"}`}>
                            {notification.title}
                        </p>
                        {notification.type && (
                            <Badge
                                variant="outline"
                                className={`text-[10px] px-1.5 py-0 whitespace-nowrap ${NOTIFICATION_TYPE_COLORS[notification.type]}`}
                            >
                                {NOTIFICATION_TYPE_LABELS[notification.type]}
                            </Badge>
                        )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {notification.message}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-1.5">
                        {formatDate(notification.createdAt)} · {formatTime(notification.createdAt)}
                    </p>
                </div>

                {/* Actions */}
                <div
                    className="flex items-center justify-end gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                        title="View details"
                        onClick={() => onViewDetails(notification)}
                    >
                        <Eye className="w-3.5 h-3.5" />
                    </Button>
                    {isUnread && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                            title="Mark as read"
                            disabled={isMarking}
                            onClick={() => onMarkAsRead(notification)}
                        >
                            <Check className="w-3.5 h-3.5" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        title="Delete notification"
                        onClick={() => onDelete(notification)}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

interface NotificationCardsProps {
    notifications: INotification[];
    isLoading: boolean;
    onMarkAsRead: (n: INotification) => void;
    onDelete: (n: INotification) => void;
    onViewDetails?: (n: INotification) => void;
    isMarking?: boolean;
}

export function NotificationCards({
    notifications,
    isLoading,
    onMarkAsRead,
    onDelete,
    onViewDetails,
    isMarking,
}: NotificationCardsProps) {
    const [viewingNotification, setViewingNotification] = useState<INotification | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleViewDetails = (n: INotification) => {
        if (onViewDetails) {
            onViewDetails(n);
            return;
        }
        setViewingNotification(n);
        setIsDetailsOpen(true);
        if (!n.isRead) onMarkAsRead(n);
    };

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <NotificationCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="space-y-3">
                {notifications.map((n) => (
                    <NotificationCard
                        key={n._id}
                        notification={n}
                        onViewDetails={handleViewDetails}
                        onMarkAsRead={onMarkAsRead}
                        onDelete={onDelete}
                        isMarking={isMarking}
                    />
                ))}
            </div>

            {/* Only render the built-in dialog when the caller hasn't supplied their own */}
            {!onViewDetails && (
                <NotificationDetailsDialog
                    notification={viewingNotification}
                    open={isDetailsOpen}
                    onOpenChange={setIsDetailsOpen}
                />
            )}
        </>
    );
}