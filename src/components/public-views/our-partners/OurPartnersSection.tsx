"use client";

import Link from "next/link";

function BarcodeRule({ className = "" }: { className?: string }) {
  const bars = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1];
  return (
    <svg
      viewBox="0 0 200 16"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
      style={{ color: "var(--line)" }}
    >
      {bars.map((w, i) => {
        const x = bars.slice(0, i).reduce((a, b) => a + b + 1.6, 0);
        return <rect key={i} x={x} y={0} width={w} height={16} fill="currentColor" />;
      })}
    </svg>
  );
}

function CardStub({
  href,
  label,
  title,
  meta,
  icon,
  align,
}: {
  href: string;
  label: string;
  title: string;
  meta: string;
  icon: React.ReactNode;
  align: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-1 flex-col justify-between gap-6 p-7 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)] sm:p-8"
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl shadow-[0_2px_6px_rgba(11,31,58,0.12)]"
          style={{ color: "var(--ink)", backgroundColor: "var(--paper)" }}
        >
          {icon}
        </div>
        <span
          className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: "color-mix(in srgb, var(--ink) 6%, transparent)",
            color: "var(--ink)",
          }}
        >
          {label}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-bold" style={{ color: "var(--ink)" }}>
          {title}
        </h3>
        <p className="mt-1 font-mono text-[12px] tracking-[0.12em]" style={{ color: "var(--gold)" }}>
          {meta}
        </p>
      </div>

      <div
        className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1 ${
          align === "right" ? "self-end" : ""
        }`}
        style={{ color: "var(--ink)" }}
      >
        Redeem benefit
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}

export default function OurPartnersSection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 [--paper:#FAF7F1] [--card:#FFFFFF] [--ink:#0B1F3A] [--muted:#5B6472] [--muted2:#8A93A3] [--gold:#B08828] [--line:rgba(11,31,58,0.16)] [--dot:#0B1F3A] dark:[--paper:#0A1220] dark:[--card:#14203A] dark:[--ink:#E8ECF3] dark:[--muted:#9CA6B8] dark:[--muted2:#7C8AA3] dark:[--gold:#E0B563] dark:[--line:rgba(255,255,255,0.16)] dark:[--dot:#6C86B8]"
      style={{ backgroundColor: "var(--paper)" }}
    >
      {/* faint district-map dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--gold)", fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
          >
            Coverage · 64 districts, Bangladesh
          </p>
          <h2
            className="text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-5xl"
            style={{
              color: "var(--ink)",
              fontFamily: "var(--font-display, 'Space Grotesk', ui-sans-serif, sans-serif)",
            }}
          >
            Our Partners
          </h2>
          <p
            className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body, ui-sans-serif, sans-serif)" }}
          >
            With a Milvik subscription, unlock savings and cashless care at
            500+ hospitals and pharmacies nationwide.
          </p>
        </div>

        {/* ---------------- Coverage card ---------------- */}
        <div
          className="relative overflow-hidden rounded-[20px] shadow-[0_24px_50px_-24px_rgba(11,31,58,0.35)] dark:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)]"
          style={{ backgroundColor: "var(--card)", border: "0.5px solid var(--line)" }}
        >
          {/* card header strip */}
          <div className="flex items-center justify-between px-7 pt-6 sm:px-8">
            <span
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--muted2)" }}
            >
              Milvik Coverage Card
            </span>
            <span
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--muted2)" }}
            >
              No. 0500 · 2026 · 0064
            </span>
          </div>

          {/* two redeemable stubs, split by a real perforation */}
          <div className="relative mt-5 flex flex-col sm:flex-row">
            <div className="relative">
              <div
                className="absolute left-0 right-0 top-0 border-t sm:hidden"
                style={{ borderStyle: "dashed", borderColor: "var(--line)" }}
              />
              <div
                className="absolute bottom-0 top-0 hidden border-l sm:block"
                style={{ borderStyle: "dashed", borderColor: "var(--line)", left: "50%" }}
              />
              <div
                className="absolute hidden h-3 w-3 -translate-x-1/2 rounded-full sm:block"
                style={{ backgroundColor: "var(--paper)", left: "50%", top: -6 }}
              />
              <div
                className="absolute hidden h-3 w-3 -translate-x-1/2 rounded-full sm:block"
                style={{ backgroundColor: "var(--paper)", left: "50%", bottom: -6 }}
              />
            </div>

            <CardStub
              href="/diagnastic"
              label="Book a test"
              title="Diagnostic"
              meta="Lab tests · Scans · 200+ centers"
              align="left"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <CardStub
              href="/pharmacy"
              label="Order now"
              title="Pharmacy"
              meta="10–50% off · 500+ locations"
              align="right"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
            />
          </div>

          {/* magnetic-stripe footer */}
          <div className="mt-2 h-3" style={{ backgroundColor: "var(--ink)" }} />
          <div className="flex items-center justify-between px-7 py-3 sm:px-8">
            <BarcodeRule className="h-3 w-32" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--muted2)" }}>
              Valid at all partner locations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}