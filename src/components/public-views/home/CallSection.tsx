import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/sideConfig";
import { PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CallSection() {
  return (
    <div>
      <div className="overflow-hidden background-second py-12 px-6 dark:bg-[#0A2E24] sm:py-10 sm:px-10">
        <div className="block sm:flex items-center justify-center gap-20 space-y-4 sm:space-y-0 text-center ">
          <div className="flex items-center gap-4">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 sm:flex">
              <PhoneCall className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white sm:text-xl">
                Get a callback to understand more
              </p>
              <p className="mt-1 text-sm text-white/60">
                Our advisors will reach out within 30 minutes
              </p>
            </div>
          </div>

          <Button className="shrink-0 rounded-full btn-bg px-8 py-6 text-sm font-semibold text-white">
            <Link
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Call
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
