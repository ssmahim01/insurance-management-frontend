import React from "react";

export default function AboutBannerSection() {
  return (
    <div className="relative w-full bg-[#104F8E]  py-6">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          About Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-gray-400 sm:text-lg">
          Protecting health, supporting families &mdash; learn who we are and
          what drives us to make healthcare simpler for everyone.
        </p>
      </div>
    </div>
  );
}