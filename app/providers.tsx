"use client"

import type React from "react"
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit"
import { getFullnodeUrl } from "@mysten/sui/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { suiConfig } from "@/lib/sui-config"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  const networks = {
    mainnet: { url: getFullnodeUrl("mainnet") },
    testnet: { url: getFullnodeUrl("testnet") },
    devnet: { url: getFullnodeUrl("devnet") },
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork={suiConfig.network}>
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}
