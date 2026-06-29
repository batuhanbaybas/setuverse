import type { MostLikedSetup } from '#/features/home/server/get-most-liked-setups.functions'

import LandingCta from '../components/landing/landing-cta'
import LandingHero from '../components/landing/landing-hero'
import LandingHowItWorks from '../components/landing/landing-how-it-works'
import LandingMostLikedSetups from '../components/landing/landing-most-liked-setups'

type LandingPageProps = {
  mostLikedSetups: MostLikedSetup[]
}

function LandingPage({ mostLikedSetups }: LandingPageProps) {
  return (
    <div className="py-6 sm:py-8 lg:py-10">
      <LandingHero />
      <LandingMostLikedSetups setups={mostLikedSetups} />
      <LandingHowItWorks />
      <LandingCta />
    </div>
  )
}

export default LandingPage
