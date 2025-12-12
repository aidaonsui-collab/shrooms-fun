export default function TokenomicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-teal-950 to-cyan-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/docs" className="text-emerald-400 hover:text-emerald-300 font-mono text-sm">
            ← Back to Docs
          </a>
        </div>

        <h1 className="text-5xl font-bold text-emerald-400 mb-8 font-mono">Tokenomics</h1>

        <div className="space-y-8 text-emerald-100">
          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">$SHROOMS Token</h2>
            <div className="space-y-3 text-lg">
              <p>
                <strong className="text-emerald-300">Token Type:</strong> Sui Coin Standard
              </p>
              <p>
                <strong className="text-emerald-300">Decimals:</strong> 9
              </p>
              <p>
                <strong className="text-emerald-300">Symbol:</strong> SHROOMS
              </p>
              <p>
                <strong className="text-emerald-300">Initial Supply:</strong> 0 (no pre-mint)
              </p>
              <p>
                <strong className="text-emerald-300">Max Supply:</strong> Unlimited (deflationary through burning)
              </p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Token Distribution</h2>
            <div className="space-y-4 text-lg">
              <div className="bg-emerald-950/50 p-4 rounded border border-emerald-500/20">
                <p className="text-emerald-300 font-bold mb-2">100% Fair Launch</p>
                <p className="text-emerald-200">
                  All $SHROOMS tokens are minted through gameplay. There is NO pre-mine, NO team allocation, and NO
                  investor tokens.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-emerald-300 font-bold">Token Sources:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Harvesting farms (minting)</li>
                  <li>Game rewards (minting)</li>
                </ul>
              </div>

              <div className="space-y-2 mt-4">
                <p className="text-emerald-300 font-bold">Token Sinks:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Planting mushrooms (burning)</li>
                  <li>Upgrading farms (burning)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Minting Mechanism</h2>
            <div className="space-y-4 text-lg">
              <p className="text-emerald-200">
                $SHROOMS tokens are minted when players harvest their farms. The minting rate is determined by:
              </p>
              <div className="bg-emerald-950/50 p-4 rounded border border-emerald-500/20 font-mono">
                <p className="text-xl">mint_amount = mushrooms × epochs × level × 0.05</p>
              </div>

              <div className="mt-6 bg-cyan-950/30 p-4 rounded border border-cyan-500/30">
                <p className="text-cyan-300 font-bold mb-2">Example Scenarios:</p>
                <div className="space-y-2 font-mono text-sm">
                  <p>10 mushrooms, Level 1, 1 day: 10 × 1 × 1 × 0.05 = 0.5 $SHROOMS</p>
                  <p>50 mushrooms, Level 2, 7 days: 50 × 7 × 2 × 0.05 = 35 $SHROOMS</p>
                  <p>100 mushrooms, Level 5, 30 days: 100 × 30 × 5 × 0.05 = 750 $SHROOMS</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Burning Mechanism</h2>
            <div className="space-y-4 text-lg">
              <p className="text-emerald-200">
                $SHROOMS tokens are permanently removed from circulation through burning when used in-game:
              </p>

              <div className="space-y-3">
                <div className="bg-red-950/30 p-4 rounded border border-red-500/30">
                  <p className="text-red-300 font-bold">Planting Mushrooms</p>
                  <p className="text-red-200">0.1 $SHROOMS burned per mushroom planted</p>
                </div>

                <div className="bg-red-950/30 p-4 rounded border border-red-500/30">
                  <p className="text-red-300 font-bold">Farm Upgrades</p>
                  <p className="text-red-200">5 × level $SHROOMS burned per upgrade</p>
                  <p className="text-sm text-red-300 mt-2">Level 1→2: 5 burned, Level 2→3: 10 burned, etc.</p>
                </div>
              </div>

              <p className="text-cyan-300 italic mt-4">
                As the game matures, burning can outpace minting, making $SHROOMS deflationary!
              </p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">SUI Economics</h2>
            <div className="space-y-4 text-lg">
              <p className="text-emerald-200">SUI is used for game actions and accumulates in the fee pool:</p>

              <div className="space-y-3">
                <div className="bg-blue-950/30 p-4 rounded border border-blue-500/30">
                  <p className="text-blue-300 font-bold">Farm Creation</p>
                  <p className="text-blue-200">10 SUI → Fee Pool</p>
                </div>

                <div className="bg-blue-950/30 p-4 rounded border border-blue-500/30">
                  <p className="text-blue-300 font-bold">Farm Upgrades</p>
                  <p className="text-blue-200">2 × level SUI → Fee Pool</p>
                  <p className="text-sm text-blue-300 mt-2">Level 1→2: 2 SUI, Level 2→3: 4 SUI, etc.</p>
                </div>
              </div>

              <div className="mt-4 bg-amber-950/30 p-4 rounded border border-amber-500/30">
                <p className="text-amber-300 font-bold">Fee Pool</p>
                <p className="text-amber-200">
                  Accumulated SUI can be used for future game development, marketing, liquidity provision, or community
                  rewards as decided by governance.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Supply Projections</h2>
            <div className="space-y-4 text-lg">
              <p className="text-emerald-200">Supply growth depends on player behavior. Here are example scenarios:</p>

              <table className="w-full mt-4 border border-emerald-500/30 text-sm">
                <thead className="bg-emerald-900/30">
                  <tr>
                    <th className="border border-emerald-500/30 p-2">Timeframe</th>
                    <th className="border border-emerald-500/30 p-2">Farms</th>
                    <th className="border border-emerald-500/30 p-2">Estimated Supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-emerald-500/30 p-2">Month 1</td>
                    <td className="border border-emerald-500/30 p-2">100</td>
                    <td className="border border-emerald-500/30 p-2">~45,000 $SHROOMS</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-500/30 p-2">Month 3</td>
                    <td className="border border-emerald-500/30 p-2">500</td>
                    <td className="border border-emerald-500/30 p-2">~675,000 $SHROOMS</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-500/30 p-2">Month 6</td>
                    <td className="border border-emerald-500/30 p-2">1,000</td>
                    <td className="border border-emerald-500/30 p-2">~2,700,000 $SHROOMS</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-500/30 p-2">Year 1</td>
                    <td className="border border-emerald-500/30 p-2">5,000</td>
                    <td className="border border-emerald-500/30 p-2">~27,000,000 $SHROOMS</td>
                  </tr>
                </tbody>
              </table>

              <p className="text-sm text-emerald-300 italic mt-4">
                *Assumptions: Average 30 mushrooms/farm, Level 3 average, 50% of tokens burned through
                replanting/upgrades
              </p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4 font-mono">Value Accrual</h2>
            <div className="space-y-3 text-lg">
              <p className="text-emerald-200">$SHROOMS value comes from:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-emerald-200">
                <li>
                  <strong>Utility:</strong> Required to expand and upgrade farms
                </li>
                <li>
                  <strong>Scarcity:</strong> Burning mechanism creates deflationary pressure
                </li>
                <li>
                  <strong>Growth:</strong> More players = more demand for tokens
                </li>
                <li>
                  <strong>Speculation:</strong> Secondary market trading potential
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
