"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NewsItem {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  href: string;
  type: "Offer" | "Award";
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: "/assets/reword-bkash.webp",
    title: "Pay bill with bKash and get free healthcare from Shurokka",
    excerpt:
      "Amazing news for all bKash customers! Now if you pay your electricity bill (DESCO/DPDC) through bKash, Shurokka's special doctor's consultation is absolutely free…",
    href: "/news/bkash-bill-pay-offer",
    type: "Offer",
  },
  {
    id: 2,
    image:
      "https://africahealthcollaborative.org/wp-content/uploads/2025/11/go-760x367.jpg",
    title: "STAR Offer with Shurokka Bangladesh Ltd",
    excerpt:
      "Any GP Star customer can get a FREE Doctor Consultation with Shurokka and get up to 25% Cashback on purchasing any Shurokka Health Plans. With a Shurokka subscription, users will be able to access and get discount…",
    href: "/news/star-offer-grameenphone",
    type: "Offer",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx7kKU9KQ4lG6GtHqA6CRb70CgG8scdXc-MMbfRX0b35eoiYmJBbLvOag&s=10",
    title:
      "Shurokka Nari: Harnessing technology to enable better access to healthcare",
    excerpt:
      "Shurokka Bangladesh Limited was recognised for leveraging technology to facilitate better access to healthcare for women with its new product Shurokka \"Nari\" at the…",
    href: "/news/shurokka-nari-ntech-award",
    type: "Award",
  },
];

const typeStyles: Record<NewsItem["type"], string> = {
  Offer: "bg-[#00A67E]",
  Award: "bg-[#F97316]",
};

export default function NewsAwardsSection() {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 dark:bg-neutral-950 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,200,150,0.07),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#00A67E]">
            Press &amp; Recognition
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-5xl">
            News and Awards
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Learn more on our recent activities and acknowledgements
          </p>
          <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-[#00C896]" />
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {newsItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
              className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-black/5 ring-1 ring-black/5 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A67E] focus-visible:ring-offset-2 dark:bg-neutral-900 dark:ring-white/10 motion-reduce:transition-none motion-reduce:transform-none ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white ${
                    typeStyles[item.type]
                  }`}
                >
                  {item.type}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-base font-bold leading-snug text-[#0B1F3A] dark:text-white">
                  {item.title}
                </h3>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.excerpt}
                </p>

                <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide 
                text-[#00A67E] transition-colors duration-300 group-hover:text-[#0F467C]">
                  Read More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}