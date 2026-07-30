// "use client";

// import { useEffect, useRef, useState } from "react";

// interface UseInViewOptions {
//   threshold?: number;
//   triggerOnce?: boolean;
// }

// export function useInView({
//   threshold = 0.2,
//   triggerOnce = true,
// }: UseInViewOptions = {}) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);

//           if (triggerOnce) {
//             observer.disconnect();
//           }
//         } else if (!triggerOnce) {
//           setIsVisible(false);
//         }
//       },
//       { threshold }
//     );

//     observer.observe(element);

//     return () => observer.disconnect();
//   }, [threshold, triggerOnce]);

//   return { ref, isVisible };
// }

"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView({
  threshold = 0.2,
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // content stuck hidden.
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const isInViewport =
        rect.top < windowHeight * (1 - threshold) && rect.bottom > 0;

      if (isInViewport) {
        setIsVisible(true);
      }
    };

    checkInitialVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);

    const nudgeTimer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      checkInitialVisibility();
    }, 150);

    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(nudgeTimer);
      clearTimeout(safetyTimer);
    };
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
}