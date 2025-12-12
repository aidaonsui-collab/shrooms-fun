import { Transaction } from "@mysten/sui/transactions"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"

/**
 * Script to call any function on the deployed Sui contract
 *
 * Usage: Replace the function name and arguments below with your desired function call
 */

async function callContractFunction() {
  const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID!
  const GAME_STATE_ID = process.env.NEXT_PUBLIC_GAME_STATE_ID!
  const NETWORK = process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet"

  const client = new SuiClient({ url: getFullnodeUrl(NETWORK) })

  // Example: Calling a custom function like finalize_registration
  const tx = new Transaction()

  // CUSTOMIZE THIS SECTION FOR YOUR FUNCTION
  // ==========================================

  // Example 1: Simple function call (no arguments)
  // tx.moveCall({
  //   target: `${PACKAGE_ID}::shrooms_token::finalize_registration`,
  //   arguments: [],
  // });

  // Example 2: Function with shared object argument (like GameState)
  // tx.moveCall({
  //   target: `${PACKAGE_ID}::shrooms_token::finalize_registration`,
  //   arguments: [tx.object(GAME_STATE_ID)],
  // });

  // Example 3: Function with address argument
  // tx.moveCall({
  //   target: `${PACKAGE_ID}::shrooms_token::finalize_registration`,
  //   arguments: [tx.pure.address('0xYOUR_ADDRESS_HERE')],
  // });

  // Example 4: Function with multiple arguments
  // tx.moveCall({
  //   target: `${PACKAGE_ID}::shrooms_token::finalize_registration`,
  //   arguments: [
  //     tx.object(GAME_STATE_ID),
  //     tx.pure.u64(100),
  //     tx.pure.bool(true),
  //   ],
  // });

  console.log("[v0] Package ID:", PACKAGE_ID)
  console.log("[v0] Game State ID:", GAME_STATE_ID)
  console.log("[v0] Network:", NETWORK)
  console.log("\n[v0] Transaction ready to execute")
  console.log("[v0] Use the Sui CLI or integrate with a wallet to sign and execute")

  // To actually execute, you'd need to sign with a keypair or wallet
  // This script shows the structure - execute via CLI or integrate with dApp
}

callContractFunction()
