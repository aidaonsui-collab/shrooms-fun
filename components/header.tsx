"use client"

import { ConnectButton } from "@mysten/dapp-kit"
import { Sprout } from "lucide-react"
import { useState, useEffect } from "react"
import { ZkLoginButton } from "@/components/zklogin-button"

export function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-b-4 border-primary bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">SHROOMS.FUN</h1>
            <p className="text-xs text-muted-foreground font-mono">Grow Magic Mushrooms on Sui</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {mounted && (
            <>
              <ZkLoginButton />
              <ConnectButton />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
