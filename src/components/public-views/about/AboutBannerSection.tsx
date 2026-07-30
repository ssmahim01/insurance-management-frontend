import React from 'react'
import Image from 'next/image'

export default function AboutBannerSection() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src=""
        alt="About Banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}