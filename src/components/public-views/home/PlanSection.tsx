
"use client";
import { Check, ArrowRight, Shield, ShieldPlus, Users, Sparkles, Infinity as InfinityIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/components/shared/useInView";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link, { LinkProps } from "next/link";

interface Plan {
  id: number;
  tier: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  level: number;
  features: string[];
  perfectFor: string;
  cta: string;
  href: LinkProps["href"];
}

const plans: Plan[] = [
  {
    id: 1,
    tier: "Tier 01",
    name: "Surokkha Basic",
    tagline: "Essential Protection for Everyday Healthcare",
    description:
      "Designed for individuals looking for affordable health protection. Essential financial support during hospitalization, plus access to medical consultation and exclusive healthcare discounts.",
    icon: Shield,
    level: 1,
    features: [
      "Hospital Cash Benefit",
      "Doctor Consultation Support",
      "Hospital Discount Network",
      "Pharmacy Discount",
      "Accidental Death Benefit",
      "Natural Death Benefit",
      "Permanent Disability Protection",
    ],
    perfectFor: "Students, young professionals and first-time buyers",
    cta: "Learn More",
      href: {
      pathname: "/products",
      query: {
        plan: "basic",
      },
    },
  },
  {
    id: 2,
    tier: "Tier 02",
    name: "Surokkha Plus",
    tagline: "Greater Protection with More Healthcare Benefits",
    description:
      "Enhanced coverage for individuals who need more frequent access to healthcare. Increased medical benefits and broader financial protection for unexpected medical situations.",
    icon: ShieldPlus,
    level: 2,
    features: [
      "Enhanced Hospital Cash Benefit",
      "Increased Doctor Consultations",
      "Hospital & Pharmacy Discounts",
      "Accidental Coverage",
      "Permanent Disability Protection",
      "Natural Death Benefit",
    ],
    perfectFor: "Working professionals and growing families",
    cta: "Learn More",
    href: {
      pathname: "/products",
      query: {
        plan: "plus",
      },
    },
  },
  {
    id: 3,
    tier: "Tier 03",
    name: "Surokkha Standard",
    tagline: "Comprehensive Healthcare for Your Family",
    description:
      "Combines everyday healthcare support with stronger financial protection — hospitalization benefits plus critical illness and accident-related coverage.",
    icon: Users,
    level: 3,
    features: [
      "Comprehensive Hospital Cash Benefit",
      "Doctor Consultation",
      "Hospital & Pharmacy Discounts",
      "Ward Expense Support",
      "Critical Illness Benefit",
      "Accident Protection",
      "Disability Coverage",
      "Life Protection",
    ],
    perfectFor: "Families seeking balanced healthcare and financial security",
    cta: "Learn More",
     href: {
      pathname: "/products",
      query: {
        plan: "standard",
      },
    },
  },
  {
    id: 4,
    tier: "Tier 04",
    name: "Surokkha Smart",
    tagline: "Advanced Health Protection with Wellness Benefits",
    description:
      "More than insurance — Surokkha Smart encourages preventive healthcare with wellness benefits, health screenings and higher financial protection.",
    icon: Sparkles,
    level: 4,
    features: [
      "Higher Hospital Cash Benefit",
      "Wellness Benefits",
      "Preventive Health Screening",
      "Ward Coverage",
      "Doctor Consultation",
      "Critical Illness Benefit",
      "Enhanced Accident Protection",
      "Disability Protection",
    ],
    perfectFor: "Health-conscious individuals who value preventive care",
    cta: "Learn More",
    href: {
      pathname: "/products",
      query: {
        plan: "smart",
      },
    },
  },
  {
    id: 5,
    tier: "Tier 05",
    name: "Surokkha 360",
    tagline: "Complete Protection for Every Stage of Life",
    description:
      "Our most comprehensive healthcare solution — premium medical benefits, higher financial protection and wellness services for every unexpected challenge.",
    icon: InfinityIcon,
    level: 5,
    features: [
      "Maximum Hospital Cash Benefit",
      "Premium Wellness Program",
      "Preventive Health Screening",
      "Doctor Consultation",
      "Hospital & Pharmacy Benefits",
      "Critical Illness Protection",
      "Accident Coverage",
      "Disability Protection",
      "Life Coverage",
    ],
    perfectFor: "Individuals and families seeking the highest level of protection",
    cta: "Get Started",
    href: {
      pathname: "/products",
      query: {
        plan: "360",
      },
    },
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  return (
    <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl dark:bg-neutral-900 dark:ring-white/10">
      <div className="flex flex-col gap-4 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00C896]/10">
            <Icon className="h-5.5 w-5.5 text-[#007A55] dark:text-[#00C896]" strokeWidth={2} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {plan.tier}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white">{plan.name}</h3>
          <p className="mt-1 text-sm font-medium text-[#00A67E]">{plan.tagline}</p>
        </div>

        <p className="text-[13.5px] leading-relaxed text-gray-500 dark:text-gray-400">
          {plan.description}
        </p>
      </div>

      <div className="mx-6 border-t border-dashed border-gray-200 dark:border-white/10" />

      <div className="flex flex-1 flex-col p-6 pt-4">
        <span className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          What&apos;s Included
        </span>
        <ul className="mb-5 flex-1 space-y-2.5">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00A67E]" strokeWidth={3} />
              <span className="text-[14px] leading-snug text-gray-600 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-5 rounded-lg bg-[#EFF4FA] px-3.5 py-2.5 dark:bg-white/5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#00A67E]">
            Perfect For
          </span>
          <p className="mt-0.5 text-[13px] leading-snug text-[#0B1F3A] dark:text-gray-200">
            {plan.perfectFor}
          </p>
        </div>
        <Link
          href={plan.href}
          className="group/btn inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#007A55] px-6 py-3 text-sm font-semibold text-[#007A55] transition-all duration-500 hover:bg-[#007A55] hover:text-white dark:border-[#00C896] dark:text-[#00C896] dark:hover:bg-[#00C896] dark:hover:text-neutral-950"
        >
          {plan.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default function PlansSection() {
  const { ref: sectionRef, isVisible: visible } = useInView({
    threshold: 0.1,
  }); 

  return (
    <section ref={sectionRef} className="bg-[#EFF4FA] py-6 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00A67E]">
            Explore Our Health Plans
          </span>
          <h2 className="mt-3 text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
            A plan for every stage of life
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Every individual and family has unique healthcare needs. Five tiers of
            protection, each building on the last — so you can start where you are
            and grow into more coverage over time.
          </p>
        </div>

        {/* Mobile: Swiper slider */}
        <div
          className={`relative mt-14 lg:hidden transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            navigation={{
              prevEl: ".plans-prev",
              nextEl: ".plans-next",
            }}
            pagination={{
              clickable: true,
              el: ".plans-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="equal-height-slider pb-12!"
          >
            {plans.map((plan) => (
              <SwiperSlide key={plan.id} className="h-auto py-1">
                <PlanCard plan={plan} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Button */}
          <button className="plans-prev absolute left-2 top-[45%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg dark:bg-neutral-800">
            <ChevronLeft className="h-5 w-5 text-[#0B1F3A] dark:text-white" />
          </button>

          {/* Right Button */}
          <button className="plans-next absolute right-2 top-[45%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg dark:bg-neutral-800">
            <ChevronRight className="h-5 w-5 text-[#0B1F3A] dark:text-white" />
          </button>

          <div className="plans-pagination flex justify-center gap-1.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-gray-500 [&_.swiper-pagination-bullet-active]:w-4 [&_.swiper-pagination-bullet-active]:bg-[#007A55] [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300" />
        </div>

        {/* Tablet & Desktop: grid */}
        <div className="mt-14 hidden lg:grid sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .equal-height-slider .swiper-wrapper {
          align-items: stretch;
        }
        .equal-height-slider .swiper-slide {
          height: auto !important;
          display: flex;
        }
      `}</style>
    </section>
  );
}