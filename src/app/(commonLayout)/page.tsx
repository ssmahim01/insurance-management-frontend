
import CallSection from '@/components/public-views/home/CallSection'
import ClaimProcessSection from '@/components/public-views/home/ClaimProcessSection'
import CoverageSection from '@/components/public-views/home/CoverageSection'
import HeroSection from '@/components/public-views/home/HeroSection'
import NewsAwardsSection from '@/components/public-views/home/NewsAwardsSection'
import OfferSection from '@/components/public-views/home/OfferSection'
import PartnerSection from '@/components/public-views/home/PartnerSection'
import PlansSection from '@/components/public-views/home/PlanSection'
import TrustedPartnersSection from '@/components/public-views/home/TrustedPartnersSection'
import WhyChooseUsSection from '@/components/public-views/home/WhyChooseUsSection'
import React from 'react'

function HomePage() {
  return (
    <div className='bg-color'>
        <HeroSection />
        <CallSection />
        <OfferSection />
        <PlansSection />
        <CoverageSection />
        <PartnerSection />
        <WhyChooseUsSection />
        <ClaimProcessSection />
        <TrustedPartnersSection />
        <NewsAwardsSection />
    </div>
  )
}

export default HomePage