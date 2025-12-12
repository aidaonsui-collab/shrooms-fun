import Link from "next/link"

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-teal-950 to-cyan-950 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/docs" className="text-emerald-400 hover:text-emerald-300 mb-4 inline-block font-mono text-sm">
          ← Back to Docs
        </Link>

        <h1 className="text-5xl font-bold mb-6 text-emerald-400 font-mono">Getting Started with Magic Shrooms</h1>

        <p className="text-lg mb-8 text-emerald-100 leading-relaxed">
          Welcome to Magic Shrooms! This guide will help you start farming mushrooms and earning $SHROOMS tokens on the
          Sui blockchain.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-emerald-400 font-mono">What You'll Need</h2>
        <ul className="list-disc list-inside space-y-2 text-emerald-100 mb-8">
          <li>
            <strong className="text-emerald-200">Sui Wallet</strong> - We recommend Sui Wallet or Suiet
          </li>
          <li>
            <strong className="text-emerald-200">SUI Tokens</strong> - At least 15 SUI to start (10 for farm + 5 for
            gas/upgrades)
          </li>
          <li>
            <strong className="text-emerald-200">Mainnet Connection</strong> - Make sure your wallet is on Sui Mainnet
          </li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-emerald-400 font-mono">Step 1: Set Up Your Wallet</h2>
        <div className="p-6 my-6 bg-black/30 rounded-lg border border-emerald-500/30">
          <h3 className="mt-0 text-2xl font-bold mb-4 text-emerald-400 font-mono">Install a Sui Wallet</h3>
          <ol className="list-decimal list-inside space-y-2 text-emerald-100">
            <li>
              Go to{" "}
              <a
                href="https://suiwallet.com"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                suiwallet.com
              </a>{" "}
              or{" "}
              <a
                href="https://suiet.app"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                suiet.app
              </a>
            </li>
            <li>Install the browser extension</li>
            <li>Create a new wallet or import existing one</li>
            <li>
              <strong className="text-emerald-200">IMPORTANT:</strong> Save your seed phrase securely!
            </li>
          </ol>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Switch to Mainnet</h3>
        <ol className="list-decimal list-inside space-y-2 text-emerald-100 mb-8">
          <li>Open your wallet extension</li>
          <li>Click the network selector (usually top-right)</li>
          <li>Select "Mainnet"</li>
        </ol>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Get SUI Tokens</h3>
        <p className="text-emerald-100 mb-4">You can buy SUI from:</p>
        <ul className="list-disc list-inside space-y-2 text-emerald-100 mb-8">
          <li>Centralized exchanges (Binance, Coinbase, OKX)</li>
          <li>Decentralized exchanges on Sui</li>
          <li>Bridge from other chains</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-emerald-400 font-mono">Step 2: Create Your First Farm</h2>
        <div className="p-6 my-6 bg-black/30 rounded-lg border border-emerald-500/30">
          <ol className="list-decimal list-inside space-y-2 text-emerald-100">
            <li>
              Visit <strong className="text-emerald-200">shrooms.fun</strong> (or wherever you're hosting the game)
            </li>
            <li>Click "Connect Wallet" in the top-right</li>
            <li>Select your wallet and approve the connection</li>
            <li>Click "Create New Farm"</li>
            <li>Approve the transaction for 10 SUI</li>
            <li>Wait for confirmation - your farm is created!</li>
          </ol>
        </div>

        <p className="text-emerald-100 mb-2">
          <strong className="text-emerald-200">What you get:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 text-emerald-100 mb-8">
          <li>1 Farm NFT (owned by you)</li>
          <li>10 mushrooms ready to grow</li>
          <li>Level 1 farm</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-emerald-400 font-mono">Step 3: Start Earning</h2>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Harvest Your Mushrooms</h3>
        <p className="text-emerald-100 mb-4">
          Mushrooms grow automatically based on Sui epochs (approximately every 24 hours):
        </p>
        <ol className="list-decimal list-inside space-y-2 text-emerald-100 mb-8">
          <li>Wait for epochs to pass</li>
          <li>Click "Harvest" on your farm card</li>
          <li>Approve the transaction</li>
          <li>Receive $SHROOMS tokens!</li>
        </ol>

        <div className="p-6 my-6 bg-black/30 rounded-lg border border-emerald-500/30">
          <h4 className="mt-0 text-xl font-bold mb-2 text-emerald-400 font-mono">Harvest Formula</h4>
          <code className="text-sm text-emerald-100 block mb-4 bg-emerald-950/50 p-3 rounded font-mono border border-emerald-500/20">
            yield = mushroom_count × epochs_passed × upgrade_level × 0.05
          </code>
          <p className="text-sm text-emerald-100 mb-0">
            <strong className="text-emerald-200">Example:</strong> 10 mushrooms × 1 epoch × Level 1 × 0.05 = 0.5
            $SHROOMS
          </p>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Upgrade Your Farm</h3>
        <p className="text-emerald-100 mb-4">Increase your earnings by upgrading:</p>
        <ol className="list-decimal list-inside space-y-2 text-emerald-100 mb-8">
          <li>Harvest some $SHROOMS first</li>
          <li>Click "Upgrade" on your farm</li>
          <li>Pay the upgrade cost (2 SUI + 5 $SHROOMS for Level 1→2)</li>
          <li>Your farm level increases!</li>
        </ol>

        <p className="text-emerald-100 mb-2">
          <strong className="text-emerald-200">Upgrade Costs:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 text-emerald-100 mb-8">
          <li>Level 1 → 2: 2 SUI + 5 $SHROOMS</li>
          <li>Level 2 → 3: 4 SUI + 10 $SHROOMS</li>
          <li>Level 3 → 4: 6 SUI + 15 $SHROOMS</li>
          <li>And so on...</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-emerald-400 font-mono">Step 4: Scale Your Operation</h2>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Plant More Mushrooms</h3>
        <p className="text-emerald-100 mb-4">Use your harvested $SHROOMS to grow your farm:</p>
        <ol className="list-decimal list-inside space-y-2 text-emerald-100 mb-8">
          <li>Click "Plant" (not shown in current UI - coming soon)</li>
          <li>Enter number of mushrooms</li>
          <li>Pay 0.1 $SHROOMS per mushroom</li>
          <li>Your mushroom count increases!</li>
        </ol>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Create Multiple Farms</h3>
        <p className="text-emerald-100 mb-4">You can own multiple farms:</p>
        <ul className="list-disc list-inside space-y-2 text-emerald-100 mb-8">
          <li>Each farm costs 10 SUI</li>
          <li>Each operates independently</li>
          <li>Harvest and upgrade each separately</li>
          <li>Scale your earnings exponentially!</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-emerald-400 font-mono">Pro Tips</h2>
        <div className="p-6 my-6 bg-black/30 rounded-lg border border-amber-500/30">
          <ul className="mb-0 space-y-2 text-emerald-100">
            <li>
              <strong className="text-amber-300">Harvest regularly</strong> - Don't let epochs go to waste
            </li>
            <li>
              <strong className="text-amber-300">Upgrade early</strong> - Higher levels = faster growth
            </li>
            <li>
              <strong className="text-amber-300">Reinvest $SHROOMS</strong> - Plant mushrooms to compound earnings
            </li>
            <li>
              <strong className="text-amber-300">Create multiple farms</strong> - Diversify your mushroom portfolio
            </li>
            <li>
              <strong className="text-amber-300">Check epoch timing</strong> - Sui epochs are ~24 hours
            </li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-emerald-400 font-mono">Troubleshooting</h2>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Transaction Failed</h3>
        <ul className="list-disc list-inside space-y-2 text-emerald-100 mb-8">
          <li>Check you have enough SUI for gas (~0.01 SUI per transaction)</li>
          <li>Ensure you're on Mainnet, not Testnet</li>
          <li>Try increasing gas budget in wallet settings</li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Can't See My Farm</h3>
        <ul className="list-disc list-inside space-y-2 text-emerald-100 mb-8">
          <li>Refresh the page</li>
          <li>Check you're connected with the correct wallet</li>
          <li>
            Verify transaction was successful on{" "}
            <a
              href="https://suivision.xyz"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              SuiVision
            </a>
          </li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-emerald-400 font-mono">Harvest Shows 0 $SHROOMS</h3>
        <ul className="list-disc list-inside space-y-2 text-emerald-100 mb-8">
          <li>Make sure at least 1 epoch has passed since last harvest</li>
          <li>Check current epoch on a Sui explorer</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-emerald-400 font-mono">Next Steps</h2>
        <div className="grid gap-4 my-6">
          <div className="p-4 bg-black/30 rounded-lg border border-emerald-500/30 hover:border-emerald-400 transition-colors">
            <Link
              href="/docs/game-mechanics"
              className="text-xl font-bold text-emerald-400 font-mono hover:text-emerald-300"
            >
              Learn Game Mechanics →
            </Link>
            <p className="text-sm text-emerald-200 mb-0 mt-2">
              Deep dive into farms, harvesting, and yield calculations
            </p>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-emerald-500/30 hover:border-emerald-400 transition-colors">
            <Link
              href="/docs/tokenomics"
              className="text-xl font-bold text-emerald-400 font-mono hover:text-emerald-300"
            >
              Understand Tokenomics →
            </Link>
            <p className="text-sm text-emerald-200 mb-0 mt-2">Learn about $SHROOMS supply, distribution, and burning</p>
          </div>
        </div>

        <hr className="border-emerald-500/30 my-8" />
        <p className="text-center text-emerald-200">
          Need more help? Check the{" "}
          <Link href="/docs/faq" className="text-emerald-400 hover:text-emerald-300 underline">
            FAQ
          </Link>
        </p>
      </div>
    </div>
  )
}
