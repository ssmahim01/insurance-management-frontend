// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Check, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// /* ------------------------------ Types ------------------------------ */

// type ProductId = "health" | "life" | "wellness" | "my-doctor";
// type PlanType = "single" | "joint";

// type Feature = {
//   id: string;
//   title: string;
//   points: string[];
//   image: string;
//   imageAlt: string;
//   link?: { label: string; href: string };
// };

// type PlanRow = {
//   label: string;
//   values: [boolean | number | string, boolean | number | string, boolean | number | string];
// };

// type ProductContent = {
//   heading: string;
//   description: string;
//   features: Feature[];
//   pricing: Record<PlanType, PlanRow[]>;
// };

// /* ---------------------------- Static data ---------------------------- */

// const PRODUCTS: { id: ProductId; label: string }[] = [
//   { id: "health", label: "Shurokka Health" },
//   { id: "life", label: "Shurokka Life" },
//   { id: "wellness", label: "Shurokka Wellness" },
//   { id: "my-doctor", label: "My Doctor" },
// ];

// const PLAN_TYPES: { id: PlanType; label: string }[] = [
//   { id: "single", label: "Single" },
//   { id: "joint", label: "Joint" },
// ];

// const TIERS = ["Silver", "Gold", "Platinum"] as const;

// const HEALTH_PRICING: Record<PlanType, PlanRow[]> = {
//   single: [
//     { label: "24/7 Teledoctor", values: [true, true, true] },
//     { label: "Specialist Doctor", values: [true, true, true] },
//     { label: "Discount at Partner Hospital", values: [true, true, true] },
//     { label: "Personalized Care", values: [true, true, true] },
//     { label: "Health Points", values: [true, true, true] },
//     { label: "Hospitalization Cover (per night)", values: ["2,500", "3,500", "4,500"] },
//     { label: "Hospitalization Cashback Limit (Yearly)", values: ["50,000", "70,000", "90,000"] },
//     { label: "Yearly Limit (Nights)", values: [20, 20, 20] },
//     { label: "Medicine Cashback", values: [false, "2,000", "4,000"] },
//     { label: "Doctor Consultation Cashback", values: [false, "2,000", "2,000"] },
//     { label: "Diagnostic Tests Cashback (Yearly Limit)", values: [false, "1,000", "1,000"] },
//     { label: "Monthly Charge (Taka)", values: [180, 340, 480] },
//     { label: "90 Days Charge (Taka)", values: [435, 935, 1320] },
//     { label: "180 Days Charge (Taka)", values: [875, 1750, 2635] },
//     { label: "Yearly Charge (Taka)", values: [1650, 3290, 5050] },
//   ],
//   joint: [
//     { label: "24/7 Teledoctor", values: [true, true, true] },
//     { label: "Specialist Doctor", values: [true, true, true] },
//     { label: "Discount at Partner Hospital", values: [true, true, true] },
//     { label: "Hospitalization Cashback Limit (Yearly)", values: ["80,000", "110,000", "140,000"] },
//     { label: "Monthly Charge (Taka)", values: [320, 610, 860] },
//     { label: "Yearly Charge (Taka)", values: [2970, 5920, 9090] },
//   ],
// };

// const LIFE_PRICING: Record<PlanType, PlanRow[]> = {
//   single: [
//     { label: "Accidental Death Cover", values: [true, true, true] },
//     { label: "Natural Death Cover", values: [false, true, true] },
//     { label: "Disability Cover", values: [true, true, true] },
//     { label: "Sum Assured (Taka)", values: ["1,00,000", "3,00,000", "5,00,000"] },
//     { label: "Monthly Charge (Taka)", values: [90, 190, 320] },
//     { label: "Yearly Charge (Taka)", values: [990, 2090, 3520] },
//   ],
//   joint: [
//     { label: "Accidental Death Cover", values: [true, true, true] },
//     { label: "Sum Assured (Taka)", values: ["1,50,000", "4,00,000", "6,50,000"] },
//     { label: "Monthly Charge (Taka)", values: [150, 320, 540] },
//     { label: "Yearly Charge (Taka)", values: [1650, 3520, 5940] },
//   ],
// };

