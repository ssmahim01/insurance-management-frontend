"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({
  showAfter = 1000,
}: {
  /** how many pixels of scroll before the button appears */
  showAfter?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > showAfter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-5 right-0 z-50 flex h-10 w-10 items-center justify-center rounded-tl-[10px] rounded-bl-[10px] btn-bg text-white cursor-pointer ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
       <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}