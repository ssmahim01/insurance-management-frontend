"use client";

import { useState, FormEvent } from "react";

const productOptions = ["Life", "Health", "Assets", "Employee Health Benefits", "Others"];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  products: string[];
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  designation: "",
  products: [],
  message: "",
};

export default function B2BSolutionsForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleProduct(product: string) {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (!form.organization.trim()) next.organization = "Organization is required";
    if (!form.designation.trim()) next.designation = "Designation is required";
    if (form.products.length === 0) next.products = "Select at least one product";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // TODO: send `form` to your API route / CRM here.
    console.log("Business inquiry submitted:", form);
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500";

  const labelClass =
    "text-sm font-semibold text-[#111827] dark:text-slate-200";

  return (
    <section className="bg-white py-16 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-xl px-4">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] dark:text-white">
            Business Solutions
          </h2>
          <p className="mt-1 text-sm text-[#6B7280] dark:text-slate-400">
            Get a Quote for Your Business Insurance Needs
          </p>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40">
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              Thanks — we&apos;ve got your inquiry!
            </p>
            <p className="mt-2 text-sm text-[#374151] dark:text-slate-300">
              Our business insurance team will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 space-y-6 rounded-2xl border border-black/10 bg-[#F9FAFB] p-8 dark:border-white/10 dark:bg-slate-900/40"
          >
            {/* Full name */}
            <div>
              <label className={labelClass}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Enter your full name"
                className={`mt-1.5 ${inputClass}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email / Phone */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Enter your email address"
                  className={`mt-1.5 ${inputClass}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className={`mt-1.5 ${inputClass}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Organization / Designation */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="Enter your organization name"
                  className={`mt-1.5 ${inputClass}`}
                />
                {errors.organization && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.organization}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.designation}
                  onChange={(e) => update("designation", e.target.value)}
                  placeholder="Enter your job title"
                  className={`mt-1.5 ${inputClass}`}
                />
                {errors.designation && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.designation}
                  </p>
                )}
              </div>
            </div>

            {/* Products of interest */}
            <div>
              <label className={labelClass}>
                Products of Interest <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {productOptions.map((product) => (
                  <label
                    key={product}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-[#111827] transition-colors hover:border-emerald-400 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <input
                      type="checkbox"
                      checked={form.products.includes(product)}
                      onChange={() => toggleProduct(product)}
                      className="h-4 w-4 rounded border-black/20 text-emerald-600 focus:ring-emerald-500"
                    />
                    {product}
                  </label>
                ))}
              </div>
              {errors.products && (
                <p className="mt-1 text-xs text-red-500">{errors.products}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Please describe your business needs and requirements"
                rows={4}
                className={`mt-1.5 resize-y ${inputClass}`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
            >
              Submit Inquiry
            </button>
          </form>
        )}
      </div>
    </section>
  );
}