// const WELLNESS_PRICING: Record<PlanType, PlanRow[]> = {
//   single: [
//     { label: "Diet Consultation", values: [true, true, true] },
//     { label: "Fitness Plan", values: [false, true, true] },
//     { label: "Mental Health Sessions (Yearly)", values: [1, 4, 8] },
//     { label: "Monthly Charge (Taka)", values: [70, 150, 260] },
//     { label: "Yearly Charge (Taka)", values: [770, 1650, 2860] },
//   ],
//   joint: [
//     { label: "Diet Consultation", values: [true, true, true] },
//     { label: "Mental Health Sessions (Yearly)", values: [2, 6, 12] },
//     { label: "Monthly Charge (Taka)", values: [120, 260, 440] },
//     { label: "Yearly Charge (Taka)", values: [1320, 2860, 4840] },
//   ],
// };

// const MY_DOCTOR_PRICING: Record<PlanType, PlanRow[]> = {
//   single: [
//     { label: "Personal Doctor Access", values: [true, true, true] },
//     { label: "Home Visit (Yearly)", values: [0, 2, 4] },
//     { label: "Monthly Charge (Taka)", values: [250, 450, 650] },
//     { label: "Yearly Charge (Taka)", values: [2750, 4950, 7150] },
//   ],
//   joint: [
//     { label: "Personal Doctor Access", values: [true, true, true] },
//     { label: "Home Visit (Yearly)", values: [0, 3, 6] },
//     { label: "Monthly Charge (Taka)", values: [420, 750, 1080] },
//     { label: "Yearly Charge (Taka)", values: [4620, 8250, 11880] },
//   ],
// };

// const PRODUCT_CONTENT: Record<ProductId, ProductContent> = {
//   health: {
//     heading: "Shurokka Health Plan Details",
//     description:
//       "Get affordable, quality healthcare products that cover your entire family. Easy, auto-recurring payments enabled through your mobile phone.",
//     pricing: HEALTH_PRICING,
//     features: [
//       {
//         id: "telemedicine",
//         title: "24/7 Telemedicine",
//         points: [
//           "Shurokka Doctors are here for you 24/7, all 365 days a year.",
//           "Get a callback from our doctors in 5 minutes and easily get your prescription via app or SMS.",
//           "Our qualified general physicians are all BMDC-licensed MBBS doctors.",
//         ],
//         image: "/features/telemedicine.jpg",
//         imageAlt: "Father and daughter on a telemedicine video call",
//         link: { label: "Check Our Doctors", href: "/doctors" },
//       },
//       {
//         id: "hospital-cashback",
//         title: "Hospital Cashback",
//         points: [
//           "Claim cashback from Shurokka after at least an overnight hospital stay.",
//           "Access hospitalization medical care from any registered hospital across Bangladesh.",
//         ],
//         image: "/features/hospital-cashback.jpg",
//         imageAlt: "Patient resting in a hospital bed",
//       },
//       {
//         id: "partner-discount",
//         title: "10-50% Discount at Partner Hospitals",
//         points: [
//           "Get discounts at 500+ partner hospitals across all 64 districts in Bangladesh.",
//           "Discounts range from a minimum of 10% up to 50% on diagnostics and hospitalization.",
//         ],
//         image: "/features/partner-hospitals.jpg",
//         imageAlt: "Grid of partner hospital logos",
//         link: { label: "See Full List of Partners", href: "/partners" },
//       },
//       {
//         id: "specialist-doctors",
//         title: "Specialist Doctors",
//         points: [
//           "Unlimited teleconsultation access to Gynecologist, Pediatrician, Psychologist, Nutritionist.",
//           "Request a complementary consultation and get a customized diet chart.",
//         ],
//         image: "/features/specialist-doctors.jpg",
//         imageAlt: "Team of specialist doctors",
//       },
//     ],
//   },
//   life: {
//     heading: "Shurokka Life Plan Details",
//     description:
//       "Financial protection for your family in case of accidental or natural death, with simple mobile-based premiums.",
//     pricing: LIFE_PRICING,
//     features: [
//       {
//         id: "accidental-cover",
//         title: "Accidental Death & Disability Cover",
//         points: [
//           "Lump-sum payout to your nominee in case of accidental death.",
//           "Additional cover for permanent disability from an accident.",
//         ],
//         image: "/features/life-accidental.jpg",
//         imageAlt: "Family reviewing life insurance documents",
//       },
//       {
//         id: "easy-claims",
//         title: "Simple, Fast Claims",
//         points: [
//           "Digital claim submission through the Shurokka app.",
//           "Dedicated support team to guide your nominee through the process.",
//         ],
//         image: "/features/life-claims.jpg",
//         imageAlt: "Support agent assisting with a claim",
//       },
//     ],
//   },
//   wellness: {
//     heading: "Shurokka Wellness Plan Details",
//     description:
//       "Stay on top of your physical and mental health with diet, fitness, and counseling support built for daily life.",
//     pricing: WELLNESS_PRICING,
//     features: [
//       {
//         id: "diet-plan",
//         title: "Personalized Diet Plans",
//         points: [
//           "Customized diet charts from certified nutritionists.",
//           "Ongoing check-ins to adjust your plan as you progress.",
//         ],
//         image: "/features/wellness-diet.jpg",
//         imageAlt: "Nutritionist preparing a diet chart",
//       },
//       {
//         id: "mental-health",
//         title: "Mental Health Sessions",
//         points: [
//           "Confidential teleconsultation with licensed psychologists.",
//           "Flexible scheduling around your day.",
//         ],
//         image: "/features/wellness-mental-health.jpg",
//         imageAlt: "Person on a mental health video call",
//       },
//     ],
//   },
//   "my-doctor": {
//     heading: "My Doctor Plan Details",
//     description:
//       "A dedicated personal doctor for your family, available on call with optional home visits.",
//     pricing: MY_DOCTOR_PRICING,
//     features: [
//       {
//         id: "personal-doctor",
//         title: "One Dedicated Doctor",
//         points: [
//           "The same doctor gets to know your family's health history.",
//           "Priority scheduling for consultations.",
//         ],
//         image: "/features/my-doctor-personal.jpg",
//         imageAlt: "Doctor speaking with a family",
//       },
//       {
//         id: "home-visit",
//         title: "Home Visits",
//         points: [
//           "Scheduled home visits included on Gold and Platinum tiers.",
//           "Ideal for elderly family members or young children.",
//         ],
//         image: "/features/my-doctor-home-visit.jpg",
//         imageAlt: "Doctor visiting a patient at home",
//       },
//     ],
//   },
// };

