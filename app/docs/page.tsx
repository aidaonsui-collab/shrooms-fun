import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-cyan-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Game
          </Link>
          <h1 className="text-5xl font-black mb-4">📚 Magic Shrooms Documentation</h1>
          <p className="text-xl text-muted-foreground">Complete guide to the $SHROOMS mushroom farming game on Sui</p>
        </div>

        <div className="grid gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Link href="/docs/getting-started">
              <h2 className="text-2xl font-bold mb-2">🚀 Getting Started</h2>
              <p className="text-muted-foreground">
                Learn how to set up your wallet, create your first farm, and start earning $SHROOMS
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Link href="/docs/game-mechanics">
              <h2 className="text-2xl font-bold mb-2">🎮 Game Mechanics</h2>
              <p className="text-muted-foreground">
                Understand farms, harvesting, upgrades, planting, and yield calculations
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Link href="/docs/tokenomics">
              <h2 className="text-2xl font-bold mb-2">💰 Tokenomics</h2>
              <p className="text-muted-foreground">
                Token supply, distribution, burning mechanisms, and economic model
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Link href="/docs/smart-contract">
              <h2 className="text-2xl font-bold mb-2">⚙️ Smart Contract</h2>
              <p className="text-muted-foreground">
                Technical documentation, functions, parameters, and integration examples
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Link href="/docs/faq">
              <h2 className="text-2xl font-bold mb-2">❓ FAQ</h2>
              <p className="text-muted-foreground">Frequently asked questions and answers about the game</p>
            </Link>
          </Card>
        </div>

        <Card className="p-6 bg-primary/10 border-primary">
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <div className="space-y-2">
            <div>
              <strong>Package ID:</strong>{" "}
              <code className="bg-background px-2 py-1 rounded text-sm">
                0xbe233592771a13766ea4a66c0c0486eabd33c9c8138e8b186b5f920f1992afd1
              </code>
            </div>
            <div>
              <strong>GameState ID:</strong>{" "}
              <code className="bg-background px-2 py-1 rounded text-sm">
                0x3afb9c0c86a095a069046d65ac17bfd5cc0662fcc501a35bae4525655c2e34ac
              </code>
            </div>
            <div>
              <strong>Network:</strong> Sui Mainnet
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
