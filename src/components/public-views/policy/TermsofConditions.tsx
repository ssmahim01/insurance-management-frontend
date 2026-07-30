"use client";

import { useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  Layers,
  FileWarning,
  UserCog,
  Ban,
  RefreshCcw,
  Copyright,
  ScaleIcon,
  Lock,
  Gavel,
  History,
  Mail,
  Phone,
  Globe,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useInView } from "@/components/shared/useInView";
import { siteConfig } from "@/lib/sideConfig";

interface Clause {
  text: string;
}

interface TermSection {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  intro?: string;
  clauses: Clause[];
}

const sections: TermSection[] = [
  {
    id: "acceptance",
    number: "01",
    icon: ShieldCheck,
    title: "Acceptance of Terms",
    clauses: [
      {
        text: "By using our website or services, you confirm that you have read, understood, and accepted these Terms & Conditions.",
      },
    ],
  },
  {
    id: "eligibility",
    number: "02",
    icon: UserCheck,
    title: "Eligibility",
    clauses: [
      { text: "Membership is available only to eligible individuals under the applicable product terms." },
      { text: "Applicants must provide accurate and complete information during registration." },
    ],
  },
  {
    id: "membership",
    number: "03",
    icon: Layers,
    title: "Membership & Benefits",
    clauses: [
      { text: "Benefits are available only under the selected membership plan." },
      { text: "Coverage, benefit limits, waiting periods, exclusions, and claim eligibility vary by product." },
      { text: "Benefits are subject to the applicable product terms and conditions." },
    ],
  },
  {
    id: "claims",
    number: "04",
    icon: FileWarning,
    title: "Claims",
    clauses: [
      { text: "Claims must be submitted with all required documents within the time specified under the applicable product." },
      { text: "Submission of a claim does not guarantee approval." },
      { text: "Every claim will be assessed according to the relevant product terms and verification process." },
    ],
  },
  {
    id: "responsibilities",
    number: "05",
    icon: UserCog,
    title: "Member Responsibilities",
    intro: "Members agree to:",
    clauses: [
      { text: "Provide accurate and truthful information." },
      { text: "Keep contact information updated." },
      { text: "Submit genuine documents for claims." },
      { text: "Follow all applicable membership rules and procedures." },
    ],
  },
  {
    id: "prohibited",
    number: "06",
    icon: Ban,
    title: "Prohibited Activities",
    intro: "Members must not:",
    clauses: [
      { text: "Submit false or misleading information." },
      { text: "Attempt fraudulent or duplicate claims." },
      { text: "Misuse membership benefits." },
      { text: "Use the website or services for unlawful purposes." },
    ],
  },
  {
    id: "changes-services",
    number: "07",
    icon: RefreshCcw,
    title: "Changes to Services",
    clauses: [
      {
        text: "Surokkha Health reserves the right to modify, suspend, or discontinue any service, feature, or benefit where necessary, subject to applicable laws and contractual obligations.",
      },
    ],
  },
  {
    id: "ip",
    number: "08",
    icon: Copyright,
    title: "Intellectual Property",
    clauses: [
      {
        text: "All logos, trademarks, text, graphics, website content, and branding remain the property of Unicorn Providers Limited unless otherwise stated.",
      },
      { text: "No content may be copied, reproduced, or distributed without prior written permission." },
    ],
  },
  {
    id: "liability",
    number: "09",
    icon: ScaleIcon,
    title: "Limitation of Liability",
    clauses: [
      {
        text: "Surokkha Health shall not be responsible for any indirect, incidental, or consequential loss arising from the use of the website or services, except where liability cannot legally be excluded.",
      },
    ],
  },
  {
    id: "privacy",
    number: "10",
    icon: Lock,
    title: "Privacy",
    clauses: [
      { text: "The collection and use of personal information are governed by our Privacy Policy." },
    ],
  },
  {
    id: "governing-law",
    number: "11",
    icon: Gavel,
    title: "Governing Law",
    clauses: [
      {
        text: "These Terms & Conditions shall be governed by the laws of the People's Republic of Bangladesh.",
      },
      { text: "Any dispute shall be subject to the jurisdiction of the competent courts of Bangladesh." },
    ],
  },
  {
    id: "changes-terms",
    number: "12",
    icon: History,
    title: "Changes to These Terms",
    clauses: [
      {
        text: "We may update these Terms & Conditions from time to time. The latest version published on our website will apply from its effective date.",
      },
    ],
  },
];

const INITIAL_COUNT = 6;

function TermCard({ section }: { section: TermSection; index: number }) {
  const { ref, isVisible: visible } = useInView({ threshold: 0.1 });
  const Icon = section.icon;

  return (
    <div
      ref={ref}
      
      className={`group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-neutral-900 sm:p-7 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="mb-4 flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00A67E]/10 text-[#007A55] transition-colors duration-300 group-hover:bg-[#00A67E]/20 dark:bg-[#00E0AE]/10 dark:text-[#00E0AE]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white sm:text-lg">
          {section.title}
        </h3>
      </div>

      {section.intro && (
        <p className="mb-2.5 text-sm font-medium text-[#0B1F3A] dark:text-white">
          {section.intro}
        </p>
      )}

      <ul className="space-y-2.5">
        {section.clauses.map((clause, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-[14.5px] leading-relaxed text-gray-600 dark:text-gray-400"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C896]" />
            <span>{clause.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TermsAndConditions() {
  const { ref: headerRef, isVisible: headerVisible } = useInView({
    threshold: 0.2,
  });
  const { ref: contactRef, isVisible: contactVisible } = useInView({
    threshold: 0.2,
  });
  const [expanded, setExpanded] = useState(false);

  const visibleSections = expanded ? sections : sections.slice(0, INITIAL_COUNT);

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
            Legal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
            Welcome to Surokkha Health, a brand of Unicorn Providers Limited.
            By accessing our website, purchasing a membership, or using any
            of our services, you agree to comply with these Terms &amp;
            Conditions.
          </p>
          <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-[#00C896]" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        <div
          ref={contactRef}
          className={`mt-16 rounded-2xl bg-[#0B1F3A] p-7 text-center transition-all duration-700 ease-out dark:bg-neutral-900 sm:p-10 ${
            contactVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#00E0AE]">
            Contact Us
          </span>
          <h3 className="text-xl font-extrabold text-white sm:text-2xl">
            Surokkha Health
          </h3>
          <p className="mt-1 text-sm text-white/60">
            A Brand of Unicorn Providers Limited
          </p>

          <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 text-sm text-white/80 sm:flex-row sm:justify-center sm:gap-8">
            <Link
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 transition-colors hover:text-[#00E0AE]"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </Link>
            <Link
              href="tel:+8809610500599"
              className="flex items-center gap-2 transition-colors hover:text-[#00E0AE]"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </Link>
            <Link href={`${siteConfig.website}`} target="_blank">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {siteConfig.website ?? "surokkhahealth.com"}
            </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}