// /* ------------------------------ Cell ------------------------------ */

// function Cell({ value }: { value: boolean | number | string }) {
//   if (typeof value === "boolean") {
//     return value ? (
//       <Check className="mx-auto h-4 w-4 text-teal-600" />
//     ) : (
//       <X className="mx-auto h-4 w-4 text-rose-400" />
//     );
//   }
//   return <span>{value}</span>;
// }

// /* --------------------------- Feature row --------------------------- */

// function FeatureRow({ feature, reverse }: { feature: Feature; reverse: boolean }) {
//   return (
//     <div
//       className={cn(
//         "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16",
//         reverse && "lg:[direction:rtl]"
//       )}
//     >
//       <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md dark:bg-slate-900 lg:[direction:ltr]">
//         <Image
//           src={feature.image}
//           alt={feature.imageAlt}
//           fill
//           className="object-cover"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = "/features/fallback.jpg";
//           }}
//         />
//       </div>
//       <div className="lg:[direction:ltr]">
//         <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
//           {feature.title}
//         </h3>
//         <ul className="mt-5 space-y-3">
//           {feature.points.map((point, idx) => (
//             <li key={idx} className="flex items-start gap-2.5">
//               <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
//               <span className="text-sm text-slate-600 dark:text-slate-400">
//                 {point}
//               </span>
//             </li>
//           ))}
//         </ul>
//         {feature.link && (
//           <Link
//             href={feature.link.href}
//             className="mt-5 inline-block text-sm font-semibold text-orange-500 hover:text-orange-600"
//           >
//             {feature.link.label} &rarr;
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ------------------------------ Main ------------------------------ */

