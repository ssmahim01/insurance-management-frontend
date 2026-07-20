"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ValueItem {
  id: number;
  number: string;
  image: string;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    id: 1,
    number: "01",
    image: "https://media.licdn.com/dms/image/v2/D5612AQErCIkyK-NHvw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1692075003840?e=2147483647&v=beta&t=sAg6C-Dgcjcfm6qQXlFARrb3QturoTA_bXXGYgN5-Jw",
    title: "Earn and Give Respect",
    description:
      "We show consideration for each other and for our customers. We celebrate diversity and are kind and sensitive when discussing ways in which we are different.",
  },
  {
    id: 2,
    number: "02",
    image: "https://imageio.forbes.com/blogs-images/chunkamui/files/2016/01/Devils-Advocate-Vector-Banner-700x400.png?height=400&width=700&fit=bounds",
    title: "Think Big Start Small",
    description:
      "We imagine solutions that will challenge the status quo. We start small, take time to get it right, then let it fly. We empower our people to share and test their ideas. We believe in growing our people because every employee can have an impact on the business.",
  },
  {
    id: 3,
    number: "03",
    image: "https://www.proofhub.com/articles/wp-content/uploads/2025/02/Taking-ownership-at-work.jpg",
    title: "Take Ownership",
    description:
      "Every one of our employees has a responsibility to our customers to deliver value and service. We recognise and reward people who take initiative, follow through on ideas with analysis and action, and go beyond their role to make Shurokka better.",
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-neutral-950 sm:py-28">
      {/* ambient background accent */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-[#0B1F3A]/5 blur-3xl dark:bg-blue-500/10" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB] dark:text-blue-400">
            What We Stand For
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-4xl">
            Our Values and Equality
          </h2>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-linear-to-r from-[#0B1F3A] to-[#2563EB] dark:from-blue-400 dark:to-blue-600" />
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {values.map((value, index) => (
            <div
              key={value.id}
              style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
              className={`group relative overflow-hidden rounded-2xl border border-[#0B1F3A]/5 bg-[#EFF4FA] shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0B1F3A]/10 dark:border-white/5 dark:bg-neutral-900 dark:hover:shadow-black/40 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* gradient wash for contrast + depth */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-lg font-bold text-[#0B1F3A] dark:text-white">
                  {value.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}