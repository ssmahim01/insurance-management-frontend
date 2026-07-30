"use client";

import { useInView } from "@/components/shared/useInView";

export default function AboutUsSection() {
  const { ref: sectionRef, isVisible: visible } = useInView({
      threshold: 0.1,
  });

  return (
    <section className="bg-white py-6 dark:bg-neutral-950 sm:py-16">
      <div
        
        className={`mx-auto max-w-4xl px-5 text-center transition-all duration-700 ease-out `}
      >
        <h2 className="mb-3 text-3xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-4xl">
          About Us
        </h2>

        <p className="mb-8 text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          Protecting Health. Supporting Families.
        </p>

        <div ref={sectionRef} className={`space-y-5 text-justify text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          <p>
            At Surokkha Health, we believe that quality healthcare should be
            accessible, affordable, and dependable for everyone. Our goal is
            to help individuals and families reduce the financial burden of
            unexpected medical expenses through practical and reliable
            health protection solutions.
          </p>
          <p>
            We offer a range of health benefits designed to provide peace of
            mind when it matters most. Depending on the selected plan,
            members may receive benefits such as doctor consultation,
            pharmacy discounts, partner hospital and diagnostic discounts,
            hospitalization reimbursement, outpatient claim benefits,
            pregnancy-related hospitalization coverage, critical illness
            coverage, disability coverage, and natural &amp; accidental death
            benefits.
          </p>
          <p>
            Our focus is not only on providing financial protection but also
            on making healthcare support simple, transparent, and
            customer-friendly. Every service is designed to help our members
            access quality healthcare with confidence.
          </p>
          <p>
            Backed by a dedicated team and a growing healthcare network, we
            are committed to delivering trusted services that create
            long-term value for our members and their families.
          </p>
          <p>
            Surokkha Health is a brand of{" "}
            <span className="font-semibold text-[#0B1F3A] dark:text-white">
              Unicorn Providers Limited
            </span>
            , committed to building a healthier and financially secure
            Bangladesh through innovative healthcare protection solutions.
          </p>
        </div>
      </div>
    </section>
  );
}