import AboutUsSection from '@/components/public-views/about/AboutusSection'
import GlobalOperationSection from '@/components/public-views/about/GlobalOperationSection'
import PurposeSection from '@/components/public-views/about/PurposeSection'
import TeamSection from '@/components/public-views/about/TeamSection'
import ValuesSection from '@/components/public-views/about/ValuesSection'
import HeroSection from '@/components/public-views/home/HeroSection'
import React from 'react'

export default function page() {
  return (
    <div>
        <HeroSection />
        <AboutUsSection />
        <PurposeSection />
        <ValuesSection />
        <GlobalOperationSection />
        <TeamSection /> 
    </div>
  )
}
