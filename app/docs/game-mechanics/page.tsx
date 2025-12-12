export default function GameMechanicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-teal-950 to-cyan-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/docs" className="text-emerald-400 hover:text-emerald-300 font-mono text-sm">
            ← Back to Docs
          </a>
        </div>

        <h1 className="text-5xl font-bold text-emerald-400 mb-8 font-mono">Game Mechanics</h1>

        <div className="space-y-8 text-emerald-100">
          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Core Loop</h2>
            <ol className="list-decimal list-inside space-y-3 text-lg">
              <li>Create a farm (costs 10 SUI)</li>
              <li>Wait for epochs to pass</li>
              <li>Harvest $SHROOMS tokens</li>
              <li>Plant more mushrooms or upgrade your farm</li>
              <li>Repeat to maximize earnings</li>
            </ol>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Creating a Farm</h2>
            <div className="space-y-3 text-lg">
              <p>
                <strong className="text-emerald-300">Cost:</strong> 10 SUI
              </p>
              <p>
                <strong className="text-emerald-300">Starting Mushrooms:</strong> 10
              </p>
              <p>
                <strong className="text-emerald-300">Starting Level:</strong> 1
              </p>
              <p className="text-emerald-200 mt-4">
                When you create a farm, you pay 10 SUI which goes into the game's fee pool. You receive a Farm NFT that
                starts with 10 mushrooms at level 1.
              </p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Harvesting</h2>
            <div className="space-y-4 text-lg">
              <p className="text-emerald-200">
                Harvesting is how you earn $SHROOMS tokens. The yield is calculated based on:
              </p>
              <div className="bg-emerald-950/50 p-4 rounded border border-emerald-500/20 font-mono">
                <p className="text-xl">yield = mushrooms × epochs × level × 0.05</p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong className="text-emerald-300">Mushrooms:</strong> Number of mushrooms on your farm
                </p>
                <p>
                  <strong className="text-emerald-300">Epochs:</strong> Time passed since last harvest (1 epoch ≈ 24
                  hours)
                </p>
                <p>
                  <strong className="text-emerald-300">Level:</strong> Your farm's upgrade level (multiplier)
                </p>
              </div>

              <div className="mt-6 bg-cyan-950/30 p-4 rounded border border-cyan-500/30">
                <p className="text-cyan-300 font-bold mb-2">Example:</p>
                <p>Farm with 50 mushrooms at Level 2, after 3 epochs:</p>
                <p className="font-mono mt-2">50 × 3 × 2 × 0.05 = 15 $SHROOMS</p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Planting Mushrooms</h2>
            <div className="space-y-3 text-lg">
              <p>
                <strong className="text-emerald-300">Cost:</strong> 0.1 $SHROOMS per mushroom
              </p>
              <p className="text-emerald-200">
                You can expand your farm by planting additional mushrooms. Each mushroom costs 0.1 $SHROOMS to plant.
                The $SHROOMS payment is burned, reducing total supply.
              </p>
              <p className="text-emerald-200">More mushrooms = higher yield per harvest!</p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Upgrading Your Farm</h2>
            <div className="space-y-4 text-lg">
              <p className="text-emerald-200">
                Upgrading increases your farm's level, which acts as a multiplier for harvesting.
              </p>
              <div className="bg-emerald-950/50 p-4 rounded border border-emerald-500/20">
                <p className="font-bold text-emerald-300 mb-2">Upgrade Cost Formula:</p>
                <p className="font-mono">SUI Cost = 2 × current_level</p>
                <p className="font-mono">$SHROOMS Cost = 5 × current_level</p>
              </div>

              <table className="w-full mt-4 border border-emerald-500/30">
                <thead className="bg-emerald-900/30">
                  <tr>
                    <th className="border border-emerald-500/30 p-2">Upgrade</th>
                    <th className="border border-emerald-500/30 p-2">SUI Cost</th>
                    <th className="border border-emerald-500/30 p-2">$SHROOMS Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-emerald-500/30 p-2">Level 1 → 2</td>
                    <td className="border border-emerald-500/30 p-2">2 SUI</td>
                    <td className="border border-emerald-500/30 p-2">5 $SHROOMS</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-500/30 p-2">Level 2 → 3</td>
                    <td className="border border-emerald-500/30 p-2">4 SUI</td>
                    <td className="border border-emerald-500/30 p-2">10 $SHROOMS</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-500/30 p-2">Level 3 → 4</td>
                    <td className="border border-emerald-500/30 p-2">6 SUI</td>
                    <td className="border border-emerald-500/30 p-2">15 $SHROOMS</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-500/30 p-2">Level 4 → 5</td>
                    <td className="border border-emerald-500/30 p-2">8 SUI</td>
                    <td className="border border-emerald-500/30 p-2">20 $SHROOMS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Strategy Tips</h2>
            <div className="space-y-3 text-lg">
              <div className="bg-amber-950/30 p-4 rounded border border-amber-500/30">
                <p className="text-amber-300 font-bold">Early Game:</p>
                <p className="text-amber-200">Focus on upgrading to Level 2-3 quickly for better multipliers</p>
              </div>
              <div className="bg-purple-950/30 p-4 rounded border border-purple-500/30">
                <p className="text-purple-300 font-bold">Mid Game:</p>
                <p className="text-purple-200">Balance between planting more mushrooms and upgrading levels</p>
              </div>
              <div className="bg-blue-950/30 p-4 rounded border border-blue-500/30">
                <p className="text-blue-300 font-bold">Late Game:</p>
                <p className="text-blue-200">Maximize mushroom count on high-level farms for maximum yield</p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Time & Epochs</h2>
            <div className="space-y-3 text-lg">
              <p>
                <strong className="text-emerald-300">Epoch Duration:</strong> ~24 hours on Sui Mainnet
              </p>
              <p className="text-emerald-200">
                Sui's epoch system determines harvest timing. Each epoch that passes increases your accumulated yield.
                You can harvest at any time, but waiting longer epochs means bigger harvests.
              </p>
              <p className="text-cyan-300 italic">
                Tip: Check your farm daily to harvest and reinvest for compound growth!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
