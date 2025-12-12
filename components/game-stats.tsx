"use client"

import { Card } from "@/components/ui/card"
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit"
import { CONTRACT_CONFIG } from "@/lib/sui-client"

export function GameStats() {
  const account = useCurrentAccount()

  const { data: gameState } = useSuiClientQuery(
    "getObject",
    {
      id: CONTRACT_CONFIG.gameStateId,
      options: { showContent: true },
    },
    { enabled: !!account },
  )

  const content = gameState?.data?.content
  const fields = content?.dataType === "moveObject" ? content.fields : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-6 border-4 border-primary bg-card/80 backdrop-blur">
        <div className="text-sm text-muted-foreground mb-1 font-mono">Total Farms</div>
        <div className="text-4xl font-black text-primary">{fields?.total_farms || "---"}</div>
      </Card>

      <Card className="p-6 border-4 border-purple-500 bg-card/80 backdrop-blur">
        <div className="text-sm text-muted-foreground mb-1 font-mono">Total Harvested</div>
        <div className="text-4xl font-black text-purple-600">
          {fields?.total_harvested ? (Number(fields.total_harvested) / 1e9).toFixed(2) : "---"}
        </div>
      </Card>

      <Card className="p-6 border-4 border-pink-500 bg-card/80 backdrop-blur">
        <div className="text-sm text-muted-foreground mb-1 font-mono">$SHROOMS Supply</div>
        <div className="text-4xl font-black text-pink-600">420M</div>
      </Card>
    </div>
  )
}
