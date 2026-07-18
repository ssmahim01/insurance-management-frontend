import { Button } from '@/components/ui/button'
import React from 'react'

export default function FindPlanSection() {
  return (
    <section className="relative overflow-hidden bg-[#EFF4FA] dark:bg-[#0B2E52]">
      {/* signature: concentric protection rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-150 w-150 -translate-x-1/2 -translate-y-1/3 rounded-full
                   bg-[radial-gradient(circle,rgba(15,70,124,0.08)_0%,transparent_70%)]
                   dark:bg-[radial-gradient(circle,rgba(240,169,58,0.12)_0%,transparent_70%)]"
      />

      <div className="relative w-full max-w-7xl mx-auto px-5 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#0F467C] dark:text-[#F0A93A] mb-3">
            Plans for every stage of life
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B2E52] dark:text-white">
            Find the Right Plan for You
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3E5876] dark:text-[#B7C9DE]">
            Whether you&rsquo;re protecting yourself, your spouse, or your entire family,
            Surokkha has a plan designed to match your healthcare needs and financial goals.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              className="cursor-pointer px-6 py-5 rounded-full border-2 border-[#0F467C] text-[#0F467C] hover:bg-[#0F467C] hover:text-white
                         dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#0B2E52]
                         transition-colors font-medium text-lg"
            >
              Compare Plans
            </Button>

            <Button
              className="cursor-pointer px-6 py-5 rounded-full btn-bg text-lg
                         font-semibold transition-colors"
            >
              Get Protected Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}