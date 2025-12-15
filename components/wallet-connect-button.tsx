"use client"

import { ConnectButton } from "@mysten/dapp-kit"

export function WalletConnectButton() {
  // The Dialog warning from @mysten/dapp-kit is cosmetic and doesn't affect functionality
  return <ConnectButton />
}
