"use client";

import { useEffect, useRef, useState } from "react";
import { HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ---- Data (swap with real content / i18n strings) -------------------------

const PRODUCTS = [
  { id: "health", label: "Surokkha Health", icon: HeartPulse },
] as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

const FAQS: Record<ProductId, { question: string; answer: string }[]> = {
  health: [
    {
      question: "Affordable Protection?",
      answer:
        "Quality healthcare shouldn’t be expensive. Our plans are designed to provide meaningful protection at an affordable cost.",
    },
    {
      question: "What isCash Support During Hospitalization?",
      answer:
        "Receive financial assistance while admitted to the hospital, helping you focus on recovery instead of expenses.",
    },
    {
      question: "Access to Trusted Healthcare?",
      answer:"Enjoy consultations with qualified doctors along with exclusive discounts at selected hospitals and pharmacies.",
    },
    {
      question: "Protection Beyond Hospitalization?",
      answer:"Our plans include benefits for accidental death, disability and selected critical illnesses—offering financial security when it matters most.",
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
    <section className="w-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-4 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0F4E8E]">
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
            className="absolute bottom-0 h-0.5 bg-[#0F4E8E] transition-all duration-300 ease-out"
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
                  "flex items-center gap-2 rounded-t-md px-4 py-4 text-sm font-medium transition-colors sm:px-6",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A5F]/40 focus-visible:ring-offset-2",
                  isActive
                    ? "text-[#0F7A5F] dark:text-emerald-400"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
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
        <Accordion className="space-y-3">
          {FAQS[active].map((faq, i) => (
            <AccordionItem
              key={`${active}-${i}`}
              value={`item-${i}`}
              className={cn(
                "overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-200",
                "hover:border-[#0F7A5F]/40 hover:bg-emerald-50/40 hover:shadow-md",
                "dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-400/30 dark:hover:bg-slate-800/60",
                "data-[state=open]:border-[#0F7A5F]/30 data-[state=open]:bg-emerald-50/40 data-[state=open]:shadow-sm",
                "dark:data-[state=open]:bg-slate-800/60"
              )}
            >
              <AccordionTrigger
                className={cn(
                  "px-5 py-4 text-left text-[15px] font-medium text-slate-800 hover:no-underline dark:text-slate-100",
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