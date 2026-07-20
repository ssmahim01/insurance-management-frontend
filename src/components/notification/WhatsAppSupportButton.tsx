"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "8809610500599";
const DEFAULT_MESSAGE = "Hi, I need help with my account.";

interface WhatsAppSupportButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M12.002 2C6.478 2 2 6.477 2 12c0 1.892.526 3.663 1.44 5.176L2 22l4.955-1.406A9.945 9.945 0 0 0 12.002 22C17.526 22 22 17.523 22 12S17.526 2 12.002 2Zm0 18.19a8.15 8.15 0 0 1-4.223-1.17l-.303-.18-2.938.834.842-2.86-.198-.313A8.156 8.156 0 0 1 3.81 12c0-4.517 3.673-8.19 8.192-8.19 4.517 0 8.19 3.673 8.19 8.19 0 4.518-3.673 8.19-8.19 8.19Z" />
    </svg>
  );
}

export function WhatsAppSupportButton({
  phoneNumber = WHATSAPP_NUMBER,
  message = DEFAULT_MESSAGE,
  className,
}: WhatsAppSupportButtonProps) {
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      variant="ghost"
      size="icon"
    
      className={cn(
        "h-12 w-12 hover:cursor-pointer rounded-full text-[#25D366] transition-all duration-200 ease-out",
        "hover:bg-[#25D366]/10 hover:scale-110 hover:text-[#1DA851]",
        "active:scale-95",
        className
      )}
      title="Chat with support on WhatsApp"
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp support">
        <WhatsAppIcon className="h-[30px] w-[30px]" />
      </a>
    </Button>
  );
}