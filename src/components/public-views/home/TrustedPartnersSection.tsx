"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const partners = [
  { id: 1, name: "ShopUp", logo: "/assets/Shopup.webp" },
  { id: 2, name: "ShareTrip", logo: "/assets/Sharetrip.webp" },
  { id: 3, name: "Grameenphone", logo: "/assets/GP.webp" },
  { id: 4, name: "bKash", logo: "/assets/Bkash.webp" },
  { id: 5, name: "Brac Health Care", logo: "/assets/Brac.webp" },
];

export default function TrustedPartnersSection() {
  return (
    <section className="bg-white py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-4xl">
            Our Trusted Partners
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            We partner with leading Bangladeshi companies and multinationals
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent dark:from-neutral-950 sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-white to-transparent dark:from-neutral-950 sm:w-24" />

        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={2}
          spaceBetween={48}
          loop
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={false}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 56 },
            1024: { slidesPerView: 4, spaceBetween: 64 },
          }}
          className="py-2!"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id} className="flex! items-center! justify-center!">
              <div className="group flex items-center justify-center">
                <div className="relative h-10 w-32  transition-all duration-300 sm:h-20 sm:w-80">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="150px"
                    className="object-contain dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}