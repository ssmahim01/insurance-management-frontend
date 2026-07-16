"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md rounded-xl border p-8 text-center">
        <h1 className="text-2xl font-bold">Authentication Required</h1>

        <p className="mt-3 text-muted-foreground">
          Your session has expired or is invalid. Please sign in again.
        </p>

        <Button className="mt-6">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    </div>
  );
}
