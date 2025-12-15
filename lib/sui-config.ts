export const suiConfig = {
  network: (process.env.NEXT_PUBLIC_SUI_NETWORK || "mainnet") as "mainnet" | "testnet" | "devnet",
  packageId: process.env.NEXT_PUBLIC_PACKAGE_ID || "",
  gameStateId: process.env.NEXT_PUBLIC_GAME_STATE_ID || "",
  shroomsTokenType: process.env.NEXT_PUBLIC_SHROOMS_TOKEN_TYPE || "",
  devWallet: process.env.NEXT_PUBLIC_DEV_WALLET || "",
  rpcUrl: process.env.NEXT_PUBLIC_SUI_RPC_URL || "https://fullnode.mainnet.sui.io:443",
}

// Validate config on initialization
if (typeof window !== "undefined") {
  if (!suiConfig.packageId) {
    console.warn("[v0] NEXT_PUBLIC_PACKAGE_ID not set")
  }
  if (!suiConfig.gameStateId) {
    console.warn("[v0] NEXT_PUBLIC_GAME_STATE_ID not set")
  }
  console.log("[v0] Sui Config:", {
    network: suiConfig.network,
    packageId: suiConfig.packageId,
    gameStateId: suiConfig.gameStateId,
  })
}
