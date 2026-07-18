"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "/assets/hero/hero1.jpeg",
  },
  {
    id: 2,
    image: "/assets/hero/hero2.jpeg",
  },
  {
    id: 3,
    image: "/assets/hero/hero3.jpeg",
  },
];

export default function HeroSection() {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full aspect-video sm:aspect-16/5"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={""}
                fill
                priority={slide.id === 1}
                className=" "
              />

              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl text-white">
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}