"use client";

import Image from "next/image";
import { useInView } from "@/components/shared/useInView";

interface DataType {
  title: string;
  image: string;
}

const List: DataType[] = [
  {
    title:
      "Our Mission To make healthcare more affordable and financially accessible by providing trusted health protection solutions with exceptional customer service",
    image: "/assets/about/mission.jpg",
  },
  {
    title:
      "Our Vision To become one of Bangladesh's most trusted health protection brands by empowering millions of families with accessible, reliable, and innovative healthcare solutions.",
    image: "/assets/about/vission.webp",
  },
];

function splitTitle(title: string) {
  const words = title.trim().split(" ");
  const heading = words.slice(0, 2).join(" ");
  const description = words.slice(2).join(" ");
  return { heading, description };
}

function MissionRow({
  item,
  reverse,
}: {
  item: DataType;
  reverse: boolean;
}) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  const { heading, description } = splitTitle(item.title);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div
        className={`relative h-[260px] w-full overflow-hidden rounded-2xl transition-all duration-700 ease-out sm:h-[340px] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Image
          src={item.image}
          alt={heading}
          fill
          className="object-cover"
        />
      </div>

      <div
        className={`transition-all delay-150 duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h3 className="mb-3 text-2xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-3xl">
          {heading}
        </h3>
        <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function OurMissionSection() {
  return (
    <section className="bg-white py-6 dark:bg-neutral-950 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-16 px-5 sm:space-y-20">
        {List.map((item, index) => (
          <MissionRow key={item.title} item={item} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}