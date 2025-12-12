import { SuiClient } from "@mysten/sui/client"

const PACKAGE_ID = "0xbe233592771a13766ea4a66c0c0486eabd33c9c8138e8b186b5f920f1992afd1"
const MAINNET_RPC = "https://fullnode.mainnet.sui.io:443"

async function findGameState() {
  const client = new SuiClient({ url: MAINNET_RPC })

  console.log("Searching for GameState objects on mainnet...")
  console.log("Package ID:", PACKAGE_ID)

  try {
    // Query for all objects of type GameState
    const gameStateType = `${PACKAGE_ID}::shrooms_token::GameState`

    // Get objects by type
    const objects = await client.getOwnedObjects({
      owner: PACKAGE_ID,
      options: {
        showType: true,
        showContent: true,
      },
    })

    console.log("\nObjects owned by package:", objects)

    // Try to find GameState by querying dynamic fields or events
    const txBlock = await client.getTransactionBlock({
      digest: "8VN28WhFengQkNLiiZ86Gcfvb4wUfoN4Gr6KcLCHtFbK",
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    })

    console.log("\n=== TRANSACTION DETAILS ===")
    console.log(JSON.stringify(txBlock, null, 2))

    // Find GameState in created objects
    const objectChanges = txBlock.objectChanges || []
    const gameStateObjects = objectChanges.filter(
      (change: any) => change.type === "created" && change.objectType?.includes("GameState"),
    )

    if (gameStateObjects.length > 0) {
      console.log("\n✅ FOUND GAMESTATE OBJECTS:")
      gameStateObjects.forEach((obj: any) => {
        console.log("\nGameState Object ID:", obj.objectId)
        console.log("Owner:", obj.owner)
        console.log("Type:", obj.objectType)
        console.log("\n📝 Add this to your .env.local:")
        console.log(`NEXT_PUBLIC_GAME_STATE_ID=${obj.objectId}`)
      })
    } else {
      console.log("\n❌ No GameState objects found in transaction")
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

findGameState()