// export default function ProductShowcase() {
//   const [product, setProduct] = useState<ProductId>("health");
//   const [planType, setPlanType] = useState<PlanType>("single");
//   const [fade, setFade] = useState(true);
//   const firstRender = useRef(true);

//   const content = PRODUCT_CONTENT[product];
//   const rows = content.pricing[planType];

//   // Fade content out/in whenever the active product changes
//   useEffect(() => {
//     if (firstRender.current) {
//       firstRender.current = false;
//       return;
//     }
//     setFade(false);
//     const timer = setTimeout(() => setFade(true), 150);
//     return () => clearTimeout(timer);
//   }, [product]);

//   const selectProduct = (id: ProductId) => {
//     if (id === product) return;
//     setProduct(id);
//     setPlanType("single"); // reset plan type when switching product
//   };

//   return (
//     <div>
//       {/* Product tabs */}
//       <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
//         <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
//           Choose a product
//         </h2>
//         <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
//           Make your life easier and healthy with family-focused products
//         </p>

//         <div className="mt-8 inline-flex flex-wrap justify-center gap-2 rounded-xl bg-slate-100 p-1.5 dark:bg-slate-900">
//           {PRODUCTS.map((p) => (
//             <button
//               key={p.id}
//               onClick={() => selectProduct(p.id)}
//               className={cn(
//                 "rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
//                 product === p.id
//                   ? "bg-teal-700 text-white shadow"
//                   : "text-slate-600 hover:text-teal-700 dark:text-slate-300"
//               )}
//             >
//               {p.label}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Content that swaps with the product tab */}
//       <div
//         className={cn(
//           "transition-opacity duration-150 ease-out",
//           fade ? "opacity-100" : "opacity-0"
//         )}
//       >
//         {/* Feature sections */}
//         <section className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 lg:px-8 lg:space-y-24">
//           {content.features.map((feature, i) => (
//             <FeatureRow key={feature.id} feature={feature} reverse={i % 2 === 1} />
//           ))}
//         </section>

//         {/* Pricing table */}
//         <section className="bg-slate-50 py-16 dark:bg-slate-950">
//           <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
//             <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
//               {content.heading}
//             </h2>
//             <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
//               {content.description}
//             </p>

//             {/* Plan type selector */}
//             <div className="mt-8 inline-flex flex-wrap justify-center gap-2 rounded-full bg-white p-1.5 shadow-sm dark:bg-slate-900">
//               {PLAN_TYPES.map((type) => (
//                 <button
//                   key={type.id}
//                   onClick={() => setPlanType(type.id)}
//                   className={cn(
//                     "rounded-full px-4 py-2 text-sm font-medium transition-colors",
//                     planType === type.id
//                       ? "bg-teal-700 text-white"
//                       : "text-slate-600 hover:text-teal-700 dark:text-slate-300"
//                   )}
//                 >
//                   {type.label}
//                 </button>
//               ))}
//             </div>

//             {/* Table */}
//             <div className="mt-10 overflow-x-auto rounded-xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
//               <table className="w-full min-w-160 border-collapse text-left text-sm">
//                 <thead>
//                   <tr className="border-b dark:border-slate-800">
//                     <th className="px-5 py-4 font-semibold text-slate-500">
//                       Plan
//                     </th>
//                     {TIERS.map((tier) => (
//                       <th
//                         key={tier}
//                         className="px-5 py-4 text-center font-semibold text-teal-700 dark:text-teal-400"
//                       >
//                         {tier}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rows.map((row, i) => (
//                     <tr
//                       key={row.label}
//                       className={cn(
//                         "border-b last:border-0 dark:border-slate-800",
//                         i % 2 === 1 && "bg-slate-50/60 dark:bg-slate-800/30"
//                       )}
//                     >
//                       <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300">
//                         {row.label}
//                       </td>
//                       {row.values.map((v, idx) => (
//                         <td key={idx} className="px-5 py-3.5 text-center text-slate-700 dark:text-slate-300">
//                           <Cell value={v} />
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                   <tr>
//                     <td className="px-5 py-5" />
//                     {TIERS.map((tier) => (
//                       <td key={tier} className="px-5 py-5 text-center">
//                         <Button className="bg-teal-700 hover:bg-teal-800">
//                           Know More
//                         </Button>
//                       </td>
//                     ))}
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </section>

