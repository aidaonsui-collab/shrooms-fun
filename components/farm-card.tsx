"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sprout, TrendingUp, Sparkles } from "lucide-react"
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit"
import { harvestTransaction, UPGRADE_BASE_COST_SUI, UPGRADE_BASE_COST_SHROOMS } from "@/lib/sui-client"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface FarmCardProps {
  farm: any
}

export function FarmCard({ farm }: FarmCardProps) {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const account = useCurrentAccount()
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const { toast } = useToast()

  const farmId = farm.data?.objectId
  const content = farm.data?.content
  const fields = content?.dataType === "moveObject" ? content.fields : null

  const mushroomCount = fields?.mushroom_count || 0
  const upgradeLevel = fields?.upgrade_level || 1
  const totalHarvested = fields?.total_harvested || 0

  const upgradeCostSui = (UPGRADE_BASE_COST_SUI * upgradeLevel) / 1e9
  const upgradeCostShrooms = (UPGRADE_BASE_COST_SHROOMS * upgradeLevel) / 1e9

  const handleHarvest = () => {
    if (!farmId) return

    setIsHarvesting(true)
    const tx = harvestTransaction(farmId)

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          toast({
            title: "Harvested! 🍄",
            description: "Your $SHROOMS have been collected!",
          })
          setIsHarvesting(false)
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
          setIsHarvesting(false)
        },
      },
    )
  }

  const handleUpgrade = async () => {
    if (!farmId || !account) return

    toast({
      title: "Upgrade Coming Soon! 🚧",
      description: `Will cost ${upgradeCostSui} SUI + ${upgradeCostShrooms} SHROOMS. You need SHROOMS tokens first from harvesting.`,
    })

    // TODO: Implement after user has harvested SHROOMS tokens
    // The upgrade requires both SUI and SHROOMS tokens
    // We need to find the user's SHROOMS coin object first
  }

  return (
    <Card className="p-6 border-4 border-primary bg-card/80 backdrop-blur hover:shadow-2xl transition-all relative overflow-hidden">
      <div className="mb-4 relative bg-gradient-to-br from-green-900/40 to-emerald-800/40 rounded-lg p-8 border-2 border-green-600/50">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=300')] opacity-10 bg-cover bg-center rounded-lg" />

        {/* Mushroom garden visualization */}
        <div className="relative z-10 flex items-end justify-center gap-3 h-32">
          <div className="text-5xl animate-float">🍄</div>
          <div className="text-6xl animate-float" style={{ animationDelay: "0.3s" }}>
            🍄
          </div>
          <div className="text-5xl animate-float" style={{ animationDelay: "0.6s" }}>
            🍄
          </div>
          <div className="text-4xl animate-float" style={{ animationDelay: "0.9s" }}>
            🍄
          </div>
        </div>

        {/* Farmer tending to the farm */}
        <div className="absolute bottom-2 right-2 text-3xl animate-float" style={{ animationDelay: "1.2s" }}>
          👨‍🌾
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-mono">Mushrooms</span>
          <span className="font-bold text-lg flex items-center gap-1">
            <Sprout className="w-4 h-4 text-green-500" />
            {mushroomCount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-mono">Level</span>
          <span className="font-bold text-lg flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            {upgradeLevel}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-mono">Total Earned</span>
          <span className="font-bold text-lg flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            {(Number(totalHarvested) / 1e9).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 font-bold" onClick={handleHarvest} disabled={isHarvesting}>
          {isHarvesting ? "Harvesting..." : "🍄 Harvest"}
        </Button>
        <Button
          variant="outline"
          className="flex-1 font-bold bg-transparent"
          onClick={handleUpgrade}
          disabled={isUpgrading}
          title={`Costs ${upgradeCostSui} SUI + ${upgradeCostShrooms} SHROOMS`}
        >
          ⬆️ Upgrade
        </Button>
      </div>
    </Card>
  )
}
