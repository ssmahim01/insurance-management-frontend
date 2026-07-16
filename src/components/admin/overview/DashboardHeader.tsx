"use client";

import { CalendarDays, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onRefresh: () => void;
}

export function DashboardHeader({
  onRefresh,
}: DashboardHeaderProps) {
  
 const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 5) return "Good Night";
  if (hour < 12) return "Good Morning";
  if (hour < 14) return "Good Noon";
  if (hour < 18) return "Good Afternoon";
  if (hour < 21) return "Good Evening";

  return "Good Night";
};

const greeting = getGreeting();

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="relative overflow-hidden">

      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.18),transparent_35%)]" /> */}

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between p-3">

        <div className="space-y-3">

         

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {greeting} 👋
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-700 dark:text-gray-100">
              Welcome back. Here&apos;s a complete overview of your
              insurance business, revenue, subscriptions,
              customers, and agent performance.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-100">
            <CalendarDays className="h-4 w-4" />
            {today}
          </div>

        </div>

        <Button
          variant="default"
          onClick={onRefresh}
          className="group hover:cursor-pointer border-indigo-600 text-white bg-indigo-700 hover:bg-indigo-800 hover:shadow-xl hover:text-white duration-500 dark:text-white mt-2 cursor-pointer font-bold tracking-widest uppercase transition-colors disabled:opacity-60 hover:scale-105 ease-in-out">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Dashboard
        </Button>

      </div>
    </div>
  );
}