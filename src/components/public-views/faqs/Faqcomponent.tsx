"use client";

import { useEffect, useRef, useState } from "react";
import { HeartPulse, Shield, Sparkles, Stethoscope, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ---- Data (swap with real content / i18n strings) -------------------------

const PRODUCTS = [
  { id: "health", label: "Milvik Health", icon: HeartPulse },
  { id: "life", label: "Milvik Life", icon: Shield },
  { id: "wellness", label: "Milvik Wellness", icon: Sparkles },
  { id: "doctor", label: "My Doctor", icon: Stethoscope },
] as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

const FAQS: Record<ProductId, { question: string; answer: string }[]> = {
  health: [
    {
      question: "What are the services offered by MILVIK?",
      answer:
        "MILVIK offers a range of digital health and insurance services including Milvik Health, Milvik Life, Milvik Wellness, and My Doctor — designed to make coverage and care accessible from your phone.",
    },
    {
      question: "What is Milvik Health Service?",
      answer:
        "Milvik Health is a micro health insurance product that covers hospitalization and related medical expenses, built for affordability and quick claims.",
    },
    {
      question: "What are the mHealth services offered by MILVIK?",
      answer:
        "Our mHealth services include teleconsultations, health tips via SMS, and access to a network of doctors — all reachable directly from your mobile device.",
    },
  ],
  life: [
    {
      question: "What are the services offered by MILVIK?",
      answer:
        "MILVIK offers Milvik Health, Milvik Life, Milvik Wellness, and My Doctor as part of its digital insurance suite.",
    },
    {
      question: "What is Milvik Life Service?",
      answer:
        "Milvik Life provides affordable life insurance coverage with simple enrollment and mobile-based premium payments.",
    },
  ],
  wellness: [
    {
      question: "What is Milvik Wellness?",
      answer:
        "Milvik Wellness focuses on preventive care, offering health check-up reminders, wellness tips, and discounted diagnostics.",
    },
  ],
  doctor: [
    {
      question: "What is My Doctor?",
      answer:
        "My Doctor connects you with licensed physicians for teleconsultations anytime, anywhere.",
    },
  ],
};

// ---- Component --------------------------------------------------------

export default function FaqComponent() {
  const [active, setActive] = useState<ProductId>("health");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  return (
    <section className="w-full bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-4 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F4801F]">
          Support
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Pick a product to see answers specific to it.
        </p>
      </div>

      {/* Product tabs */}
      <div className="mx-auto max-w-3xl px-4">
        <div className="relative flex flex-wrap justify-center gap-1 border-b border-slate-200 dark:border-slate-800">
          {/* sliding indicator */}
          <span
            className="absolute bottom-0 h-[2px] bg-[#F4801F] transition-all duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
          {PRODUCTS.map((product) => {
            const isActive = product.id === active;
            const Icon = product.icon;
            return (
              <button
                key={product.id}
                ref={(el) => {
                  tabRefs.current[product.id] = el;
                }}
                type="button"
                onClick={() => setActive(product.id)}
                aria-pressed={isActive}
                className={cn(
                  "flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors sm:px-6",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A5F]/40 focus-visible:ring-offset-2 rounded-t-md",
                  isActive
                    ? "text-[#0F7A5F] dark:text-emerald-400"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {product.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Accordion  className="space-y-3">
          {FAQS[active].map((faq, i) => (
            <AccordionItem
              key={`${active}-${i}`}
              value={`item-${i}`}
              className={cn(
                "overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow",
                "dark:border-slate-800 dark:bg-slate-900",
                "data-[state=open]:border-[#0F7A5F]/30 data-[state=open]:shadow-sm"
              )}
            >
              <AccordionTrigger
                className={cn(
                  "px-5 py-4 text-left text-[15px] font-medium text-slate-800 hover:no-underline dark:text-slate-100",
                  "[&>svg]:hidden"
                )}
              >
                <span className="flex w-full items-center justify-between gap-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}