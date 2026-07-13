"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

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
      <>
        <p>
          We at Shurokka Bangladesh Ltd and other companies in the BIMA
          group, are committed to protecting our customers&apos; privacy.
          This Privacy Policy explains how we handle your personal
          information and any personal information you give us about
          someone else, such as a member of your family or a beneficiary.
        </p>
        <p>In the sections below, we describe:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>what personal information we collect</li>
          <li>how we use and handle personal information, and</li>
          <li>who we share personal information with</li>
        </ul>
        <p>
          We also give you information about your legal rights and how to
          contact us.
        </p>
        <p>
          Shurokka may update this Privacy Policy from time to time. If we
          do this, we will post the new Privacy Policy on this webpage,
          which will take effect the day it is posted, as set out at the
          bottom of this document.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Collection of Personal Information",
    content: (
      <>
        <p>
          Personal information means any information that relates directly
          or indirectly to an individual who is identified or identifiable
          either from that information or from that information and other
          information in the possession of the information user. Certain
          personal information is classified as sensitive personal
          information — this includes any personal information about an
          individual&apos;s physical or mental health or condition, their
          political opinions, their religious or other similar beliefs,
          and their commission or alleged commission of any offence.
        </p>
        <p>
          The use of personal information under this Privacy Policy may be
          refreshed at or before the passing of twelve (12) months after
          the first collection of such information, and always complying
          with applicable laws. We take all appropriate steps to ensure the
          personal information we collect is accurate, complete, not
          misleading and up to date, having regard to the purpose for
          which it was collected and further processed.
        </p>
        <p>
          When you register with Shurokka to buy one of our products or
          services, use one of our products or services, or ask us for
          information about them, you are voluntarily providing us with
          your personal information, which we will collect and use. This
          information may include sensitive personal information. You may
          provide us with information as a result of visiting our website,
          through replies to our advertisements on other networks, and
          through application forms, telephone calls, text messages,
          emails, claim forms, or other means of communication.
        </p>
        <p>
          Sometimes you may give us personal information about another
          person — for example, to tell us about family members who you
          want to have access to our mobile health services, or who you
          want to benefit from a life insurance policy. If you provide us
          with personal information about someone else, we will assume you
          are entitled to give it to us, including having obtained their
          permission if necessary.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          General identification and contact information
        </h4>
        <p>
          We collect general identification and contact information about
          you and other relevant individuals when you register with us for
          any of our products and services. This may include your or
          their: name, email address, telephone number, gender, marital
          status, date of birth, educational background, confirmation of
          medical condition, and national identity number.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Insurance products and services
        </h4>
        <p>
          When you register for insurance products and services, we
          collect financial information about you in connection with your
          payment of premiums — including whether you are paying using
          airtime purchased from your mobile phone company, or details of
          your electronic wallet or bank account. We will also collect
          information about you and other relevant individuals if you or a
          beneficiary make a claim under your policy, such as a death
          certificate or hospital report, and relevant bank account
          details for settlement.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Mobile health products and services
        </h4>
        <p>
          When you use a mobile health product, we collect and record
          sensitive personal information about you, including information
          you give our doctors during medical consultations — such as
          medical history, health status, and any information relevant to
          treatment. This also includes prescriptions issued and results of
          any medical tests organised by our doctors. If you buy mobile
          health services for someone else, we collect and record
          sensitive personal information about them in the same way.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>
          We use personal information, including sensitive personal
          information, where you have consented to this and/or where it is
          necessary to meet your needs and the needs of other relevant
          individuals, to perform our contractual obligations, and to
          provide a quality service. In particular, we collect and use
          personal information for the purposes of:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            responding to requests about Shurokka products and services and
            assessing your eligibility for them
          </li>
          <li>
            registering you and other relevant individuals for products and
            services you buy
          </li>
          <li>
            assessing your eligibility for payment plans and processing
            your premium and other payments
          </li>
          <li>
            making decisions in relation to any products and services you
            buy, including assessing, processing and settling claims
          </li>
          <li>
            sending you important information about changes to any
            products and services and other administrative information
          </li>
          <li>
            communicating with you and others in the conduct of our
            business operations
          </li>
          <li>
            administering any competitions, prize draws or similar
            promotions that you participate in
          </li>
          <li>
            resolving complaints and acting on requests for copies of
            personal information or its correction
          </li>
          <li>
            complying with our obligations under applicable laws and
            regulations, including those relating to the prevention of
            money-laundering and terrorism
          </li>
          <li>
            establishing and defending our legal rights and the legal
            rights of third parties such as insurers
          </li>
          <li>
            managing our infrastructure and business operations in line
            with internal policies, including auditing, finance and
            accounting, billing, IT systems, and business continuity
          </li>
          <li>obtaining professional advice, and</li>
          <li>
            protecting your vital interests, for example in the case of an
            emergency
          </li>
        </ul>
        <p>
          Where we use automated decision-making procedures and profiling
          activities, we will provide specific information regarding the
          purpose and extent of such processing.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Marketing
        </h4>
        <p>
          We use personal information about potential customers received
          from business partners to ask if they are interested in our
          products and services. We also use personal information to carry
          out market research and analysis to improve our offerings. Unless
          you have told us that you do not wish to receive marketing
          communications, we may use your personal information to provide
          direct marketing about other products and services we think may
          be suitable for you.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Telephone records
        </h4>
        <p>
          We record our telephone conversations with customers and
          potential customers, so that we have evidence of their
          requirements and for quality assurance purposes.
        </p>
      </>
    ),
  },
  {
    id: "how-we-share-information",
    title: "How We Share Your Information",
    content: (
      <>
        <p>
          The global nature of our business means we need to share personal
          information with group companies, business partners and other
          third parties, some of whom are located outside Bangladesh. This
          means your personal information may be held on data servers and
          processed in countries outside Bangladesh.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          The Shurokka / BIMA group
        </h4>
        <p>
          We share personal information between companies in the Shurokka
          group for the purposes of business development, market research
          and analysis activities, carried out on the basis of our
          legitimate interests. Other companies within the BIMA group
          operating outside Bangladesh are responsible for processing
          personal information in the course of operating and maintaining
          the group&apos;s IT systems.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Service providers
        </h4>
        <p>
          We share information with our service providers as needed to
          provide our products and services and operate our business,
          including: insurers, reinsurers and claims administrators;
          business partners such as telecommunications companies;
          financial institutions and e-commerce entities; medical
          professionals and providers of medical services; external
          advisers such as accountants, actuaries and lawyers; and other
          service providers such as IT, hosting, market research, and call
          centre operators.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Governmental authorities
        </h4>
        <p>
          From time to time we may be required to share personal
          information with governmental, regulatory or other public
          authorities, such as tax authorities, financial services
          regulators, and law enforcement agencies, which may include
          authorities based outside Bangladesh.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Third parties involved in court action
        </h4>
        <p>
          We may share information with courts and with third parties and
          their representatives in the course of legal proceedings where we
          believe this is necessary or appropriate.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Other third parties
        </h4>
        <p>
          If you use or make a claim under a product or service someone
          else has bought for your benefit, we may share your personal
          information with them if you have authorised this in writing, or
          if you are under 18 and that person is your parent or guardian.
          We may also share information with fire, police or medical
          emergency services, and with any purchaser or party involved in
          business transactions such as the sale, merger, or outsourcing of
          all or part of our business.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <>
        <p>
          Shurokka takes its information security responsibilities very
          seriously. We take appropriate technical, physical and
          organisational security measures to prevent the loss, misuse,
          modification, unauthorised or accidental access to, disclosure,
          alteration or destruction of personal information. This includes
          limiting access to personal information within our systems to
          relevant staff, encrypting sensitive personal information when
          it is transferred, and putting appropriate legal agreements in
          place internally and with external service providers to ensure
          personal information continues to receive an adequate level of
          protection.
        </p>
        <p>
          However, transmission of data over the internet and data storage
          systems are never completely secure. If you think that someone
          might have accessed your personal information improperly, please
          tell us immediately using the contact details below.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <p>
        We take all reasonable steps to ensure that we delete or destroy
        personal information when it is no longer needed for the purposes
        for which it was collected.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Legal Rights",
    content: (
      <>
        <p>
          You have legal rights under applicable information protection
          laws in relation to your personal information.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Correction and complaints
        </h4>
        <p>
          You can ask us for a copy of your personal information. We are
          entitled to charge you a fee for providing this, and will not be
          obliged to give you this information in certain circumstances —
          for example, if we are not reasonably satisfied as to your
          identity, or if the burden of providing the information is
          disproportionate to the risk to your privacy. You can also ask us
          to correct your personal information if it is inaccurate,
          incomplete, misleading, or not up to date.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Sensitive personal information
        </h4>
        <p>
          If personal information is sensitive personal information, we
          will only collect and use it with your explicit consent, unless
          we are permitted to use it under applicable law — for example,
          to protect your vital interests, in connection with legal
          proceedings, for obtaining legal advice, or for establishing,
          exercising or defending legal rights. You may withdraw your
          consent to our collection and use of sensitive personal
          information at any time, but if you do, we will no longer be
          able to provide you with services or perform our obligations
          under products you have already bought.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Marketing preferences
        </h4>
        <p>
          We will provide you with regular opportunities to let us know
          your marketing preferences. You may change your preferences or
          tell us you no longer want to receive marketing communications
          at any time — though we may still need to contact you regarding
          products or services you have already bought.
        </p>

        <h4 className="mt-6 text-base font-bold text-[#0B1F3A] dark:text-white">
          Legitimate interests
        </h4>
        <p>
          You have the right at any time to object to our use of your
          personal information where it is used for the purposes of
          pursuing our legitimate interests. This right is not absolute —
          we may still use your personal information if we can demonstrate
          compelling legitimate grounds that override your interests,
          rights and freedoms, or where it is necessary for establishing,
          exercising or defending legal claims.
        </p>
      </>
    ),
  },
  {
    id: "policy-changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect
        changes in our practices or for legal, operational, or regulatory
        reasons. Any updates will be posted on this page along with a
        revised &quot;last updated&quot; date. We encourage you to review
        this page periodically to stay informed.
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
            Last updated: July 2026
          </span>
          <h1 className="mt-5 text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-400">
            At Shurokka, we value transparency and trust. Please take a
            moment to read our Privacy Policy to understand our commitment
            to protecting your personal information.
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
                  index !== 0 ? "mt-12 border-t border-black/5 pt-12 dark:border-white/10" : ""
                }`}
              >
                <h2 className="mb-4 text-2xl font-bold text-[#0B1F3A] dark:text-white">
                  {s.title}
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
                Contact Us
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                Please contact us with any queries regarding your data and
                personal information.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-[#EFF4FA] p-5 dark:bg-neutral-900">
                  <Mail className="mb-3 h-5 w-5 text-[#00A67E]" strokeWidth={2} />
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Email
                  </p>
                  <Link
                    href="mailto:info@bd.shurokka.com"
                    className="text-sm font-semibold text-[#0B1F3A] hover:text-[#00A67E] dark:text-white dark:hover:text-[#00E0AE]"
                  >
                    info@bd.shurokka.com
                  </Link>
                </div>

                <div className="rounded-xl bg-[#EFF4FA] p-5 dark:bg-neutral-900">
                  <Phone className="mb-3 h-5 w-5 text-[#00A67E]" strokeWidth={2} />
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Telephone
                  </p>
                  <Link
                    href="tel:09610500599"
                    className="text-sm font-semibold text-[#0B1F3A] hover:text-[#00A67E] dark:text-white dark:hover:text-[#00E0AE]"
                  >
                    09610500599
                  </Link>
                </div>

                <div className="rounded-xl bg-[#EFF4FA] p-5 dark:bg-neutral-900">
                  <MapPin className="mb-3 h-5 w-5 text-[#00A67E]" strokeWidth={2} />
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Address
                  </p>
                  <p className="text-sm font-semibold leading-snug text-[#0B1F3A] dark:text-white">
                    8th &amp; 9th Floor, MS Center, 8 Bir Uttam AK Khandakar
                    Rd, Dhaka 1212
                  </p>
                </div>
              </div>

              <Link
                href="/partner-hospitals"
                className="mt-6 inline-block text-sm font-semibold text-[#007A55] underline underline-offset-4 hover:text-[#00A67E] dark:text-[#00E0AE]"
              >
                View partner hospitals address →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}