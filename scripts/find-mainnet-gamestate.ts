import { SuiClient } from "@mysten/sui/client"

const PACKAGE_ID = "0xbe233592771a13766ea4a66c0c0486eabd33c9c8138e8b186b5f920f1992afd1"
const MAINNET_RPC = "https://fullnode.mainnet.sui.io:443"

async function findMainnetGameState() {
  const client = new SuiClient({ url: MAINNET_RPC })

  console.log("\n🔍 Searching for GameState on MAINNET...\n")

  // Check if package exists on mainnet
  try {
    const pkg = await client.getObject({
      id: PACKAGE_ID,
      options: { showContent: true },
    })

    if (pkg.error) {
      console.log("❌ Package does NOT exist on mainnet!")
      console.log("You need to deploy to mainnet first.\n")
      return
    }

    console.log("✅ Package found on mainnet:", PACKAGE_ID)
  } catch (e) {
    console.log("❌ Package does NOT exist on mainnet!")
    console.log("You need to deploy to mainnet first.\n")
    return
  }

  // Search for GameState objects created by this package
  console.log("\n🔍 Looking for GameState objects...\n")

  try {
    const objects = await client.queryEvents({
      query: {
        MoveModule: {
          package: PACKAGE_ID,
          module: "shrooms_token",
        },
      },
      limit: 50,
    })

    console.log("Found events:", objects.data.length)

    // Look for GameState creation event
    for (const event of objects.data) {
      console.log("\nEvent:", event)
      if (event.type.includes("GameState")) {
        console.log("Found GameState event!")
      }
    }
  } catch (e) {
    console.log("Error querying events:", e)
  }

  // Alternative: Query dynamic fields
  console.log("\n🔍 Checking for shared objects of type GameState...\n")

  // The GameState type
  const gameStateType = `${PACKAGE_ID}::shrooms_token::GameState`

  // This won't work directly, so let's check the deployment transaction
  console.log("\n📝 To find your mainnet GameState ID:")
  console.log("1. Go to https://suivision.xyz/txblock/YOUR_MAINNET_TX_HASH")
  console.log('2. Look for "Created Objects" section')
  console.log('3. Find the object with type "GameState" that is Shared')
  console.log("4. Copy that Object ID\n")

  console.log("Or run: sui client object <OBJECT_ID> --json")
  console.log("to verify if an object exists on mainnet.\n")
}

findMainnetGameState()