//         {/* Terms banner */}
//         <section className="border-y bg-slate-100 py-12 dark:border-slate-800 dark:bg-slate-900">
//           <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
//             <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
//               Terms &amp; Conditions: {content.heading.replace(" Plan Details", "")}
//             </h2>
//             <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
//               At Shurokka, we value transparency and trust. Please take a moment
//               to read our terms and conditions to understand our commitment to
//               providing reliable service.
//             </p>
//             <Button className="mt-6 bg-teal-700 hover:bg-teal-800">
//               <Link href="/terms">Read Our Terms</Link>
//             </Button>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Sparkles, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------ Types ------------------------------ */

type ProductId = "health" | "life" | "wellness" | "my-doctor";
type PlanType = "single" | "joint";

type Feature = {
  id: string;
  title: string;
  points: string[];
  image: string;
  imageAlt: string;
  link?: { label: string; href: string };
};

type PlanRow = {
  label: string;
  values: [boolean | number | string, boolean | number | string, boolean | number | string];
};

type ProductContent = {
  heading: string;
  description: string;
  features: Feature[];
  pricing: Record<PlanType, PlanRow[]>;
};

/* ---------------------------- Static data ---------------------------- */

const PRODUCTS: { id: ProductId; label: string; icon: typeof HeartPulse }[] = [
  { id: "health", label: "Shurokka Health", icon: HeartPulse },
  { id: "life", label: "Shurokka Life", icon: ShieldCheck },
  { id: "wellness", label: "Shurokka Wellness", icon: Sparkles },
  { id: "my-doctor", label: "My Doctor", icon: Stethoscope },
];

const PLAN_TYPES: { id: PlanType; label: string }[] = [
  { id: "single", label: "Single" },
  { id: "joint", label: "Joint" },
];

const TIERS = ["Silver", "Gold", "Platinum"] as const;
const RECOMMENDED_TIER_INDEX = 1; // Gold

const HEALTH_PRICING: Record<PlanType, PlanRow[]> = {
  single: [
    { label: "24/7 Teledoctor", values: [true, true, true] },
    { label: "Specialist Doctor", values: [true, true, true] },
    { label: "Discount at Partner Hospital", values: [true, true, true] },
    { label: "Personalized Care", values: [true, true, true] },
    { label: "Health Points", values: [true, true, true] },
    { label: "Hospitalization Cover (per night)", values: ["2,500", "3,500", "4,500"] },
    { label: "Hospitalization Cashback Limit (Yearly)", values: ["50,000", "70,000", "90,000"] },
    { label: "Yearly Limit (Nights)", values: [20, 20, 20] },
    { label: "Medicine Cashback", values: [false, "2,000", "4,000"] },
    { label: "Doctor Consultation Cashback", values: [false, "2,000", "2,000"] },
    { label: "Diagnostic Tests Cashback (Yearly Limit)", values: [false, "1,000", "1,000"] },
    { label: "Monthly Charge (Taka)", values: [180, 340, 480] },
    { label: "90 Days Charge (Taka)", values: [435, 935, 1320] },
    { label: "180 Days Charge (Taka)", values: [875, 1750, 2635] },
    { label: "Yearly Charge (Taka)", values: [1650, 3290, 5050] },
  ],
  joint: [
    { label: "24/7 Teledoctor", values: [true, true, true] },
    { label: "Specialist Doctor", values: [true, true, true] },
    { label: "Discount at Partner Hospital", values: [true, true, true] },
    { label: "Hospitalization Cashback Limit (Yearly)", values: ["80,000", "110,000", "140,000"] },
    { label: "Monthly Charge (Taka)", values: [320, 610, 860] },
    { label: "Yearly Charge (Taka)", values: [2970, 5920, 9090] },
  ],
};

