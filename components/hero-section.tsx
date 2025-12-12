"use client"

import { ConnectButton } from "@mysten/dapp-kit"

interface HeroSectionProps {
  compact?: boolean
}

export function HeroSection({ compact = false }: HeroSectionProps) {
  if (compact) {
    return (
      <div className="bg-gradient-to-b from-background to-card/50 py-8 relative overflow-hidden border-b-4 border-primary">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-4 left-10 text-4xl animate-float">🍄</div>
          <div className="absolute top-4 right-20 text-3xl animate-float" style={{ animationDelay: "1s" }}>
            🍄
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-6xl animate-float drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">🍄</div>
            <div>
              <h2 className="text-3xl font-black leading-tight">
                <span className="text-primary drop-shadow-[0_2px_8px_rgba(0,255,0,0.5)]">GROW MAGIC</span>{" "}
                <span className="text-secondary drop-shadow-[0_2px_8px_rgba(200,0,255,0.5)]">MUSHROOMS</span>
              </h2>
              <p className="text-xs text-muted-foreground">FARM • HARVEST • EARN $SHROOMS</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-b from-background to-card/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 text-6xl animate-float">🍄</div>
        <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: "1s" }}>
          🍄
        </div>
        <div className="absolute bottom-32 left-1/4 text-7xl animate-float" style={{ animationDelay: "2s" }}>
          🍄
        </div>
        <div className="absolute bottom-20 right-1/3 text-6xl animate-float" style={{ animationDelay: "1.5s" }}>
          🍄
        </div>
      </div>

      <div className="text-center max-w-4xl relative z-10">
        <div className="relative inline-block mb-8">
          <div className="text-[120px] leading-none animate-float drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]">🍄</div>
          <div className="absolute -top-4 -left-4 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>
            ✨
          </div>
          <div className="absolute -bottom-4 -right-4 text-4xl animate-float" style={{ animationDelay: "1s" }}>
            ✨
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-balance leading-tight">
          <span className="text-primary drop-shadow-[0_2px_8px_rgba(0,255,0,0.5)]">GROW MAGIC</span>
          <br />
          <span className="text-secondary drop-shadow-[0_2px_8px_rgba(200,0,255,0.5)]">MUSHROOMS</span>
        </h2>

        <p className="text-sm sm:text-base text-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          FARM • HARVEST • EARN $SHROOMS
          <br />
          <span className="text-muted-foreground text-xs">The first mushroom game on Sui blockchain</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
          <ConnectButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-card border-4 border-primary rounded-lg p-6 hover:scale-105 transition-transform relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl">👨‍🌾</div>
            <div className="text-5xl mb-3">🌱</div>
            <h3 className="font-bold text-base mb-2 text-primary">PLANT</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Start farm for 10 SUI</p>
          </div>

          <div className="bg-card border-4 border-secondary rounded-lg p-6 hover:scale-105 transition-transform relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl">👨‍🌾</div>
            <div className="text-5xl mb-3">🍄</div>
            <h3 className="font-bold text-base mb-2 text-secondary">HARVEST</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Earn $SHROOMS tokens</p>
          </div>

          <div className="bg-card border-4 border-accent rounded-lg p-6 hover:scale-105 transition-transform relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl">👨‍🌾</div>
            <div className="text-5xl mb-3">⬆️</div>
            <h3 className="font-bold text-base mb-2 text-accent">UPGRADE</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Level up for more yield</p>
          </div>
        </div>
      </div>
    </div>
  )
}
