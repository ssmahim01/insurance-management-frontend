"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { toast } from "sonner";
import { useCreateContactMutation } from "@/redux/features/contact/contact.api";
import { siteConfig } from "@/lib/sideConfig";
import Image from "next/image";




const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),

  phone: z
    .string()
    .trim()
    .min(11, "Phone number is required")
    .regex(/^[0-9+\-\s()]{11,}$/, "Enter a valid phone number"),

  email: z
    .string()
    .trim()
    .regex(emailRegex, "Enter a valid email address"),

  subject: z.string().trim().optional(),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// function ContactMiniHero() {
//   return (
//     <section className="relative overflow-hidden border-b border-black/5 bg-linear-to-b from-emerald-50 to-white dark:border-white/5 dark:from-emerald-950/20 dark:to-[#0B1220]">
//       {/* subtle accent shape */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-2xl dark:bg-emerald-500/10"
//       />

//       <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
//         {/* breadcrumb */}
//         <nav aria-label="Breadcrumb">
//           <ol className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
//             <li className="flex items-center gap-1.5">
//               <Link
//                 href="/"
//                 className="flex items-center gap-1 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
//               >
//                 <Home className="h-3.5 w-3.5" />
//                 Home
//               </Link>
//             </li>
//             <li className="flex items-center gap-1.5">
//               <ChevronRight className="h-3.5 w-3.5" />
//               <span className="font-medium text-emerald-700 dark:text-emerald-400">
//                 Contact
//               </span>
//             </li>
//           </ol>
//         </nav>

//         {/* mini hero content */}
//         <div className="mt-4 mx-auto text-center max-w-2xl">
//           <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
//             We&apos;re here to help
//           </h1>
//           <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
//             Questions about a policy, a claim, or getting started with{" "}
//             {siteConfig.name}? Reach our advisors directly or send a message
//             below — we typically reply within one business day.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
function ContactMiniHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-black/5 dark:border-white/5">
      {/* full-bleed background image */}
      <Image
        src="/assets/conact-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* readability overlay — darker in dark mode, softer gradient in light */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/80
                   dark:from-black/95 dark:via-black/65 dark:to-[#0B1220]/90"
      />

      {/* content sits above the image */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:py-20">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs text-white/70">
            <li className="flex items-center gap-1.5">
              <Link
                href="/"
                className="flex items-center gap-1 transition-colors hover:text-emerald-300"
              >
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-emerald-300">Contact</span>
            </li>
          </ol>
        </nav>

        {/* hero content */}
        <div className="mt-6 mx-auto text-center max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            We&apos;re here to help
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            Questions about a policy, a claim, or getting started with{" "}
            {siteConfig.name}? Reach our advisors directly or send a message
            below — we typically reply within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ContactForm() {
  const [createContact, { isLoading: isSubmitting }] =
    useCreateContactMutation();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState("idle");
    setErrorMessage(null);

    try {
      const res = await createContact(values).unwrap();

      if (res?.success === false) {
        toast.error(res?.message || "Something went wrong.");
      }

      toast.success(res?.message || "Message sent successfully.");
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || "Something went wrong. Please try again later.");
    }
  }

  return (
    <section className="bg-white pb-5 md:pb-16 dark:bg-[#0B1220]">
      <ContactMiniHero />
      <div className="mx-auto max-w-7xl px-5">
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <div className="">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Have a question about a policy or claim? Reach us directly or fill
              out the form and an advisor will call you back.
            </p>

            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Phone</dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {siteConfig.phone}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Email</dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {siteConfig.email}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Office</dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {siteConfig.address.street}, {siteConfig.address.city}{" "}
                  {siteConfig.address.postalCode}, Bangladesh
                </dd>
              </div>
            </dl>

            {/* Replace with an actual embedded Google Map (office coordinates) */}
            <div className="mt-6 flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-300 text-sm text-slate-400 dark:border-slate-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206.45997676361523!2d90.36015113525936!3d23.806818398093768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13bf1b25cd9%3A0x337ad20eaa1a2578!2sBachelor%20corner!5e1!3m2!1sen!2sbd!4v1784112169335!5m2!1sen!2sbd"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-5 rounded-2xl border border-black/10 bg-[#F9FAFB] p-8 dark:border-white/10 dark:bg-slate-900/40"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <Input
                  placeholder="Enter your full name"
                  {...register("name")}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <Input
                    type="tel"
                    placeholder="+88 01XXXXXXXXX"
                    {...register("phone")}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>

                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>

                <Input
                  placeholder="What's this about?"
                  {...register("subject")}
                />

                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message <span className="text-red-500">*</span>
                </label>

                <Textarea
                  rows={5}
                  placeholder="Tell us how we can help"
                  {...register("message")}
                />

                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitState === "success" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Message sent. We&apos;ll get back to you soon.
                </p>
              )}

              {submitState === "error" && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-emerald-600 py-5 text-sm font-bold text-white hover:bg-emerald-700"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}