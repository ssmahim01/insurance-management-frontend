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
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: "/assets/reword-bkash.webp",
    title: "Pay bill with bKash and get free healthcare from Shurokka",
    excerpt:
      "Amazing news for all bKash customers! Now if you pay your electricity bill (DESCO/DPDC) through bKash, Shurokka's special doctor's consultation is absolutely free…",
    href: "/news/bkash-bill-pay-offer",
  },
  {
    id: 2,
    image: "/assets/Untitled-Facebook-Post-1-1.webp",
    title: "STAR Offer with Shurokka Bangladesh Ltd",
    excerpt:
      "Any GP Star customer can get a FREE Doctor Consultation with Shurokka and get up to 25% Cashback on purchasing any Shurokka Health Plans. With a Shurokka subscription, users will be able to access and get discount…",
    href: "/news/star-offer-grameenphone",
  },
  {
    id: 3,
    image: "/assets/Nari-2.webp",
    title:
      "Shurokka Nari: Harnessing technology to enable better access to healthcare",
    excerpt:
      "Shurokka Bangladesh Limited was recognised for leveraging technology to facilitate better access to healthcare for women with its new product Shurokka \"Nari\" at the…",
    href: "/news/shurokka-nari-ntech-award",
  },
];

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
    <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
            News and Awards
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Learn more on our recent activities and acknowledgements
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {newsItems.map((item, index) => (
            <article
              key={item.id}
              style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
              className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl dark:bg-neutral-900 dark:ring-white/10 ${
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
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-base font-bold leading-snug text-[#0B1F3A] dark:text-white">
                  {item.title}
                </h3>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.excerpt}
                </p>

                <Link
                  href={item.href}
                  className="group/btn inline-flex w-fit items-center gap-2 rounded-full bg-[#00C896] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#F97316]"
                >
                  Read More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}