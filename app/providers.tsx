"use client"

import type React from "react"
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit"
import { getFullnodeUrl } from "@mysten/sui/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { suiConfig } from "@/lib/sui-config"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const networks = {
    mainnet: { url: getFullnodeUrl("mainnet") },
    testnet: { url: getFullnodeUrl("testnet") },
    devnet: { url: getFullnodeUrl("devnet") },
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork={suiConfig.network}>
        <WalletProvider key="wallet-provider-mounted">{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}
