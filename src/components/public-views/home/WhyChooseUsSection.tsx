"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Users, MessageCircleMore, HandCoins } from "lucide-react";

interface Stat {
  id: number;
  icon: typeof Building2;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    id: 1,
    icon: Building2,
    value: 1,
    suffix: "",
    label: "A Swedish Multinational",
  },
  {
    id: 2,
    icon: Users,
    value: 1,
    suffix: " Crore+",
    label: "Customers Served in Bangladesh",
  },
  {
    id: 3,
    icon: MessageCircleMore,
    value: 16,
    suffix: " Lakh+",
    label: "Teleconsultations",
  },
  {
    id: 4,
    icon: HandCoins,
    value: 35,
    prefix: "৳",
    suffix: " Crore+",
    label: "Successfully Paid Claims",
  },
];

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, duration]);

  return count;
}

function StatCard({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, active);

  return (
    <div
      className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: active ? `${delay}ms` : "0ms" }}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00C896]/10">
        <Icon className="h-6 w-6 text-[#00E0AE]" strokeWidth={1.75} />
      </div>

      <p className="mb-1.5 text-2xl font-extrabold text-white sm:text-3xl">
        {stat.prefix}
        {count}
        {stat.suffix}
      </p>

      <p className="max-w-[160px] text-sm font-medium leading-snug text-white/70">
        {stat.label}
      </p>
    </div>
  );
}

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0B1F3A] py-16 dark:bg-[#050D1A] sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-700 ease-out sm:mb-16 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-3 text-sm font-medium text-[#00E0AE] sm:text-base">
            Shurokka: 11+ Years of delivering affordable healthcare solutions
            in Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4 sm:gap-x-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              active={visible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}