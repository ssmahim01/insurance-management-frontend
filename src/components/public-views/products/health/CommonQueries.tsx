"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * "Common Queries" FAQ grid.
 * Shows the first 6 cards on load; clicking "Show More" reveals the rest
 * in one go (no extra API/route needed — everything's rendered up front,
 * just visually revealed).
 */

const faqs = [
  {
    q: "How does health insurance work?",
    a: "Health insurance is a contract where you pay a premium, and in return, the insurer covers part of all your medical expenses. This helps reduce financial stress during health emergencies.",
  },
  {
    q: "Why should I get health insurance?",
    a: "Health insurance protects you from financial burdens due to unexpected medical expenses, ensuring you can focus on recovery rather than financial stress.",
  },
  {
    q: "What does Chhaya health insurance cover?",
    a: "Chhaya covers hospital stays, outpatient care, accidental life, and disability — giving you all-round protection for your health.",
  },
  {
    q: "Is there a waiting period before coverage starts?",
    a: "Yes, there is a waiting period of 30 days from the date of purchase before you can claim benefits. Please review your policy details for full information on coverage timelines.",
  },
  {
    q: "What documents do I need to register?",
    a: "Registration is simple — just basic identification documents for yourself and your nominee, along with your contact details. No paperwork needed.",
  },
  {
    q: "How does the health insurance claim process work?",
    a: "To make a claim, you typically submit required documents to the insurer. Chhaya offers a digital claim process, allowing you to track your claim status online.",
  },
  {
    q: "How do I submit a claim?",
    a: "Simply log in to our web app, fill out the claim form, and upload required documents. The process is fully digital and paperless.",
  },
  {
    q: "How long does claim approval take?",
    a: "Most claims are reviewed and settled within a week, thanks to our efficient digital process.",
  },
  {
    q: "Can I track my claim status online?",
    a: "Absolutely! You can track your claim status in real-time through our customer web app.",
  },
  {
    q: "How does Chhaya ensure quick claim settlements?",
    a: "Chhaya's digital claim process and efficient tracking system ensure that claims are processed swiftly, minimizing delays and stress during critical times.",
  },
  {
    q: "Are pre-existing conditions covered?",
    a: "No, right now pre-existing conditions are not covered by the health packages.",
  },
  {
    q: "How affordable are Chhaya's plans?",
    a: "Our micro insurance plans are designed to be budget-friendly, making quality health protection accessible for everyone. Plans start from as low as 49 BDT per month, making them an excellent option for those seeking affordable coverage.",
  },
  {
    q: "Can I cancel my health insurance policy anytime?",
    a: "You can cancel your policy at any time using the Chhaya web app. Please note that if you cancel and later decide to re-enroll, your waiting period will restart. Additionally, any conditions diagnosed or treated during your initial policy period will be considered pre-existing in future policies.",
  },
  {
    q: "Can I change my coverage after purchasing a policy?",
    a: "While existing policies cannot be modified, you have the flexibility to purchase additional policies from Chhaya if your needs change. This allows you to tailor your coverage to suit evolving requirements.",
  },
  {
    q: "What makes Chhaya different from other insurance providers?",
    a: "Chhaya offers unique affordable micro-insurance plans with quick registration and easy digital claim submission, making quality health protection accessible and hassle-free.",
  },
  {
    q: "Do I need to declare my health status to purchase Chhaya's health insurance?",
    a: "You do not need to make a health declaration to purchase health insurance. Our process is designed to be straightforward and accessible.",
  },
  {
    q: "Is a medical test required to buy Chhaya's health insurance?",
    a: "No, a medical test is not mandatory to purchase Chhaya's health insurance. We aim to keep the enrollment process simple and hassle-free.",
  },
  {
    q: "How do payments work for Chhaya's health insurance?",
    a: "Stay covered with ease! Chhaya offers automated recurring payments, ensuring your coverage remains active without interruption, so you can focus on your well-being.",
  },
];

const INITIAL_COUNT = 6;

export default function CommonQueries() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? faqs : faqs.slice(0, INITIAL_COUNT);

  return (
    <section className="bg-white py-20 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] dark:text-white sm:text-3xl">
          Common Queries
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] dark:text-slate-400 sm:text-base">
          Here are a few common queries to clear up about your health
          insurance plan.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3 ">
          {visible.map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-800/40 transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 "
            >
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {item.q}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#6B7280] dark:text-slate-400">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {!showAll && faqs.length > INITIAL_COUNT && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 px-6 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-400/30 dark:text-emerald-400 dark:hover:bg-emerald-400/10"
          >
            Show More
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}