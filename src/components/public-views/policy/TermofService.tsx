/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  ShieldCheck,
  Users,
  Clock,
  Wallet,
  Gauge,
  FileWarning,
  Stethoscope,
  Award,
  Info,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


type Clause = { label?: string; text: string };
type Section = { id: string; title: string; icon: React.ElementType; clauses: Clause[] };
type Plan = {
  id: string;
  name: string;
  tagline: string;
  underwriter?: string;
  sections: Section[];
};

const plans: Plan[] = [
  {
    id: "health",
    name: "Milvik Health",
    tagline: "Hospitalization & outpatient cashback cover",
    underwriter: "Meghna Life Insurance Limited",
    sections: [
      {
        id: "eligibility",
        title: "Eligibility",
        icon: Users,
        clauses: [
          { text: "You must be 18–64 years old at registration. Cover continues until you turn 69." },
          { text: "You can add your parents, spouse, children, and parents-in-law under a shared cover. Parents, in-laws and spouses: 18–64 at entry, covered until 69. Children: from birth up to 19, covered until they turn 21." },
          { text: "Family Plus plans: add either both parents-in-law, or 2 siblings, or 1 parent-in-law, or 1 sibling as an insured relative." },
          { text: "You'll need to agree to a health declaration when you subscribe." },
        ],
      },
      {
        id: "coverage",
        title: "Service coverage",
        icon: Stethoscope,
        clauses: [
          { text: "Tele-doctor consultation and partner discounts are available immediately after your subscription is confirmed and paid." },
          { text: "Tele-doctor consultations cover general concerns only — not emergencies or conditions needing immediate care. A doctor calls back based on your booking." },
          { label: "bKash — before 30 May 2023", text: "Accidental hospitalization is covered from the start of the next calendar month. Non-accidental hospitalization is covered 1 month after subscription confirmation." },
          { label: "bKash — on/after 30 May 2023", text: "All hospitalization and outpatient cover (monthly, 90-day, 180-day, 12-month plans) starts 1 month after confirmation." },
          { label: "Card / Nagad", text: "Accidental hospitalization is covered from the start of the next calendar month for monthly plans. Non-accidental cover, and all cover on 90/180/12-month one-time plans, starts 1 month after confirmation." },
        ],
      },
      {
        id: "waiting",
        title: "Waiting period",
        icon: Clock,
        clauses: [
          { text: "Pre-existing conditions are covered after 6 months. Pregnancy and childbirth are covered after 12 months." },
          { text: "Monthly plans: missing 3+ consecutive payments resets the pre-existing and maternity waiting periods once payment resumes." },
          { text: "90-day / 180-day / yearly plans: missing any cycle's payment resets those same waiting periods; they resume after the next cycle is paid." },
        ],
      },
      {
        id: "claims",
        title: "Claims",
        icon: FileWarning,
        clauses: [
          { text: "Not covered: hospitalization from war, civil unrest, riot, rebellion, coup, self-inflicted injury, or attempted suicide." },
          { text: "Not covered: hospitalization or OPD care for congenital diseases." },
          { text: "Maximum 10 nights per hospitalization, per claim." },
          { text: "OPD cashback (doctor visits, diagnostics, medicine) requires a referral from MILVIK's internal doctors via mHealth, plus the service fee receipt." },
          { text: "No cashback for laser treatment, cosmetic surgery (unless accidental), or dental and eye treatment." },
          { text: "Notify MILVIK of a hospital cashback claim within 90 days of admission." },
          { text: "One claim per event, from one plan only. If you're covered under multiple plans, the plan with the highest coverage applies." },
        ],
      },
      {
        id: "payment",
        title: "Payment mechanism",
        icon: Wallet,
        clauses: [
          { label: "bKash, before 30 May 2023", text: "Monthly charge on a fixed date; retried every 3 days if unpaid." },
          { label: "bKash, on/after 30 May 2023", text: "Monthly charge on a fixed date; retried every 5 days, up to 6 attempts total." },
          { label: "bKash, 90/180/12-month plans", text: "Charged once per cycle; retried every 5 days, up to 6 attempts total." },
          { label: "Card, monthly", text: "4 extra attempts within 30 days if the first attempt fails." },
          { text: "After all attempts fail, a one-time payment link is sent by SMS and in-app notification, or available by calling customer care." },
          { text: "No successful deduction in a billing cycle means no coverage for the next cycle." },
          { text: "One-time plans (90/180/12-month) are paid via a link (card, Nagad, Rocket)." },
          { text: "Renewal windows open 75 days in (90-day plan), 150 days in (180-day plan), or 320 days in (yearly plan)." },
          { text: "Renew within the first 15 / 30 / 45 days of the window (matching each plan) for continuous coverage with no gap; later renewals restart coverage 1 month out, and renewals more than 15 days after coverage ends reset the waiting period." },
        ],
      },
      {
        id: "healthpoints",
        title: "HealthPoints program",
        icon: Award,
        clauses: [
          { text: "Monthly plans: points post instantly but unlock only after that month's payment is made." },
          { text: "90/180/yearly plans: points accrue in equal installments across the term and are usable as soon as they're earned." },
          { text: "You must be Active to use HealthPoints or receive cashback against them." },
          { text: "An item reimbursed via HealthPoints can't also be claimed under another benefit category." },
          { text: "MILVIK sets point allocation, minimum/maximum eligible transaction amounts, and the earning/claiming methodology at its sole discretion, and may change, pause, or end the program anytime without notice." },
          { text: "Suspicious activity or system abuse is investigated and may result in being barred from MILVIK services, with law enforcement involved where warranted." },
        ],
      },
    ],
  },
  {
    id: "life",
    name: "Milvik Life & Disability",
    tagline: "Death & disability protection",
    underwriter: "Pragati Life Insurance Limited",
    sections: [
      {
        id: "eligibility",
        title: "Eligibility",
        icon: Users,
        clauses: [
          { text: "Register between 18–58 years old; cover continues until age 60." },
          { text: "Eligible relations for a nominee or joint-policy insured: father, mother, spouse, siblings, children, or parents-in-law." },
          { text: "Spouse and siblings: entry 18–58, covered until 60. Parents and parents-in-law: entry 18–63, covered until 65. Children: from birth up to 19, covered until 21." },
          { text: "A health declaration confirming no critical illness (cancer, heart attack/cardiovascular disease, stroke with permanent symptoms, organ failure, or other terminal illness) is required at registration." },
        ],
      },
      {
        id: "coverage",
        title: "Service coverage",
        icon: Stethoscope,
        clauses: [
          { label: "bKash — before 30 May 2023", text: "Accidental death/disability cover starts the 1st of the next calendar month after the first successful payment." },
          { label: "bKash — on/after 30 May 2023", text: "Cover starts 1 month after confirmation for monthly, 90-day, 180-day, and 12-month plans." },
          { label: "Card / Nagad", text: "Accidental cover starts the 1st of the next calendar month. Natural death/disability can't be claimed in the first 3 months of registration. One-time 90/180/12-month plans: accidental cover starts 1 month after confirmation, and natural death/disability still excluded for the first 3 months." },
        ],
      },
      {
        id: "waiting",
        title: "Waiting period",
        icon: Clock,
        clauses: [
          { text: "All added lives, including newborns, follow the policy's waiting periods." },
          { text: "Natural death and disability can't be claimed in the first 3 months." },
          { text: "Death or disability from a pre-existing disease isn't covered within the first 6 months." },
          { text: "Monthly plans: 3+ consecutive missed payments resets pre-existing/maternity waiting periods on resumption. 90/180/yearly plans: any missed cycle does the same, resuming after the next cycle's payment." },
        ],
      },
      {
        id: "claims",
        title: "Claims",
        icon: FileWarning,
        clauses: [
          { label: "100% disability payout", text: "Loss of two limbs/both hands or all fingers and thumbs, total paralysis or permanent bedridden state, total insanity, total loss of sight in both eyes, total loss of hearing or speech, or 3rd-degree burns over 20% of the body or face." },
          { label: "50% disability payout", text: "Loss of one limb or four fingers and thumb on one hand, total loss of sight in one eye, total loss of hearing in one ear, 3rd-degree burns over 9% of the body or face, or partial paralysis." },
          { text: "After a 50% claim, only 50% of the remaining disability cover can be claimed next. Once 100% is claimed, no further disability claims apply to that person." },
          { text: "Not covered: death/disability from war and civil unrest, suicide or voluntary injury, nuclear/biological/chemical risks, or pre-existing cancer, stroke, cardiovascular disease, or organ failure." },
          { text: "Nominees must claim within 90 days of death." },
          { text: "Disability claims and documentation are due within 180 days of the disability, and in any case within 18 months of the incident." },
          { text: "A death certificate is required for any life insurance claim." },
          { text: "One claim per event, from one plan only — the highest-coverage plan applies if you hold more than one." },
        ],
      },
      {
        id: "payment",
        title: "Payment mechanism",
        icon: Wallet,
        clauses: [
          { label: "bKash, before 30 May 2023", text: "Monthly charge on a fixed date; retried every 3 days if unpaid." },
          { label: "bKash, on/after 30 May 2023", text: "Monthly charge on a fixed date; retried every 5 days, up to 6 attempts. 90/180/12-month plans follow the same 5-day, 6-attempt pattern; daily plans get one attempt per day." },
          { label: "Card, monthly", text: "4 extra attempts within 30 days if the first fails; daily plans get 5 attempts per day." },
          { text: "After all attempts fail, a one-time payment link is sent by SMS/in-app notice or available via customer care." },
          { text: "Monthly plans: a failed billing month means no coverage the next month. Daily plans: next month's coverage is prorated to days actually paid." },
          { text: "Renewal windows open 75 days in (90-day plan), 150 days in (180-day plan), or 320 days in (yearly plan)." },
          { text: "Renew within the first 15 / 30 / 45 days of the window for continuous coverage; later renewals restart 1 month out, and renewals over 15 days after coverage ends reset the waiting period." },
        ],
      },
    ],
  },
  {
    id: "wellness",
    name: "Milvik Wellness Plan",
    tagline: "Cashless network hospitalization & wellness",
    underwriter: "Pragati Life Insurance Limited",
    sections: [
      {
        id: "eligibility",
        title: "Eligibility",
        icon: Users,
        clauses: [
          { text: "Register between 18–64 years old; cover continues until age 69." },
          { text: "Add parents, spouse, children, and siblings under shared cover. Parents and spouse: 18–64 at entry, covered until 69. Children: birth to 21, covered until 25. Siblings: 18–24 at entry, covered until 25." },
          { text: "A health declaration is required at subscription." },
        ],
      },
      {
        id: "coverage",
        title: "Service coverage",
        icon: Stethoscope,
        clauses: [
          { text: "Tele-doctor consultation and partner discounts start immediately after confirmed payment; consultations cover general concerns only, with call-backs based on booking." },
          { text: "Cashless support at MILVIK's partner diagnostics centers, external doctors, and pharmacies, when prescribed by a MILVIK doctor." },
          { text: "Cashless inpatient treatment within MILVIK's partner hospital network, when prescribed and approved by a MILVIK doctor." },
          { text: "Life coverage payable on the policyholder's accidental or natural death." },
          { text: "10–50% discounts across 500+ partner providers for radiology, pathology, doctor fees, and hospital beds." },
          { text: "A 20% subscription fee reimbursement for 12 consecutive monthly payments made without filing a claim." },
        ],
      },
      {
        id: "waiting",
        title: "Waiting period",
        icon: Clock,
        clauses: [
          { text: "No waiting period for the Milvik Doctor service." },
          { text: "1 month before hospitalization and non-hospitalization benefits (medication, referrals, lab tests) become available." },
          { text: "12 months for inpatient hospitalization due to pregnancy, childbirth, or pre-existing disease." },
          { text: "180-day and yearly plans: not renewing within 15 days of the coverage period ending resets the waiting periods." },
        ],
      },
      {
        id: "limits",
        title: "Coverage limits",
        icon: Gauge,
        clauses: [
          { text: "12-month plans: full annual hospitalization coverage from the start of the coverage period (1 month after subscription)." },
          { text: "6-month plans: 50% of the annual hospitalization coverage from the start of the coverage period." },
          { text: "Monthly plans: coverage is prorated — payments made divided by payments expected in the year, times the annual limit." },
          { text: "Milvik Care benefits: up to 25% of the annual limit can be redeemed per month, until the annual limit is used up." },
        ],
      },
      {
        id: "claims",
        title: "Claims",
        icon: FileWarning,
        clauses: [
          { text: "No coverage for congenital diseases, or for pregnancy/childbirth or pre-existing disease hospitalization in the first 12 months." },
          { text: "No coverage for treatment without a prior MILVIK doctor referral, or treatment outside the cashless partner network." },
          { text: "No coverage for laser treatment, cosmetic surgery (unless accidental), dental or eye treatment, circumcision, or prophylactic/immunization procedures." },
          { text: "No coverage for voluntary abortion and related care." },
          { text: "No coverage for war/civil unrest, nuclear/biological/chemical risks, suicide or self-inflicted injury, injury during unlawful activity, mental/emotional/psychiatric disorders, alcohol or drug abuse, AIDS-related issues, or STDs." },
          { text: "One claim per event, from one plan only — the highest-coverage plan applies if you hold more than one." },
        ],
      },
      {
        id: "payment",
        title: "Payment mechanism",
        icon: Wallet,
        clauses: [
          { label: "bKash, monthly", text: "Charged on a fixed date each month." },
          { label: "bKash, 180-day / yearly", text: "5 retry attempts every 5 days if the first fails (6 attempts total)." },
          { text: "Monthly card recurring payment is available with select banks only; 4 extra attempts within 30 days if the first fails." },
          { text: "One-time 180-day and yearly plans are paid via a link (card, Nagad, Rocket, Upay), charged immediately on confirmation." },
          { text: "After all attempts fail, a one-time payment link is sent by SMS/in-app notice or available via customer care on 09610500599." },
          { text: "Renewal windows open 60 days before the period ends (180-day plan) or 75 days before (yearly plan). Renew at least 30 days before the period ends for continuous coverage." },
          { text: "Renewing under 30 days before the end delays the next period's start; renewing more than 15 days after the period has ended resets the waiting periods." },
        ],
      },
    ],
  },
  {
    id: "mydoctor",
    name: "Milvik My Doctor",
    tagline: "24/7 tele-consultation membership",
    sections: [
      {
        id: "eligibility",
        title: "Eligibility",
        icon: Users,
        clauses: [
          { text: "Must be 18 or older at registration." },
          { text: "Any relative can be added as an insured relative under shared cover — adults from 18, children from birth." },
        ],
      },
      {
        id: "coverage",
        title: "Service coverage",
        icon: Stethoscope,
        clauses: [
          { text: "Unlimited audio/video consultations with a general physician, 24/7. A doctor calls back within 30 minutes of a request via the app or the helpline (09610500599)." },
          { text: "On-demand specialist care — gynaecologist, nutritionist, psychologist, paediatrician — by appointment." },
          { text: "On-demand medicine delivery and home sample collection within the service area, paid per use." },
          { text: "10–50% discounts across 500+ partner providers for radiology, pathology, doctor fees, and hospital beds." },
          { text: "Tele-consultations cover general concerns only, not emergencies or conditions needing immediate care." },
        ],
      },
      {
        id: "waiting",
        title: "Waiting period",
        icon: Clock,
        clauses: [{ text: "None — services are available right after payment." }],
      },
      {
        id: "limits",
        title: "Coverage limits",
        icon: Gauge,
        clauses: [
          { text: "24/7 unlimited consultation applies only to the subscriber and covered members." },
          { label: "Plan variants", text: "Single Silver covers 1 person, Joint Silver covers 2, Family Silver covers 4." },
        ],
      },
      {
        id: "payment",
        title: "Payment mechanism",
        icon: Wallet,
        clauses: [
          { label: "bKash, 180-day / yearly", text: "5 retry attempts every 5 days if the first fails (6 attempts total)." },
          { text: "One-time 180-day and yearly plans are paid via a link (card, Nagad, Rocket, Upay), charged immediately on confirmation." },
          { text: "After all attempts fail, a one-time payment link is sent by SMS/in-app notice or available via customer care." },
          { text: "No successful deduction in a billing cycle means no coverage for the next cycle." },
          { text: "Renewal windows open 30 days before the period ends (180-day plan) or 45 days before (yearly plan)." },
        ],
      },
    ],
  },
];

