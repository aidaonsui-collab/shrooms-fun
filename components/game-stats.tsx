"use client"

import { useSuiClient } from "@mysten/dapp-kit"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export function GameStats() {
  const client = useSuiClient()
  const [totalFarms, setTotalFarms] = useState(0)
  const [totalYieldReady, setTotalYieldReady] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)

  const GAME_STATE_ID = process.env.NEXT_PUBLIC_GAME_STATE_ID

  useEffect(() => {
    if (!GAME_STATE_ID) {
      console.warn("[v0] NEXT_PUBLIC_GAME_STATE_ID not set. Please configure it in Vercel environment variables.")
      return
    }

    const fetchGameStats = async () => {
      try {
        const gameState = await client.getObject({
          id: GAME_STATE_ID,
          options: { showContent: true },
        })

        if (gameState.data?.content?.dataType === "moveObject") {
          const fields = gameState.data.content.fields as any

          setTotalFarms(Number(fields.total_farms || 0))

          const farms = fields.farms || []
          const currentTime = Date.now()

          const totalYield = farms.reduce((sum: number, farm: any) => {
            const mushrooms = Number(farm.fields?.mushrooms || 0)
            const level = Number(farm.fields?.level || 1)
            const lastHarvest = Number(farm.fields?.last_harvest_timestamp || 0)
            const timePassed = currentTime - lastHarvest

            const hoursPassed = timePassed / 3600000
            const yieldAmount = mushrooms * hoursPassed * 1 * level // 1 token/hour/mushroom

            return sum + yieldAmount
          }, 0)

          setTotalYieldReady(Math.floor(totalYield))

          const supply = Number(fields.treasury_cap?.fields?.total_supply?.fields?.value || 0)
          setTotalSupply(supply)
        }
      } catch (error) {
        console.error("Error fetching game stats:", error)
      }
    }

    fetchGameStats()
    const interval = setInterval(fetchGameStats, 5000)
    return () => clearInterval(interval)
  }, [client, GAME_STATE_ID])

  const supplyInMillions = (totalSupply / 1_000_000_000 / 1_000_000).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6 border-4 border-green-500 bg-[#8b7355]">
        <p className="text-sm font-medium text-amber-200 mb-2">Total Farms</p>
        <p className="text-4xl font-bold text-green-400">{totalFarms}</p>
      </Card>
      <Card className="p-6 border-4 border-purple-500 bg-[#8b7355]">
        <p className="text-sm font-medium text-purple-200 mb-2">Total Yield Ready</p>
        <p className="text-4xl font-bold text-purple-400">{totalYieldReady} $SHROOMS</p>
      </Card>
      <Card className="p-6 border-4 border-pink-500 bg-[#8b7355]">
        <p className="text-sm font-medium text-pink-200 mb-2">$SHROOMS Supply</p>
        <p className="text-4xl font-bold text-pink-400">{supplyInMillions}M</p>
      </Card>
    </div>
  )
}
