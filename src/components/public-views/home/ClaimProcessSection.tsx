// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { Phone, FileText, HandCoins } from "lucide-react";

// const steps = [
//   {
//     id: 1,
//     icon: Phone,
//     title: "Contact Us",
//     description:
//       "To claim, simply reach out to us via Shurokka Health+ App or contact us at",
//     highlight: "09610500599",
//   },
//   {
//     id: 2,
//     icon: FileText,
//     title: "Submit Documents",
//     description:
//       "Upload required documents through Shurokka Health+ App or send us those via WhatsApp Number shared",
//     highlight: null,
//   },
//   {
//     id: 3,
//     icon: HandCoins,
//     title: "Get Your Cashback",
//     description:
//       "After submission, with verification & processing, get your settlement money in your chosen payment method",
//     highlight: null,
//   },
// ];

// export default function ClaimProcessSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.2 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
//       <div className="mx-auto max-w-6xl px-6">
//         <div
//           className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out ${
//             visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <h2 className="text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
//             Get Claim Easily
//           </h2>
//           <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
//             Our claim process is easy and convenient
//           </p>
//         </div>

//         <div
//           ref={sectionRef}
//           className="grid grid-cols-1 gap-6 sm:grid-cols-3"
//         >
//           {steps.map((step, index) => {
//             const Icon = step.icon;
//             return (
//               <div
//                 key={step.id}
//                 style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
//                 className={`flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-lg dark:bg-neutral-900 dark:ring-white/10 ${
//                   visible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-8"
//                 }`}
//               >
//                 <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00C896]/10">
//                   <Icon className="h-6 w-6 text-[#007A55] dark:text-[#00E0AE]" strokeWidth={2} />
//                 </div>

//                 <h3 className="mb-3 text-lg font-bold text-[#0B1F3A] dark:text-white">
//                   {step.title}
//                 </h3>

//                 <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
//                   {step.description}
//                   {step.highlight && (
//                     <>
//                       {" "}
//                       <span className="font-bold text-[#0B1F3A] dark:text-white">
//                         {step.highlight}
//                       </span>
//                     </>
//                   )}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         <div
//           className={`mt-12 text-center transition-all duration-700 ease-out ${
//             visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//           style={{ transitionDelay: visible ? "450ms" : "0ms" }}
//         >
//           <Link
//             href="tel:09610500599"
//             className="inline-flex items-center gap-2 rounded-full bg-[#00C896] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#0F467C] hover:shadow-lg"
//           >
//             Call to Claim
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, FileText, HandCoins, ArrowRight, Check } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Phone,
    title: "Contact Us",
    description:
      "To claim, simply reach out to us via Shurokka Health+ App or contact us at",
    highlight: "09610500599",
  },
  {
    id: 2,
    icon: FileText,
    title: "Submit Documents",
    description:
      "Upload required documents through Shurokka Health+ App or send us those via WhatsApp Number shared",
    highlight: null,
  },
  {
    id: 3,
    icon: HandCoins,
    title: "Get Your Cashback",
    description:
      "After submission, with verification & processing, get your settlement money in your chosen payment method",
    highlight: null,
  },
];

export default function ClaimProcessSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  return (
    <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
            Get Claim Easily
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Our claim process is easy and convenient
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-12 flex items-center justify-center">
          {steps.map((s, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={s.id} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                      isCompleted
                        ? "bg-[#00C896] text-white"
                        : isCurrent
                        ? "bg-[#007A55] text-white ring-4 ring-[#00C896]/25"
                        : "bg-white text-gray-400 ring-1 ring-black/10 dark:bg-neutral-800 dark:text-gray-500 dark:ring-white/10"
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" strokeWidth={3} /> : index + 1}
                  </div>
                  <span
                    className={`mt-2 hidden text-xs font-medium sm:block ${
                      isCurrent
                        ? "text-[#0B1F3A] dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>

                {!isLast && (
                  <div className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10 sm:mx-3">
                    <div
                      className="h-full bg-[#00C896] transition-all duration-500 ease-out"
                      style={{ width: isCompleted ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active step card */}
        <div
          key={step.id}
          className="animate-in fade-in slide-in-from-right-4 flex flex-col items-center rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5 duration-500 dark:bg-neutral-900 dark:ring-white/10"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#00C896]/10">
            <Icon className="h-7 w-7 text-[#007A55] dark:text-[#00E0AE]" strokeWidth={2} />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#00A67E]">
            Step {currentStep + 1} of {steps.length}
          </p>

          <h3 className="mb-4 text-2xl font-bold text-[#0B1F3A] dark:text-white">
            {step.title}
          </h3>

          <p className="max-w-md text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
            {step.description}
            {step.highlight && (
              <>
                {" "}
                <span className="font-bold text-[#0B1F3A] dark:text-white">
                  {step.highlight}
                </span>
              </>
            )}
          </p>

          <div className="mt-8 flex items-center gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
              >
                Back
              </button>
            )}

            {isLastStep ? (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full btn-bg px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300  hover:shadow-lg"
              >
                Call to Claim
              </Link>
            ) : (
              <button
                onClick={handleNext}
                className="group inline-flex items-center gap-2 rounded-full btn-bg px-7 py-3 text-sm font-semibold text-white transition-all duration-300  hover:shadow-lg"
              >
                Next
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}