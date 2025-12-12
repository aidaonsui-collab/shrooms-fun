export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-teal-950 to-cyan-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/docs" className="text-emerald-400 hover:text-emerald-300 font-mono text-sm">
            ← Back to Docs
          </a>
        </div>

        <h1 className="text-5xl font-bold text-emerald-400 mb-8 font-mono">Frequently Asked Questions</h1>

        <div className="space-y-6 text-emerald-100">
          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">What is Magic Shrooms?</h2>
            <p className="text-emerald-200">
              Magic Shrooms is a blockchain game on Sui where you grow mushroom farms, harvest $SHROOMS tokens, and
              optimize your strategy for maximum yield. It's a play-to-earn idle game with deflationary tokenomics.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">How do I start playing?</h2>
            <p className="text-emerald-200">
              Connect a Sui wallet (like Sui Wallet or Suiet), get at least 10 SUI, and click "Create Farm" on the
              homepage. You'll receive a Farm NFT with 10 mushrooms at Level 1.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">How much does it cost to play?</h2>
            <p className="text-emerald-200">
              Creating a farm costs 10 SUI. After that, you can harvest for free (only gas fees). Expanding and
              upgrading require $SHROOMS tokens and additional SUI.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">How often should I harvest?</h2>
            <p className="text-emerald-200">
              You can harvest as often as you want! However, waiting longer epochs means bigger harvests in a single
              transaction (saving on gas fees). Most players harvest daily.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">What is an epoch?</h2>
            <p className="text-emerald-200">
              An epoch is Sui's time unit, lasting approximately 24 hours. Your harvest yield is calculated based on how
              many epochs have passed since your last harvest.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Should I upgrade or plant more mushrooms?</h2>
            <p className="text-emerald-200">
              Early game: Upgrade to Level 2-3 for better multipliers. Mid-late game: Balance both. High levels with
              many mushrooms = maximum yield!
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Can I have multiple farms?</h2>
            <p className="text-emerald-200">
              Yes! You can create as many farms as you want. Each farm is an independent NFT that you own and can manage
              separately.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Can I sell or trade my farm?</h2>
            <p className="text-emerald-200">
              Yes! Farms are NFTs with the "store" ability, meaning they can be transferred, sold on NFT marketplaces,
              or traded peer-to-peer.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Where can I trade $SHROOMS?</h2>
            <p className="text-emerald-200">
              $SHROOMS can be traded on Sui DEXs like Cetus, Turbos, or any DEX that supports standard Sui coins. Check
              the community links for current liquidity pools.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Is there a maximum supply of $SHROOMS?</h2>
            <p className="text-emerald-200">
              No hard cap, but the burning mechanism creates deflationary pressure. As more tokens are used for planting
              and upgrades, they're permanently removed from circulation.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">What happens to the SUI I pay?</h2>
            <p className="text-emerald-200">
              SUI from farm creation and upgrades goes into the fee pool. This can fund development, marketing,
              liquidity, or community rewards. Withdrawals are publicly visible on-chain.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Is the contract audited?</h2>
            <p className="text-emerald-200">
              Not yet. The contract is open source and verifiable on-chain. A professional audit is planned if TVL
              exceeds 10,000 SUI. Always DYOR and only invest what you can afford to lose.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Can the contract be upgraded?</h2>
            <p className="text-emerald-200">
              Yes, the dev holds an UpgradeCap for bug fixes and improvements. All upgrades are transparent and visible
              on-chain.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">What wallets are supported?</h2>
            <p className="text-emerald-200">
              Any Sui wallet! Popular options include Sui Wallet, Suiet, Ethos, and Martian. The game uses the standard
              @mysten/dapp-kit integration.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">I'm getting transaction errors. What do I do?</h2>
            <p className="text-emerald-200">
              Common issues: (1) Insufficient SUI for gas, (2) Insufficient $SHROOMS for actions, (3) Network
              congestion. Try increasing your gas budget or waiting a moment.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">My farm isn't showing up. Help!</h2>
            <p className="text-emerald-200">
              Refresh the page or disconnect/reconnect your wallet. If it still doesn't appear, check the transaction on
              SuiVision to verify the farm was created successfully.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">How do I calculate my potential earnings?</h2>
            <p className="text-emerald-200">
              Use the formula: yield = mushrooms × epochs × level × 0.05. For example, 50 mushrooms at Level 3 over 7
              days = 50 × 7 × 3 × 0.05 = 52.5 $SHROOMS.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Is there a maximum farm level?</h2>
            <p className="text-emerald-200">
              Technically no, but upgrade costs increase linearly. Most players stop around Level 5-10 and focus on
              expanding mushroom count instead.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">What's the optimal strategy?</h2>
            <p className="text-emerald-200">
              It depends on your goals! Conservative: Upgrade to Level 3-4, harvest regularly. Aggressive: Max out
              mushroom count on multiple farms. YOLO: Create many farms and speculate on $SHROOMS price.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Can I lose my farm?</h2>
            <p className="text-emerald-200">
              No! Your farm is an NFT you fully own. As long as you control your wallet's private keys, your farm is
              safe. Standard crypto security best practices apply.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Are there any hidden fees?</h2>
            <p className="text-emerald-200">
              No hidden fees! All costs are transparent: 10 SUI to create, 2×level SUI to upgrade, 0.1 $SHROOMS to
              plant. Plus standard Sui gas fees (~0.001 SUI per transaction).
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Is this a Ponzi scheme?</h2>
            <p className="text-emerald-200">
              No. There's no recruitment, no referral system, and no promise of returns from new players. $SHROOMS value
              is determined by market demand and utility within the game.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">How is this different from other farming games?</h2>
            <p className="text-emerald-200">
              Magic Shrooms runs entirely on-chain with no backend servers. Your farms are real NFTs, $SHROOMS is a real
              token, and all logic is transparent in the smart contract.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Can I automate harvesting?</h2>
            <p className="text-emerald-200">
              You could write a script using the Sui SDK, but you'd still pay gas fees for each transaction. Most
              players find daily manual harvesting more efficient.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Will there be more features?</h2>
            <p className="text-emerald-200">
              Possibly! The contract is upgradeable, so new features, mushroom types, or game mechanics could be added
              based on community feedback and development resources.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Who created Magic Shrooms?</h2>
            <p className="text-emerald-200">
              An anonymous developer on the Sui blockchain. The contract is open source and the project is
              community-driven. Join the community channels to get involved!
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Where can I get help?</h2>
            <p className="text-emerald-200">
              Check the documentation, join the Telegram/Discord community, or ask questions on social media. The
              community is friendly and helpful!
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Is there a mobile app?</h2>
            <p className="text-emerald-200">
              Not yet, but the web app works on mobile browsers! Use a mobile wallet like Suiet or Martian that supports
              in-app browsers to play on your phone.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Can I contribute to the project?</h2>
            <p className="text-emerald-200">
              Yes! The project is open to community contributions. Whether it's code, design, marketing, or ideas, reach
              out through community channels to get involved.
            </p>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">What's the long-term vision?</h2>
            <p className="text-emerald-200">
              To create a fun, sustainable play-to-earn ecosystem on Sui with transparent tokenomics and community
              governance. The game evolves based on player feedback and sustainable growth.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