const LIFE_PRICING: Record<PlanType, PlanRow[]> = {
  single: [
    { label: "Accidental Death Cover", values: [true, true, true] },
    { label: "Natural Death Cover", values: [false, true, true] },
    { label: "Disability Cover", values: [true, true, true] },
    { label: "Sum Assured (Taka)", values: ["1,00,000", "3,00,000", "5,00,000"] },
    { label: "Monthly Charge (Taka)", values: [90, 190, 320] },
    { label: "Yearly Charge (Taka)", values: [990, 2090, 3520] },
  ],
  joint: [
    { label: "Accidental Death Cover", values: [true, true, true] },
    { label: "Sum Assured (Taka)", values: ["1,50,000", "4,00,000", "6,50,000"] },
    { label: "Monthly Charge (Taka)", values: [150, 320, 540] },
    { label: "Yearly Charge (Taka)", values: [1650, 3520, 5940] },
  ],
};

const WELLNESS_PRICING: Record<PlanType, PlanRow[]> = {
  single: [
    { label: "Diet Consultation", values: [true, true, true] },
    { label: "Fitness Plan", values: [false, true, true] },
    { label: "Mental Health Sessions (Yearly)", values: [1, 4, 8] },
    { label: "Monthly Charge (Taka)", values: [70, 150, 260] },
    { label: "Yearly Charge (Taka)", values: [770, 1650, 2860] },
  ],
  joint: [
    { label: "Diet Consultation", values: [true, true, true] },
    { label: "Mental Health Sessions (Yearly)", values: [2, 6, 12] },
    { label: "Monthly Charge (Taka)", values: [120, 260, 440] },
    { label: "Yearly Charge (Taka)", values: [1320, 2860, 4840] },
  ],
};

const MY_DOCTOR_PRICING: Record<PlanType, PlanRow[]> = {
  single: [
    { label: "Personal Doctor Access", values: [true, true, true] },
    { label: "Home Visit (Yearly)", values: [0, 2, 4] },
    { label: "Monthly Charge (Taka)", values: [250, 450, 650] },
    { label: "Yearly Charge (Taka)", values: [2750, 4950, 7150] },
  ],
  joint: [
    { label: "Personal Doctor Access", values: [true, true, true] },
    { label: "Home Visit (Yearly)", values: [0, 3, 6] },
    { label: "Monthly Charge (Taka)", values: [420, 750, 1080] },
    { label: "Yearly Charge (Taka)", values: [4620, 8250, 11880] },
  ],
};