const generalNotes = [
  "MILVIK may update the terms and conditions of any product at any time.",
  "MILVIK may determine and change the price of any plan variant at any time.",
];

/**
 * ---------------------------------------------------------------------------
 * COMPONENT
 * ---------------------------------------------------------------------------
 */
export default function MilvikTermsOfService() {
  const [activePlan, setActivePlan] = React.useState(plans[0].id);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          Terms of Service
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Milvik plan terms &amp; conditions
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
          Milvik values transparency and trust. Choose a plan below to see exactly
          how eligibility, coverage, waiting periods, claims, and payments work.
        </p>
      </div>

      {/* Plan tabs */}
      <Tabs value={activePlan} onValueChange={setActivePlan} className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4">
          {plans.map((plan) => (
            <TabsTrigger key={plan.id} value={plan.id} className="text-xs sm:text-sm">
              {plan.name.replace("Milvik ", "")}
            </TabsTrigger>
          ))}
        </TabsList>

        {plans.map((plan) => (
          <TabsContent key={plan.id} value={plan.id} className="mt-6">
            {/* Plan summary card */}
            <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">{plan.name}</h2>
                  <p className="text-sm text-slate-500">{plan.tagline}</p>
                </div>
                {plan.underwriter && (
                  <Badge variant="secondary" className="whitespace-nowrap bg-teal-100 text-teal-800 hover:bg-teal-100">
                    Underwritten by {plan.underwriter}
                  </Badge>
                )}
              </div>
            </div>

            {/* Clause accordion */}
            <Accordion defaultValue={[plan.sections[0].id]} className="w-full">
              {plan.sections.map((section) => {
                const Icon = section.icon;
                return (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="text-sm font-medium text-slate-800 hover:no-underline">
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-teal-600" />
                        {section.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pb-1 pl-6">
                        {section.clauses.map((clause, i) => (
                          <li key={i} className="relative text-sm leading-relaxed text-slate-600">
                            <span className="absolute -left-4 top-2 h-1 w-1 rounded-full bg-slate-300" />
                            {clause.label && (
                              <span className="mr-1 font-medium text-slate-800">{clause.label}:</span>
                            )}
                            {clause.text}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-8" />

      {/* General notes */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-800">
          <Info className="h-4 w-4 text-slate-400" />
          General notes
        </div>
        <ul className="space-y-1.5 pl-6">
          {generalNotes.map((note, i) => (
            <li key={i} className="relative text-sm leading-relaxed text-slate-500">
              <span className="absolute -left-4 top-2 h-1 w-1 rounded-full bg-slate-300" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}