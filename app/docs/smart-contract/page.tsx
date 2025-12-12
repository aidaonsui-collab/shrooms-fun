export default function SmartContractPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-teal-950 to-cyan-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/docs" className="text-emerald-400 hover:text-emerald-300 font-mono text-sm">
            ← Back to Docs
          </a>
        </div>

        <h1 className="text-5xl font-bold text-emerald-400 mb-8 font-mono">Smart Contract Reference</h1>

        <div className="space-y-8 text-emerald-100">
          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Contract Details</h2>
            <div className="space-y-3 text-lg font-mono text-sm">
              <p>
                <strong className="text-emerald-300">Package ID:</strong>
                <br />
                0xbe233592771a13766ea4a66c0c0486eabd33c9c8138e8b186b5f920f1992afd1
              </p>
              <p>
                <strong className="text-emerald-300">Module:</strong> shrooms_token
              </p>
              <p>
                <strong className="text-emerald-300">GameState ID:</strong>
                <br />
                0x3afb9c0c86a095a069046d65ac17bfd5cc0662fcc501a35bae4525655c2e34ac
              </p>
              <p>
                <strong className="text-emerald-300">Network:</strong> Sui Mainnet
              </p>
              <p>
                <strong className="text-emerald-300">Deployment:</strong> Epoch 974 (Jan 11, 2025)
              </p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Data Structures</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">SHROOMS_TOKEN</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public struct SHROOMS_TOKEN has drop {}`}
                </pre>
                <p className="text-emerald-200 mt-2">One-time witness for token initialization</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">GameState</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public struct GameState has key {
    id: UID,
    treasury_cap: TreasuryCap<SHROOMS_TOKEN>,
    dev_wallet: address,
    total_farms: u64,
    total_harvested: u64,
    fee_pool: Balance<SUI>,
}`}
                </pre>
                <p className="text-emerald-200 mt-2">Shared object managing game state and token minting</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Farm</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public struct Farm has key, store {
    id: UID,
    owner: address,
    mushroom_count: u64,
    last_harvest: u64,
    total_harvested: u64,
    upgrade_level: u8,
}`}
                </pre>
                <p className="text-emerald-200 mt-2">Owned NFT representing a player's farm</p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Public Functions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">create_farm</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public entry fun create_farm(
    game_state: &mut GameState,
    payment: Coin<SUI>,
    ctx: &mut TxContext
)`}
                </pre>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <strong className="text-emerald-300">Description:</strong> Create a new mushroom farm
                  </p>
                  <p>
                    <strong className="text-emerald-300">Cost:</strong> 10 SUI
                  </p>
                  <p>
                    <strong className="text-emerald-300">Returns:</strong> Farm NFT with 10 mushrooms at Level 1
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">harvest</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public entry fun harvest(
    game_state: &mut GameState,
    farm: &mut Farm,
    ctx: &mut TxContext
)`}
                </pre>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <strong className="text-emerald-300">Description:</strong> Harvest accumulated $SHROOMS
                  </p>
                  <p>
                    <strong className="text-emerald-300">Formula:</strong> yield = mushrooms × epochs × level × 0.05
                  </p>
                  <p>
                    <strong className="text-emerald-300">Returns:</strong> Minted $SHROOMS tokens
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">plant_mushrooms</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public entry fun plant_mushrooms(
    farm: &mut Farm,
    payment: Coin<SHROOMS_TOKEN>,
    amount: u64,
    ctx: &mut TxContext
)`}
                </pre>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <strong className="text-emerald-300">Description:</strong> Plant additional mushrooms
                  </p>
                  <p>
                    <strong className="text-emerald-300">Cost:</strong> 0.1 $SHROOMS per mushroom (burned)
                  </p>
                  <p>
                    <strong className="text-emerald-300">Effect:</strong> Increases mushroom_count
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">upgrade_farm</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public entry fun upgrade_farm(
    game_state: &mut GameState,
    farm: &mut Farm,
    sui_payment: Coin<SUI>,
    shrooms_payment: Coin<SHROOMS_TOKEN>,
    ctx: &mut TxContext
)`}
                </pre>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <strong className="text-emerald-300">Description:</strong> Upgrade farm to next level
                  </p>
                  <p>
                    <strong className="text-emerald-300">SUI Cost:</strong> 2 × current_level
                  </p>
                  <p>
                    <strong className="text-emerald-300">$SHROOMS Cost:</strong> 5 × current_level (burned)
                  </p>
                  <p>
                    <strong className="text-emerald-300">Effect:</strong> Increments upgrade_level
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">withdraw_fees</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public entry fun withdraw_fees(
    game_state: &mut GameState,
    amount: u64,
    ctx: &mut TxContext
)`}
                </pre>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <strong className="text-emerald-300">Description:</strong> Withdraw SUI from fee pool
                  </p>
                  <p>
                    <strong className="text-emerald-300">Authorization:</strong> Dev wallet only
                  </p>
                  <p>
                    <strong className="text-emerald-300">Parameter:</strong> amount in MIST (1 SUI = 1,000,000,000 MIST)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">View Functions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">get_farm_info</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public fun get_farm_info(farm: &Farm): (u64, u64, u64, u8)`}
                </pre>
                <p className="text-emerald-200 mt-2 text-sm">
                  Returns: (mushroom_count, last_harvest, total_harvested, upgrade_level)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">get_game_stats</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-sm overflow-x-auto">
                  {`public fun get_game_stats(game_state: &GameState): (u64, u64)`}
                </pre>
                <p className="text-emerald-200 mt-2 text-sm">Returns: (total_farms, total_harvested)</p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">CLI Examples</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Create Farm</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-xs overflow-x-auto">
                  {`sui client call \\
  --package 0xbe233592771a13766ea4a66c0c0486eabd33c9c8138e8b186b5f920f1992afd1 \\
  --module shrooms_token \\
  --function create_farm \\
  --args 0x3afb9c0c86a095a069046d65ac17bfd5cc0662fcc501a35bae4525655c2e34ac <COIN_ID> \\
  --gas-budget 10000000`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Harvest</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-xs overflow-x-auto">
                  {`sui client call \\
  --package 0xbe233592771a13766ea4a66c0c0486eabd33c9c8138e8b186b5f920f1992afd1 \\
  --module shrooms_token \\
  --function harvest \\
  --args 0x3afb9c0c86a095a069046d65ac17bfd5cc0662fcc501a35bae4525655c2e34ac <FARM_ID> \\
  --gas-budget 10000000`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Query Farm Object</h3>
                <pre className="bg-black/50 p-4 rounded border border-emerald-500/20 text-xs overflow-x-auto">
                  {`sui client object <FARM_ID> --json`}
                </pre>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Security</h2>

            <div className="space-y-4 text-lg">
              <div className="bg-green-950/30 p-4 rounded border border-green-500/30">
                <p className="text-green-300 font-bold mb-2">Authorization Checks</p>
                <p className="text-green-200 text-sm">
                  All functions verify ownership and permissions before execution
                </p>
              </div>

              <div className="bg-green-950/30 p-4 rounded border border-green-500/30">
                <p className="text-green-300 font-bold mb-2">Balance Validation</p>
                <p className="text-green-200 text-sm">Payments are verified for sufficient funds before processing</p>
              </div>

              <div className="bg-green-950/30 p-4 rounded border border-green-500/30">
                <p className="text-green-300 font-bold mb-2">Input Sanitization</p>
                <p className="text-green-200 text-sm">All inputs are validated to prevent invalid states</p>
              </div>

              <div className="bg-amber-950/30 p-4 rounded border border-amber-500/30">
                <p className="text-amber-300 font-bold mb-2">Audit Status</p>
                <p className="text-amber-200 text-sm">
                  No formal audit yet. Open source and verifiable on-chain. Professional audit planned if TVL exceeds
                  10,000 SUI.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Explorer Links</h2>

            <div className="space-y-2 text-sm">
              <p>
                <a
                  href="https://suivision.xyz/package/0xbe233592771a13766ea4a66c0c0486eabd33c9c8138e8b186b5f920f1992afd1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  View Package on SuiVision
                </a>
              </p>
              <p>
                <a
                  href="https://suivision.xyz/object/0x3afb9c0c86a095a069046d65ac17bfd5cc0662fcc501a35bae4525655c2e34ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  View GameState on SuiVision
                </a>
              </p>
              <p>
                <a
                  href="https://suivision.xyz/txblock/8VN28WhFengQkNLiiZ86Gcfvb4wUfoN4Gr6KcLCHtFbK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  View Deployment Transaction
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
