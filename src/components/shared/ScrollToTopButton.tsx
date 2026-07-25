"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({
  showAfter = 1000,
}: {
  showAfter?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));

    const handleScroll = () => {
      setVisible(window.scrollY > showAfter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shown = mounted && visible;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        transform: shown ? "translateX(0)" : "translateX(100%)",
        opacity: shown ? 1 : 0,
        transition: "transform 700ms ease-out, opacity 700ms ease-out",
      }}
      className={`fixed bottom-5 right-0 z-50 flex h-10 w-10 items-center justify-center rounded-tl-[10px] rounded-bl-[10px] btn-bg text-white cursor-pointer ${
        shown ? "" : "pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}