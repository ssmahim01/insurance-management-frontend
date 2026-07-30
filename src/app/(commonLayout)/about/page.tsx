import React from 'react'
import AboutUsSection from '@/components/public-views/about/AboutusSection'
import PurposeSection from '@/components/public-views/about/PurposeSection'
import ValuesSection from '@/components/public-views/about/ValuesSection'
import AboutBannerSection from '@/components/public-views/about/AboutBannerSection'
import WhyChooseBenefitsSection from '@/components/public-views/home/WhyChooseUsSection'
import OurMissionSection from '@/components/public-views/about/OurMistionSection'


export default function page() {
  return (
    <div>
        <AboutBannerSection />
        <AboutUsSection />
        <PurposeSection />
        <ValuesSection />
        <WhyChooseBenefitsSection />
        <OurMissionSection />
    </div>
  )
}
