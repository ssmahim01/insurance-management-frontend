"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Ban,
  Brain,
  ChevronDown,
  HeartPulse,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ExclusionCategory {
  id: string;
  code: string;
  title: string;
  icon: React.ElementType;
  items: string[];
}

const exclusionsData: ExclusionCategory[] = [
  {
    id: "pre-existing",
    code: "01",
    title: "Pre-Existing & Chronic Conditions",
    icon: HeartPulse,
    items: [
      "Pre-existing diseases diagnosed before the policy start date.",
      "Malignant cancer, chemotherapy, radiotherapy, immunotherapy, and dialysis.",
      "HIV/AIDS and HIV-related illnesses.",
      "Tuberculosis (non-surgical care).",
      "Hepatitis B & C.",
      "Lupus, autoimmune, and connective tissue disorders.",
    ],
  },
  {
    id: "self-inflicted",
    code: "02",
    title: "Self-Inflicted, Illegal & High-Risk Activities",
    icon: AlertTriangle,
    items: [
      "Suicide, attempted suicide, or self-inflicted injuries.",
      "Injuries or death resulting from unlawful acts, assault, or felony.",
      "Accidents while engaging in unlawful activities (e.g., driving without a valid licence).",
      "Participation in dangerous or extreme sports such as racing, paragliding, bungee jumping, parachuting, and scuba diving.",
    ],
  },
  {
    id: "cosmetic",
    code: "03",
    title: "Cosmetic, Lifestyle & Non-Medical Treatments",
    icon: Sparkles,
    items: [
      "Cosmetic or plastic surgery (unless required for reconstruction after an accident or burns).",
      "Beautification procedures and alopecia treatment.",
      "Dental, eye, and ear treatments, including LASIK surgery, routine examinations, eyeglasses, intra-ocular lenses, and contact lenses (unless included in a dental & optical package).",
      "Obesity treatments, slimming programmes, rejuvenation therapies, and thermal baths.",
      "Circumcision (unless required due to an accident).",
    ],
  },
  {
    id: "preventive",
    code: "04",
    title: "Preventive & Non-Medically Necessary Procedures",
    icon: Stethoscope,
    items: [
      "Vaccinations, prophylactic and immunization procedures, and donor-related expenses.",
      "Self-referred health check-ups, routine health screenings, and diagnostic tests without a doctor's advice.",
      "Vitamin tests and treatment for sleep disorders (including insomnia, sleep apnoea, and snoring).",
    ],
  },
  {
    id: "alternative",
    code: "05",
    title: "Alternative & Experimental Therapies",
    icon: Syringe,
    items: [
      "Experimental or non-standard medical procedures.",
      "Alternative treatments, including acupuncture.",
      "Vitamins, calcium, folic acid, minerals, nutrients, biotin, and other supplements.",
      "Disinfectant products such as Hexisol and Savlon.",
      "Herbal, Ayurvedic, Homeopathy, and similar therapies.",
    ],
  },
  {
    id: "mental",
    code: "06",
    title: "Mental Health & Addiction",
    icon: Brain,
    items: [
      "Mental, emotional, or psychiatric disorders.",
      "Alcoholism, drug use, or narcotic addiction.",
    ],
  },
  {
    id: "prosthetics",
    code: "07",
    title: "Prosthetics & Medical Devices",
    icon: Activity,
    items: [
      "Artificial limbs, prostheses, corrective or supportive devices (unless medically required due to an accident or injury).",
      "Hearing aids.",
    ],
  },
];

const TOTAL_ITEMS = exclusionsData.reduce((sum, c) => sum + c.items.length, 0);

interface InnerBannerProps {
  title?: string;
  description?: string;
}

function InnerBanner({
  title = "Terms & Conditions & Product Policy",
  description = "Please read these terms and conditions carefully before using our healthcare plans, policy coverage, and related services.",
}: InnerBannerProps) {
  return (
    <div className="relative w-full overflow-hidden border-b border-border bg-linear-to-b from-muted/50 via-background to-background py-12 sm:py-16">
      <div className="max-w-5xl mx-auto text-center px-4 space-y-5">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProductExclusions() {
  const [openItems, setOpenItems] = useState<string[]>(["pre-existing"]);

  return (
    <section className="w-full max-w-7xl mx-auto pb-5 sm:px-5">
      {/* Banner Section */}
      <InnerBanner />

      {/* Header Section */}
      <div className="flex items-center justify-between gap-3 mt-8 mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive dark:bg-destructive/20">
            <Ban className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Product Exclusions
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              The following conditions, treatments, expenses, and events are not covered under this plan.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="secondary" className="font-normal">
            {exclusionsData.length} categories
          </Badge>
          <Badge variant="secondary" className="font-normal">
            {TOTAL_ITEMS} exclusions
          </Badge>
        </div>
      </div>

      {/* Accordion List */}
      <Card className="border-border">
        <CardContent className="p-0">
          <Accordion
            value={openItems}
            onValueChange={setOpenItems}
            className="w-full"
          >
            {exclusionsData.map((category, idx) => {
              const Icon = category.icon;
              return (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className={idx === exclusionsData.length - 1 ? "border-b-0" : ""}
                >
                  <AccordionTrigger className="px-4 sm:px-5 py-4 sm:py-5 hover:no-underline hover:bg-muted/50 group">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-muted text-muted-foreground shrink-0">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex items-baseline gap-2.5 text-left">
                        <span className="text-base sm:text-lg font-semibold text-foreground">
                          {category.title}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-5 pb-5">
                    <Separator className="mb-4" />
                    <ul className="space-y-2.5 pl-11">
                      {category.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-destructive/70 dark:bg-destructive mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground mt-4 px-1">
        Items above are excluded unless a specific policy rider or endorsement states otherwise.
      </p>
    </section>
  );
}