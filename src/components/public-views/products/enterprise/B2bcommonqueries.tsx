"use client";

/**
 * "Common Queries" FAQ grid for the B2B / Business Solutions page.
 * Only 5 items, so no show-more toggle — grid wraps naturally
 * (3 across, then the remaining 2 flow to the next row).
 *
 * Note: your screenshot has a few words within each answer rendered in
 * different colors (blue/orange), which reads like an inconsistent
 * CMS/editor artifact rather than an intentional style. I kept answer text
 * a single neutral gray here for readability/consistency with the other
 * FAQ section — let me know if that coloring was actually deliberate and
 * I'll add it back.
 */

const faqs = [
  {
    q: "What is a tailor-made insurance solution?",
    a: "Tailor-made insurance solutions are customized policies designed specifically to meet the unique risks and requirements of your business and industry.",
  },
  {
    q: "Which sectors does Chhaya offer tailored solutions for?",
    a: "We specialize in creating tailored insurance products for life, health, asset protection, employee health benefits, and other business-specific needs.",
  },
  {
    q: "How does the collaboration process work?",
    a: "Our team works closely with your business to understand your challenges, co-develop insurance products, and implement solutions that fit your operational needs.",
  },
  {
    q: "Can tailor-made insurance solutions improve employee retention?",
    a: "Yes, customized life, health, and employee benefit plans enhance employee well-being and satisfaction, which can significantly boost retention and productivity.",
  },
  {
    q: "How do I get started with a tailor-made solution from Chhaya?",
    a: "Simply fill out the inquiry form on our website, and our experts will reach out to discuss your business needs and explore suitable, tailor-made insurance options.",
  },
];

export default function B2BCommonQueries() {
  return (
    <section className="bg-white py-20 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] dark:text-white sm:text-3xl">
          Common Queries
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] dark:text-slate-400 sm:text-base">
          Here are a few common queries and clarifications about our
          tailor-made insurance solutions
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-xl bg-white p-6 shadow-md ring-1 ring-black/5 dark:bg-slate-800/40 dark:ring-white/10 transition-all duration-500 ease-out hover:-translate-y-1.5"
            >
              <p className="text-base font-bold text-[#111827] dark:text-white">
                {item.q}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7280] dark:text-slate-400">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}