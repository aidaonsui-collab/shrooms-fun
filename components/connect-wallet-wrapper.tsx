"use client"

import { ConnectButton } from "@mysten/dapp-kit"
import { useEffect, useState } from "react"

export function ConnectWalletWrapper() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-10 w-32" />
  }

  return <ConnectButton />
}
