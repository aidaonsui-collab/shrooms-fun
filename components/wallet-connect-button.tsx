"use client"

import { ConnectButton } from "@mysten/dapp-kit"
import { useEffect, useState } from "react"

export function WalletConnectButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-10 w-32 opacity-0" />
  }

  return <ConnectButton />
}
