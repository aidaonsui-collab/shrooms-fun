"use client"

import dynamic from "next/dynamic"

const WalletConnectButton = dynamic(
  () => import("@/components/wallet-connect-button").then((mod) => ({ default: mod.WalletConnectButton })),
  { ssr: false },
)

interface HeroSectionProps {
  compact?: boolean
}

export function HeroSection({ compact = false }: HeroSectionProps) {
  if (compact) {
    return (
      <div className="pt-28 pb-12 text-center bg-gradient-to-b from-purple-900/40 via-indigo-800/30 to-transparent">
        <div className="flex justify-center mb-4">
          <span className="text-5xl">🍄</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold pixelated mb-3">
          <span className="text-emerald-400">GROW MAGIC </span>
          <span className="text-purple-300">MUSHROOMS</span>
        </h1>
        <p className="text-base text-white font-medium pixelated tracking-wider">FARM + HARVEST + EARN $SHROOMS</p>
        <p className="text-sm text-yellow-300 pixelated mt-2">The first psychedelic game on Sui</p>
      </div>
    )
  }

  return (
    <div
      className="pt-32 pb-16 text-center relative min-h-screen"
      style={{
        backgroundImage: "url('https://img.itch.zone/aW1nLzQ5ODA4NTAuZ2lm/original/edO3Z6.gif')", // ← 16-bit animated farmland with farmers!
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <span className="text-8xl animate-pulse">🍄</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold pixelated mb-4">
          <span className="text-emerald-400">GROW MAGIC </span>
          <span className="text-purple-300">MUSHROOMS</span>
        </h1>
        <p className="text-xl text-white font-medium pixelated tracking-wide">FARM + HARVEST + EARN $SHROOMS</p>
        <p className="text-base text-yellow-300 pixelated mt-3">The first psychedelic game on Sui</p>

        <div className="mt-8 flex justify-center">
          <WalletConnectButton />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-emerald-400/50 bg-purple-950/60 backdrop-blur-md rounded-xl hover:bg-purple-950/70 transition-all">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/80 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-bold text-xl text-emerald-400 pixelated">1. Create Farm</h3>
              <p className="text-sm text-purple-100 pixelated leading-relaxed">
                Pay 10 SUI to create your mushroom farm with 10 starting mushrooms
              </p>
            </div>
          </div>
          <div className="p-6 border-2 border-purple-400/50 bg-indigo-950/60 backdrop-blur-md rounded-xl hover:bg-indigo-950/70 transition-all">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-500/80 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="font-bold text-xl text-purple-300 pixelated">2. Wait & Grow</h3>
              <p className="text-sm text-purple-100 pixelated leading-relaxed">
                Your mushrooms generate $SHROOMS every epoch based on count and level
              </p>
            </div>
          </div>
          <div className="p-6 border-2 border-pink-400/50 bg-violet-950/60 backdrop-blur-md rounded-xl hover:bg-violet-950/70 transition-all">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-500/80 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-xl text-pink-300 pixelated">3. Harvest</h3>
              <p className="text-sm text-purple-100 pixelated leading-relaxed">
                Harvest your accumulated $SHROOMS and upgrade your farm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}