const PRODUCT_CONTENT: Record<ProductId, ProductContent> = {
  health: {
    heading: "Shurokka Health Plan Details",
    description:
      "Get affordable, quality healthcare products that cover your entire family. Easy, auto-recurring payments enabled through your mobile phone.",
    pricing: HEALTH_PRICING,
    features: [
      {
        id: "telemedicine",
        title: "24/7 Telemedicine",
        points: [
          "Shurokka Doctors are here for you 24/7, all 365 days a year.",
          "Get a callback from our doctors in 5 minutes and easily get your prescription via app or SMS.",
          "Our qualified general physicians are all BMDC-licensed MBBS doctors.",
        ],
        image: "/features/telemedicine.jpg",
        imageAlt: "Father and daughter on a telemedicine video call",
        link: { label: "Check Our Doctors", href: "/doctors" },
      },
      {
        id: "hospital-cashback",
        title: "Hospital Cashback",
        points: [
          "Claim cashback from Shurokka after at least an overnight hospital stay.",
          "Access hospitalization medical care from any registered hospital across Bangladesh.",
        ],
        image: "/features/hospital-cashback.jpg",
        imageAlt: "Patient resting in a hospital bed",
      },
      {
        id: "partner-discount",
        title: "10-50% Discount at Partner Hospitals",
        points: [
          "Get discounts at 500+ partner hospitals across all 64 districts in Bangladesh.",
          "Discounts range from a minimum of 10% up to 50% on diagnostics and hospitalization.",
        ],
        image: "/features/partner-hospitals.jpg",
        imageAlt: "Grid of partner hospital logos",
        link: { label: "See Full List of Partners", href: "/partners" },
      },
      {
        id: "specialist-doctors",
        title: "Specialist Doctors",
        points: [
          "Unlimited teleconsultation access to Gynecologist, Pediatrician, Psychologist, Nutritionist.",
          "Request a complementary consultation and get a customized diet chart.",
        ],
        image: "/features/specialist-doctors.jpg",
        imageAlt: "Team of specialist doctors",
      },
    ],
  },
  life: {
    heading: "Shurokka Life Plan Details",
    description:
      "Financial protection for your family in case of accidental or natural death, with simple mobile-based premiums.",
    pricing: LIFE_PRICING,
    features: [
      {
        id: "accidental-cover",
        title: "Accidental Death & Disability Cover",
        points: [
          "Lump-sum payout to your nominee in case of accidental death.",
          "Additional cover for permanent disability from an accident.",
        ],
        image: "/features/life-accidental.jpg",
        imageAlt: "Family reviewing life insurance documents",
      },
      {
        id: "easy-claims",
        title: "Simple, Fast Claims",
        points: [
          "Digital claim submission through the Shurokka app.",
          "Dedicated support team to guide your nominee through the process.",
        ],
        image: "/features/life-claims.jpg",
        imageAlt: "Support agent assisting with a claim",
      },
    ],
  },
  wellness: {
    heading: "Shurokka Wellness Plan Details",
    description:
      "Stay on top of your physical and mental health with diet, fitness, and counseling support built for daily life.",
    pricing: WELLNESS_PRICING,
    features: [
      {
        id: "diet-plan",
        title: "Personalized Diet Plans",
        points: [
          "Customized diet charts from certified nutritionists.",
          "Ongoing check-ins to adjust your plan as you progress.",
        ],
        image: "/features/wellness-diet.jpg",
        imageAlt: "Nutritionist preparing a diet chart",
      },
      {
        id: "mental-health",
        title: "Mental Health Sessions",
        points: [
          "Confidential teleconsultation with licensed psychologists.",
          "Flexible scheduling around your day.",
        ],
        image: "/features/wellness-mental-health.jpg",
        imageAlt: "Person on a mental health video call",
      },
    ],
  },
  "my-doctor": {
    heading: "My Doctor Plan Details",
    description:
      "A dedicated personal doctor for your family, available on call with optional home visits.",
    pricing: MY_DOCTOR_PRICING,
    features: [
      {
        id: "personal-doctor",
        title: "One Dedicated Doctor",
        points: [
          "The same doctor gets to know your family's health history.",
          "Priority scheduling for consultations.",
        ],
        image: "/features/my-doctor-personal.jpg",
        imageAlt: "Doctor speaking with a family",
      },
      {
        id: "home-visit",
        title: "Home Visits",
        points: [
          "Scheduled home visits included on Gold and Platinum tiers.",
          "Ideal for elderly family members or young children.",
        ],
        image: "/features/my-doctor-home-visit.jpg",
        imageAlt: "Doctor visiting a patient at home",
      },
    ],
  },
};

/* ------------------------------ Cell ------------------------------ */

function Cell({ value }: { value: boolean | number | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/30">
        <Check className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
      </span>
    ) : (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <X className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
      </span>
    );
  }
  return <span>{value}</span>;
}

/* --------------------------- Feature row --------------------------- */

