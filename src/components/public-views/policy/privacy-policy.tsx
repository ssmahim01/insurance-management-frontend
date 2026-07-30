"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Phone, Globe } from "lucide-react";
import { siteConfig } from "@/lib/sideConfig";

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <p>
        Welcome to Surokkha Health, a brand of Unicorn Providers Limited. We
        value your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use,
        store, and protect your information when you visit our website or
        use our services.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>We may collect the following information:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Full Name</li>
          <li>Mobile Number</li>
          <li>Email Address</li>
          <li>Date of Birth</li>
          <li>Gender</li>
          <li>National ID or other identification (where required)</li>
          <li>Address</li>
          <li>Health plan information</li>
          <li>Claim-related documents and supporting information</li>
          <li>
            Information you provide through forms, customer support, or
            other communications
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>Your information may be used to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Process membership applications</li>
          <li>Provide healthcare protection services</li>
          <li>Process claims and reimbursements</li>
          <li>Verify your identity</li>
          <li>Communicate important service updates</li>
          <li>Respond to customer inquiries</li>
          <li>Improve our services and website</li>
          <li>Meet legal and regulatory requirements</li>
        </ul>
      </>
    ),
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    content: (
      <>
        <p>We do not sell your personal information.</p>
        <p>We may share information only when necessary with:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Authorized healthcare providers</li>
          <li>Partner hospitals and diagnostic centres</li>
          <li>Partner pharmacies</li>
          <li>Technology and service providers</li>
          <li>Insurance or business partners (where applicable)</li>
          <li>Government or regulatory authorities when required by law</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <p>
        We implement appropriate administrative, technical, and
        organisational safeguards to protect your personal information
        against unauthorised access, misuse, alteration, or disclosure.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Our website may use cookies and similar technologies to improve
        website functionality, analyse traffic, and enhance user
        experience. You can manage cookie preferences through your browser
        settings.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>You may request to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Update your information</li>
          <li>Request deletion where legally permissible</li>
          <li>Contact us regarding any privacy concerns</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <p>
        We retain personal information only for as long as necessary to
        provide our services, comply with legal obligations, resolve
        disputes, and enforce our agreements.
      </p>
    ),
  },
  {
    id: "third-party-websites",
    title: "Third-Party Websites",
    content: (
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for their privacy practices or content.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: (
      <p>
        Our services are not intended for children without the consent of
        a parent or legal guardian where such consent is required.
      </p>
    ),
  },
  {
    id: "policy-changes",
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. Any changes
        will be published on this page together with the updated effective
        date.
      </p>
    ),
  },
];

function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export default function PrivacyPolicySection() {
  const ids = sections.map((s) => s.id);
  const activeId = useScrollSpy(ids);

  return (
    <section className="bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-black/5 bg-[#EFF4FA] py-14 dark:border-white/10 dark:bg-neutral-900 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block rounded-full bg-[#00C896]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#00A67E]">
            Effective Date: 01-08-2026
          </span>
          <h1 className="mt-5 text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-400">
            At Surokkha Health, we value transparency and trust. Please
            take a moment to read our Privacy Policy to understand our
            commitment to protecting your personal information.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                On this page
              </p>
              <nav className="space-y-1 border-l border-black/5 dark:border-white/10">
                {sections.map((s) => (
                  <Link
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block border-l-2 py-1.5 pl-4 text-sm transition-colors duration-200 ${
                      activeId === s.id
                        ? "border-[#00C896] font-semibold text-[#007A55] dark:text-[#00E0AE]"
                        : "border-transparent text-gray-500 hover:text-[#0B1F3A] dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {s.title}
                  </Link>
                ))}
                <Link
                  href="#contact-us"
                  className={`block border-l-2 py-1.5 pl-4 text-sm transition-colors duration-200 ${
                    activeId === "contact-us"
                      ? "border-[#00C896] font-semibold text-[#007A55] dark:text-[#00E0AE]"
                      : "border-transparent text-gray-500 hover:text-[#0B1F3A] dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0 text-justify">
            {sections.map((s, index) => (
              <div
                key={s.id}
                id={s.id}
                className={`scroll-mt-24 ${
                  index !== 0
                    ? "mt-12 border-t border-black/5 pt-12 dark:border-white/10"
                    : ""
                }`}
              >
                <h2 className="mb-4 text-2xl font-bold text-[#0B1F3A] dark:text-white">
                  {index + 1}. {s.title}
                </h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                  {s.content}
                </div>
              </div>
            ))}

            {/* Contact card */}
            <div
              id="contact-us"
              className="scroll-mt-24 mt-12 border-t border-black/5 pt-12 dark:border-white/10"
            >
              <h2 className="mb-4 text-2xl font-bold text-[#0B1F3A] dark:text-white">
                11. Contact Us
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                If you have any questions regarding this Privacy Policy,
                please contact us.
              </p>

              <p className="mb-4 text-sm font-semibold text-[#0B1F3A] dark:text-white">
                Surokkha Health
                <span className="block font-normal text-gray-500 dark:text-gray-400">
                  A Brand of Unicorn Providers Limited
                </span>
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-[#EFF4FA] p-5 dark:bg-neutral-900">
                  <Mail className="mb-3 h-5 w-5 text-[#00A67E]" strokeWidth={2} />
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Email
                  </p>
                  <Link
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm font-semibold text-[#0B1F3A] hover:text-[#00A67E] dark:text-white dark:hover:text-[#00E0AE]"
                  >
                    {siteConfig.email}
                  </Link>
                </div>

                <div className="rounded-xl bg-[#EFF4FA] p-5 dark:bg-neutral-900">
                  <Phone className="mb-3 h-5 w-5 text-[#00A67E]" strokeWidth={2} />
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Phone
                  </p>
                  <Link
                    href="tel:+8809610500599"
                    className="text-sm font-semibold text-[#0B1F3A] hover:text-[#00A67E] dark:text-white dark:hover:text-[#00E0AE]"
                  >
                    {siteConfig.phone}
                  </Link>
                </div>

                <div className="rounded-xl bg-[#EFF4FA] p-5 dark:bg-neutral-900">
                  <Globe className="mb-3 h-5 w-5 text-[#00A67E]" strokeWidth={2} />
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Website
                  </p>
                  <p className="text-sm font-semibold leading-snug text-[#0B1F3A] dark:text-white">
                    {siteConfig.website ?? "surokkhahealth.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}