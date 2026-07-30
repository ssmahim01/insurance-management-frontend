"use client";

import { useState } from "react";
import { useInView } from "@/components/shared/useInView";
import {
  ShieldCheck,
  Stethoscope,
  Pill,
  Hospital,
  ClipboardList,
  Baby,
  HeartPulse,
  Accessibility,
  HandCoins,
  FileText,
  SearchCheck,
  Scale,
  RefreshCcw,
  Gavel,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";

interface TermSection {
  id: number;
  number: string;
  icon: LucideIcon;
  title: string;
  points: string[];
}

const sections: TermSection[] = [
  {
    id: 1,
    number: "01",
    icon: ShieldCheck,
    title: "Membership Eligibility",
    points: [
      "Membership is available only to eligible individuals under the selected health protection plan.",
      "Benefits are available only after successful membership activation.",
      "Coverage, limits, and eligibility vary depending on the selected product.",
    ],
  },
  {
    id: 2,
    number: "02",
    icon: Stethoscope,
    title: "Doctor Consultation",
    points: [
      "Members may access doctor consultation services according to their selected plan.",
      "Consultation availability, timing, and service channels are subject to operational availability.",
    ],
  },
  {
    id: 3,
    number: "03",
    icon: Pill,
    title: "Pharmacy Discount",
    points: [
      "Members are eligible to receive discounts at participating partner pharmacies.",
      "Discount rates may vary by pharmacy, medicine category, and partner agreements.",
    ],
  },
  {
    id: 4,
    number: "04",
    icon: Hospital,
    title: "Partner Hospital & Diagnostic Discounts",
    points: [
      "Discounts are available only at authorised partner hospitals and diagnostic centres.",
      "The applicable discount depends on the selected partner and available services.",
    ],
  },
  {
    id: 5,
    number: "05",
    icon: ClipboardList,
    title: "Hospitalization Coverage",
    points: [
      "Hospitalization benefits are provided on a reimbursement basis only.",
      "Members must submit all required claim documents after hospital discharge.",
      "Reimbursement is subject to the benefit limit of the selected product.",
      "Claim approval depends on successful verification and compliance with the applicable product terms.",
    ],
  },
  {
    id: 6,
    number: "06",
    icon: FileText,
    title: "Outpatient (OPD) Coverage",
    points: [
      "Eligible outpatient expenses may include doctor consultation fees, prescribed medicines, and diagnostic tests.",
      "Members must submit valid prescriptions, invoices, receipts, and supporting documents.",
      "Reimbursement is subject to the selected product's benefit limit and successful claim verification.",
    ],
  },
  {
    id: 7,
    number: "07",
    icon: Baby,
    title: "Pregnancy Coverage",
    points: [
      "Pregnancy-related hospitalization benefits are available according to the selected product.",
      "Reimbursement is available only for eligible hospitalization expenses.",
      "Benefit limits depend on the selected membership plan.",
    ],
  },
  {
    id: 8,
    number: "08",
    icon: HeartPulse,
    title: "Critical Illness Coverage",
    points: [
      "Coverage applies only to the critical illnesses specified under the selected product.",
      "Claims are subject to medical verification and submission of all required supporting documents.",
      "Benefits are paid according to the applicable coverage limit.",
    ],
  },
  {
    id: 9,
    number: "09",
    icon: Accessibility,
    title: "Partial & Permanent Disability Coverage",
    points: [
      "Benefits may be available for eligible cases of partial or permanent disability, subject to the selected product.",
      "Medical evidence and supporting documents are required.",
      "Claim approval is subject to verification and applicable product terms.",
    ],
  },
  {
    id: 10,
    number: "10",
    icon: HandCoins,
    title: "Natural Death & Accidental Death Benefits",
    points: [
      "Death benefits are available according to the selected membership plan.",
      "The nominee or legal claimant must submit all required documents.",
      "Claims are processed after successful verification.",
    ],
  },
  {
    id: 11,
    number: "11",
    icon: FileText,
    title: "Claim Submission",
    points: [
      "Completed claim form (if applicable)",
      "Valid medical documents",
      "Hospital discharge summary (where applicable)",
      "Original bills and payment receipts",
      "Diagnostic reports",
      "Prescriptions",
      "Any additional documents requested during claim assessment",
    ],
  },
  {
    id: 12,
    number: "12",
    icon: SearchCheck,
    title: "Claim Assessment",
    points: [
      "Every claim is reviewed individually.",
      "Submission of a claim does not automatically guarantee approval.",
      "Additional information may be requested where necessary.",
    ],
  },
  {
    id: 13,
    number: "13",
    icon: Scale,
    title: "Benefit Limits",
    points: [
      "Every benefit is subject to the coverage limit of the selected product.",
      "Benefits cannot exceed the maximum limit stated in the membership plan.",
    ],
  },
  {
    id: 14,
    number: "14",
    icon: ShieldCheck,
    title: "General Exclusions",
    points: [
      "False, misleading, or fraudulent information is submitted.",
      "Required documents are incomplete or invalid.",
      "The claim does not meet the applicable product conditions.",
    ],
  },
  {
    id: 15,
    number: "15",
    icon: RefreshCcw,
    title: "Changes to Product Benefits",
    points: [
      "Surokkha Health reserves the right to update, modify, or discontinue product features, benefits, or partner networks where necessary.",
      "Such changes will not affect benefits that have already accrued unless permitted by applicable law or the relevant agreement.",
    ],
  },
  {
    id: 16,
    number: "16",
    icon: Gavel,
    title: "Final Decision",
    points: [
      "All claims, benefit approvals, and reimbursements shall be processed according to the applicable product terms, internal verification procedures, and the final decision of Surokkha Health.",
    ],
  },
];

const INITIAL_COUNT = 6;

function TermCard({ section, index }: { section: TermSection; index: number }) {
  const { ref, isVisible: visible } = useInView({ threshold: 0.1 });
  const Icon = section.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${(index % 6) * 80}ms` : "0ms" }}
      className={`group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-neutral-900 sm:p-7 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="relative mb-4 flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00A67E]/10 text-[#007A55] dark:bg-[#00E0AE]/10 dark:text-[#00E0AE]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white">
          {section.title}
        </h3>
      </div>

      <ul className="relative space-y-2.5">
        {section.points.map((point, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-[14.5px] leading-relaxed text-gray-600 dark:text-gray-400"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C896]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductTermsAndCondition() {
  const { ref: headerRef, isVisible: headerVisible } = useInView({
    threshold: 0.2,
  });
  const [expanded, setExpanded] = useState(false);

  const visibleSections = expanded
    ? sections
    : sections.slice(0, INITIAL_COUNT);

  return (
    <section className="bg-[#F7F9FC] py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div
          ref={headerRef}
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#00A67E] dark:text-[#00E0AE]">
            Terms &amp; Conditions
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-4xl">
            Product Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
            Please read the following terms carefully to understand the
            coverage, claim process, and conditions applicable to your
            Surokkha Health membership.
          </p>
          <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-[#00C896]" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleSections.map((section, index) => (
            <TermCard key={section.id} section={section} index={index} />
          ))}
        </div>

        {sections.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A]/10 bg-white px-6 py-2.5 text-sm font-semibold text-[#0B1F3A] shadow-sm transition-all duration-300 hover:border-[#00A67E]/40 hover:bg-[#00A67E]/5 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:hover:bg-white/5"
            >
              {expanded ? "Show Less" : "Show More"}
              {expanded ? (
                <ChevronUp className="h-4 w-4 text-[#00A67E] dark:text-[#00E0AE]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#00A67E] dark:text-[#00E0AE]" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}