function FeatureRow({
  feature,
  reverse,
  index,
}: {
  feature: Feature;
  reverse: boolean;
  index: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16",
        reverse && "lg:[direction:rtl]"
      )}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-lg ring-1 ring-black/5 dark:bg-slate-900 lg:[direction:ltr]">
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/features/fallback.jpg";
          }}
        />
      </div>
      <div className="lg:[direction:ltr]">
        <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-teal-600 dark:text-teal-400">
          {String(index + 1).padStart(2, "0")} · Feature
        </span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          {feature.title}
        </h3>
        <ul className="mt-5 space-y-3">
          {feature.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
              <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {point}
              </span>
            </li>
          ))}
        </ul>
        {feature.link && (
          <Link
            href={feature.link.href}
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600"
          >
            {feature.link.label}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Main ------------------------------ */

export default function ProductShowcase() {
  const [product, setProduct] = useState<ProductId>("health");
  const [planType, setPlanType] = useState<PlanType>("single");
  const [fade, setFade] = useState(true);
  const firstRender = useRef(true);

  const content = PRODUCT_CONTENT[product];
  const rows = content.pricing[planType];

  // Fade content out/in whenever the active product changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setFade(false);
    const timer = setTimeout(() => setFade(true), 150);
    return () => clearTimeout(timer);
  }, [product]);

  const selectProduct = (id: ProductId) => {
    if (id === product) return;
    setProduct(id);
    setPlanType("single"); // reset plan type when switching product
  };

  return (
    <div>
      {/* Product tabs */}
      <section className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Choose a product
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
          Make your life easier and healthy with family-focused products
        </p>

        <div className="mt-8 inline-flex flex-wrap justify-center gap-2 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-900">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            const active = product === p.id;
            return (
              <button
                key={p.id}
                onClick={() => selectProduct(p.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                  active
                    ? "bg-teal-700 text-white shadow-md shadow-teal-900/10"
                    : "text-slate-600 hover:bg-white hover:text-teal-700 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "text-white" : "text-teal-600 dark:text-teal-400")} />
                {p.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Content that swaps with the product tab */}
      <div
        className={cn(
          "transition-all duration-200 ease-out",
          fade ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        )}
      >
        {/* Feature sections */}
        <section className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 lg:px-8 lg:space-y-24">
          {content.features.map((feature, i) => (
            <FeatureRow key={feature.id} feature={feature} reverse={i % 2 === 1} index={i} />
          ))}
        </section>

        {/* Pricing table */}
        <section className="bg-slate-50 py-16 dark:bg-slate-950">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {content.heading}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              {content.description}
            </p>

            {/* Plan type selector */}
            <div className="relative mt-8 inline-flex rounded-full bg-white p-1.5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              {PLAN_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPlanType(type.id)}
                  className={cn(
                    "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
                    planType === type.id
                      ? "bg-teal-700 text-white"
                      : "text-slate-600 hover:text-teal-700 dark:text-slate-300"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="mt-10 overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full min-w-160 border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b dark:border-slate-800">
                      <th className="px-5 py-4 font-semibold text-slate-500 dark:text-slate-400">
                        Plan
                      </th>
                      {TIERS.map((tier, i) => (
                        <th
                          key={tier}
                          className={cn(
                            "relative px-5 py-4 text-center font-semibold",
                            i === RECOMMENDED_TIER_INDEX
                              ? "text-teal-700 dark:text-teal-300"
                              : "text-slate-600 dark:text-slate-300"
                          )}
                        >
                          {i === RECOMMENDED_TIER_INDEX && (
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-orange-500">
                              Most popular
                            </span>
                          )}
                          {tier}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={cn(
                          "border-b last:border-0 dark:border-slate-800",
                          i % 2 === 1 && "bg-slate-50/60 dark:bg-slate-800/30"
                        )}
                      >
                        <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                          {row.label}
                        </td>
                        {row.values.map((v, idx) => (
                          <td
                            key={idx}
                            className={cn(
                              "px-5 py-3.5 text-center text-slate-700 dark:text-slate-300",
                              idx === RECOMMENDED_TIER_INDEX && "bg-teal-50/40 dark:bg-teal-900/10"
                            )}
                          >
                            <Cell value={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className="px-5 py-5" />
                      {TIERS.map((tier, i) => (
                        <td
                          key={tier}
                          className={cn(
                            "px-5 py-5 text-center",
                            i === RECOMMENDED_TIER_INDEX && "bg-teal-50/40 dark:bg-teal-900/10"
                          )}
                        >
                          <Button
                            className={cn(
                              i === RECOMMENDED_TIER_INDEX
                                ? "bg-teal-700 shadow-md shadow-teal-900/20 hover:bg-teal-800"
                                : "bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"
                            )}
                          >
                            Know More
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 sm:hidden">
              Swipe sideways to compare all tiers →
            </p>
          </div>
        </section>

        {/* Terms banner */}
        <section className="border-y bg-slate-100 py-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              Terms &amp; Conditions: {content.heading.replace(" Plan Details", "")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              At Shurokka, we value transparency and trust. Please take a moment
              to read our terms and conditions to understand our commitment to
              providing reliable service.
            </p>
            <Button className="mt-6 bg-teal-700 hover:bg-teal-800">
              <Link href="/terms">Read Our Terms</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}