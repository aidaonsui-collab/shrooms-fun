"use client"

import { useCurrentAccount } from "@mysten/dapp-kit"
import { Header } from "@/components/header"
import { GameStats } from "@/components/game-stats"
import { FarmGrid } from "@/components/farm-grid"
import { HeroSection } from "@/components/hero-section"
import { DevPanel } from "@/components/dev-panel"
import { ReferralPanel } from "@/components/referral-panel"

export default function Home() {
  const account = useCurrentAccount()

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pixelated"
      style={{ backgroundImage: "url(/images/mushroom-farm-bg.jpg)" }}
    >
      <div className="min-h-screen bg-gradient-to-b from-sky-300/70 via-green-200/60 to-emerald-300/70 backdrop-blur-[1px]">
        <Header />

        <HeroSection compact={!!account} />

        {account && (
          <main className="container mx-auto px-4 py-8">
            <DevPanel />
            <GameStats />
            <div className="mb-8">
              <ReferralPanel />
            </div>
            <FarmGrid />
          </main>
        )}
      </div>
    </div>
  )
}
