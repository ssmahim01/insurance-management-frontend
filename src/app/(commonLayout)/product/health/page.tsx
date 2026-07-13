import CommonQueries from '@/components/public-views/products/health/CommonQueries'
import HealthHero from '@/components/public-views/products/health/HealthHero'
import HealthLifeChallenges from '@/components/public-views/products/health/HealthLifeChallenges'
import HealthPricingPlans from '@/components/public-views/products/health/HealthPricingPlans'
import HealthTrustFeatures from '@/components/public-views/products/health/healthTrustFeatures'
import PartnerNetwork from '@/components/public-views/products/health/PartnerNetwork'
import React from 'react'

export default function page() {
  return (
    <div>
        <HealthHero />
        <HealthTrustFeatures />
        <HealthLifeChallenges />
        <HealthPricingPlans />
        <CommonQueries />
        <PartnerNetwork />
    </div>
  )
}