"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({
  phoneNumber = "01350775021",
  message = "Hi! I'd like to know more.",
}: {
  /** WhatsApp number with country code, no + or spaces, e.g. "8801722947932" */
  phoneNumber?: string;
  message?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-18 right-1 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg cursor-pointer transition-transform duration-200 hover:scale-110 ${
        hovered ? "scale-110" : "scale-100"
      }`}
    >
      <FaWhatsapp className="h-5 w-6" strokeWidth={2} fill="white" />
    </button>
  );
}