import { SuiClient, getFullnodeUrl } from "@mysten/sui/client"
import { Transaction } from "@mysten/sui/transactions"

export const suiClient = new SuiClient({
  url: getFullnodeUrl((process.env.NEXT_PUBLIC_NETWORK || "mainnet") as "mainnet" | "testnet"),
})

// Contract addresses - UPDATE THESE AFTER DEPLOYMENT
export const CONTRACT_CONFIG = {
  packageId: process.env.NEXT_PUBLIC_PACKAGE_ID || "YOUR_PACKAGE_ID",
  gameStateId: process.env.NEXT_PUBLIC_GAME_STATE_ID || "YOUR_GAME_STATE_ID",
  shroomsTokenType: process.env.NEXT_PUBLIC_SHROOMS_TOKEN_TYPE || "YOUR_PACKAGE_ID::shrooms_token::SHROOMS_TOKEN",
}

export const FARM_COST_SUI = 10_000_000_000 // 10 SUI
export const UPGRADE_BASE_COST_SUI = 2_000_000_000 // 2 SUI (multiplied by level)
export const UPGRADE_BASE_COST_SHROOMS = 5_000_000_000 // 5 SHROOMS (multiplied by level)
export const PLANT_COST_PER_MUSHROOM = 100_000_000 // 0.1 SHROOMS

export function createFarmTransaction(walletAddress: string) {
  const tx = new Transaction()

  console.log("[v0] Creating farm transaction with packageId:", CONTRACT_CONFIG.packageId)
  console.log("[v0] Game state ID:", CONTRACT_CONFIG.gameStateId)
  console.log("[v0] Wallet address:", walletAddress)

  const [coin] = tx.splitCoins(tx.gas, [FARM_COST_SUI])

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::shrooms_token::create_farm`,
    arguments: [tx.object(CONTRACT_CONFIG.gameStateId), coin],
  })

  return tx
}

export function harvestTransaction(farmId: string) {
  const tx = new Transaction()

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::shrooms_token::harvest`,
    arguments: [tx.object(CONTRACT_CONFIG.gameStateId), tx.object(farmId)],
  })

  return tx
}

export function plantMushroomsTransaction(farmId: string, amount: number, shroomsCoinId: string) {
  const tx = new Transaction()

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::shrooms_token::plant_mushrooms`,
    arguments: [tx.object(farmId), tx.object(shroomsCoinId), tx.pure.u64(amount)],
  })

  return tx
}

export function upgradeFarmTransaction(farmId: string, shroomsCoinId: string, currentLevel: number) {
  const tx = new Transaction()

  const upgradeCostSui = UPGRADE_BASE_COST_SUI * currentLevel

  const [suiCoin] = tx.splitCoins(tx.gas, [upgradeCostSui])

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::shrooms_token::upgrade_farm`,
    arguments: [tx.object(CONTRACT_CONFIG.gameStateId), tx.object(farmId), suiCoin, tx.object(shroomsCoinId)],
  })

  return tx
}
