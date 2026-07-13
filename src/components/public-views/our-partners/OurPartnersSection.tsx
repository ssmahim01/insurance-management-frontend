"use client";

const PAGE_BG = "#FAF7F1";

export default function OurPartnersSection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* faint district-map dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0B1F3A 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-xl text-center">
          <p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B08828]"
            style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
          >
            Coverage · 64 districts, Bangladesh
          </p>
          <h2
            className="text-[2.75rem] font-bold leading-[1.05] tracking-tight text-[#0B1F3A] sm:text-5xl"
            style={{
              fontFamily:
                "var(--font-display, 'Space Grotesk', ui-sans-serif, sans-serif)",
            }}
          >
            Our Partners
          </h2>
          <p
            className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[#5B6472]"
            style={{ fontFamily: "var(--font-body, ui-sans-serif, sans-serif)" }}
          >
            With a Milvik subscription, unlock savings and cashless care at
            500+ hospitals and pharmacies nationwide.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* ---- Discount Partner : torn coupon ---- */}
          <div
            className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-[22px] p-7 shadow-[0_18px_40px_-18px_rgba(176,136,40,0.55)] transition-transform duration-300 hover:-translate-y-1.5"
            style={{
              background: "linear-gradient(155deg, #FBE39A 0%, #EFB84C 100%)",
            }}
          >
            {/* perforation strip */}
            <div className="absolute bottom-0 right-14 top-0 w-0 border-r-2 border-dashed border-[#0B1F3A]/15" />
            <div className="absolute bottom-3 right-13 top-3 flex w-0 flex-col items-center justify-between">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: PAGE_BG }}
                />
              ))}
            </div>

            <div className="flex items-start justify-between pr-10">
              <div className="flex h-11 w-11 -rotate-6 items-center justify-center rounded-xl bg-white shadow-sm">
                <span className="text-lg font-bold text-[#B08828]">%</span>
              </div>
              <span
                className="rounded-full bg-white/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#7A5F16]"
                style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
              >
                Save more
              </span>
            </div>

            <div className="pr-10">
              <h3
                className="text-xl font-bold text-[#0B1F3A]"
                style={{
                  fontFamily:
                    "var(--font-display, 'Space Grotesk', ui-sans-serif, sans-serif)",
                }}
              >
                Discount Partner
              </h3>
              <p
                className="mt-1 text-[12px] tracking-wide text-[#7A5F16]"
                style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
              >
                10–50% OFF · 500+ locations
              </p>
            </div>

            {/* stub label */}
            <span
              className="absolute bottom-6 right-3 rotate-90 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7A5F16]/70"
              style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
            >
              Coupon
            </span>
          </div>

          {/* ---- Cashless Partner : payment card ---- */}
          <div
            className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-[22px] p-7 shadow-[0_18px_40px_-18px_rgba(11,31,58,0.55)] transition-transform duration-300 hover:-translate-y-1.5"
            style={{
              background: "linear-gradient(155deg, #16304F 0%, #0B1F3A 100%)",
            }}
          >
            {/* brushed texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)",
              }}
            />

            <div className="flex items-start justify-between">
              {/* chip */}
              <div className="h-8 w-10 rounded-md bg-linear-to-br from-[#E9D28A] to-[#C9A94D] p-1">
                <div className="h-full w-full rounded-[3px] border border-[#0B1F3A]/30" />
              </div>
              {/* contactless waves */}
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M6 19C6 12 11 7 18 7"
                  stroke="#7FDCCB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  d="M9 16C9 11.5 12.5 8 17 8"
                  stroke="#7FDCCB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <path
                  d="M12 13.5C12 11 13.8 9 16.3 9"
                  stroke="#7FDCCB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </div>

            <div>
              <h3
                className="text-xl font-bold text-white"
                style={{
                  fontFamily:
                    "var(--font-display, 'Space Grotesk', ui-sans-serif, sans-serif)",
                }}
              >
                Cashless Partner
              </h3>
              <p
                className="mt-1 text-[12px] tracking-[0.15em] text-[#7FDCCB]"
                style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
              >
                •••• •••• •••• MILVIK
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}