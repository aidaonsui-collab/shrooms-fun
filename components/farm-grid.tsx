"use client"

import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit"
import { Transaction } from "@mysten/sui/transactions"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/lib/simple-toast"

interface Farm {
  id: string
  mushroom_count: string
  level: string
  last_harvest_timestamp: string // Changed from epoch to timestamp
  owner: string
  created_at_epoch: string
}

export function FarmGrid() {
  const account = useCurrentAccount()
  const client = useSuiClient()
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
  const { toast } = useToast()

  const [userFarms, setUserFarms] = useState<Farm[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState<string | null>(null)
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(Date.now()) // Track current time for countdown

  const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || ""
  const GAME_STATE_ID = process.env.NEXT_PUBLIC_GAME_STATE_ID || ""
  const REFERRAL_SYSTEM_ID = process.env.NEXT_PUBLIC_REFERRAL_SYSTEM_ID || "" // Added referral system ID constant
  const CLOCK_ID = "0x6" // Sui Clock object ID

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchUserFarms = async () => {
      if (!account?.address) return

      try {
        const gameStateObj = await client.getObject({
          id: GAME_STATE_ID,
          options: { showContent: true },
        })

        if (gameStateObj.data?.content?.dataType === "moveObject") {
          const fields = gameStateObj.data.content.fields as any
          const allFarms = fields.farms || []

          const myFarms = allFarms
            .filter((farm: any) => farm.fields.owner === account.address)
            .map((farm: any, index: number) => ({
              id: farm.fields.id || String(index),
              mushroom_count: farm.fields.mushrooms || "0",
              level: farm.fields.level || "1",
              last_harvest_timestamp: farm.fields.last_harvest_timestamp || "0", // Updated field name
              owner: farm.fields.owner,
              created_at_epoch: farm.fields.created_at_epoch || "0",
            }))

          setUserFarms(myFarms)
        }
      } catch (error) {
        console.error("Error fetching user farms:", error)
      }
    }

    fetchUserFarms()
    const interval = setInterval(fetchUserFarms, 10000)
    return () => clearInterval(interval)
  }, [client, account?.address, GAME_STATE_ID])

  const handleCreateFarm = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a farm",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)
    try {
      const tx = new Transaction()
      const [coin] = tx.splitCoins(tx.gas, [10_000_000_000])
      tx.moveCall({
        target: `${PACKAGE_ID}::shrooms_token::create_farm`,
        arguments: [tx.object(GAME_STATE_ID), coin, tx.object(CLOCK_ID)],
      })

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: () => {
            toast({
              title: "Farm created!",
              description: "Your mushroom farm has been created successfully",
            })
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            })
          },
        },
      )
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleHarvest = async (farmId: string) => {
    setIsHarvesting(farmId)
    try {
      const tx = new Transaction()
      tx.moveCall({
        target: `${PACKAGE_ID}::shrooms_token::harvest`,
        arguments: [
          tx.object(GAME_STATE_ID),
          tx.object(REFERRAL_SYSTEM_ID), // Referral system for reward distribution
          tx.pure.u64(farmId),
          tx.object(CLOCK_ID),
        ],
      })

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: () => {
            toast({
              title: "Harvested!",
              description: "Your $SHROOMS have been harvested successfully",
            })
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            })
          },
        },
      )
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsHarvesting(null)
    }
  }

  const handleUpgrade = async (farmId: string) => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to upgrade",
        variant: "destructive",
      })
      return
    }

    setIsUpgrading(farmId)
    try {
      const tx = new Transaction()
      const [coin] = tx.splitCoins(tx.gas, [5_000_000_000]) // 5 SUI upgrade cost
      tx.moveCall({
        target: `${PACKAGE_ID}::shrooms_token::upgrade_farm`,
        arguments: [tx.object(GAME_STATE_ID), coin, tx.pure.u64(farmId)],
      })

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: () => {
            toast({
              title: "Farm upgraded!",
              description: "Your farm level has been increased",
            })
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            })
          },
        },
      )
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsUpgrading(null)
    }
  }

  const canHarvest = (lastHarvestTimestamp: string) => {
    const lastHarvest = Number(lastHarvestTimestamp)
    const timePassed = currentTime - lastHarvest
    return timePassed >= 300000 // 5 minutes in milliseconds
  }

  const getTimeUntilHarvest = (lastHarvestTimestamp: string) => {
    const lastHarvest = Number(lastHarvestTimestamp)
    const timePassed = currentTime - lastHarvest
    const timeRemaining = 300000 - timePassed // 5 minutes in ms

    if (timeRemaining <= 0) return "Ready!"

    const minutes = Math.floor(timeRemaining / 60000)
    const seconds = Math.floor((timeRemaining % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  const getAccumulatedYield = (mushrooms: string, level: string, lastHarvestTimestamp: string) => {
    const mushroomCount = Number(mushrooms)
    const farmLevel = Number(level)
    const timePassed = currentTime - Number(lastHarvestTimestamp)
    const hoursPassed = timePassed / 3600000

    const yield_per_hour = mushroomCount * 1 * farmLevel // 1 token per mushroom per hour * level
    const totalYield = yield_per_hour * hoursPassed

    return totalYield.toFixed(2)
  }

  return (
    <div className="space-y-4">
      {userFarms.length > 0 && <h2 className="text-2xl font-bold text-white pixelated">Your Farms</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userFarms.map((farm) => {
          const harvestReady = canHarvest(farm.last_harvest_timestamp)
          const timeUntilHarvest = getTimeUntilHarvest(farm.last_harvest_timestamp)
          const accumulatedYield = getAccumulatedYield(farm.mushroom_count, farm.level, farm.last_harvest_timestamp)

          return (
            <Card key={farm.id} className="p-6 border-4 border-green-500 bg-[#8b7355]">
              <div className="text-center space-y-4">
                <div className="text-5xl animate-rock inline-block">👨‍🌾</div>
                <h3 className="text-xl font-bold text-white pixelated">Farm Level {farm.level}</h3>
                <div className="space-y-2 text-sm text-gray-200 pixelated">
                  <p>🍄 Base Mushrooms: {farm.mushroom_count}</p>
                  <p>⭐ Level Multiplier: {farm.level}x</p>
                  <p>💰 Yield Ready: {accumulatedYield} $SHROOMS</p>
                  <p>📅 Created: Epoch {farm.created_at_epoch}</p>
                  {!harvestReady && <p className="text-yellow-300">⏳ Next harvest: {timeUntilHarvest}</p>}
                  {harvestReady && <p className="text-green-300 animate-pulse">✨ Ready to harvest!</p>}
                </div>
                <div className="space-y-3 pt-2">
                  <Button
                    onClick={() => handleHarvest(farm.id)}
                    disabled={isHarvesting === farm.id || !harvestReady}
                    className="w-full bg-green-600 hover:bg-green-700 pixelated disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3"
                  >
                    {isHarvesting === farm.id
                      ? "HARVESTING..."
                      : !harvestReady
                        ? `WAIT ${timeUntilHarvest}`
                        : "HARVEST"}
                  </Button>
                  <Button
                    onClick={() => handleUpgrade(farm.id)}
                    disabled={isUpgrading === farm.id}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 border-2 border-purple-400"
                  >
                    {isUpgrading === farm.id ? "UPGRADING..." : `⬆️ UPGRADE (5 SUI)`}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}

        <Card className="p-12 border-4 border-green-500 bg-[#8b7355] relative">
          <div className="absolute top-2 left-2 text-3xl">🍄</div>
          <div className="absolute bottom-2 right-2 text-3xl">🍄</div>

          <div className="text-center space-y-6">
            <div className="space-y-2">
              <div className="text-6xl animate-rock inline-block">👨‍🌾</div>
              <div className="text-6xl">+</div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white pixelated mb-2">Create New Farm</h2>
              <p className="text-gray-200 mb-4 pixelated">Start growing magic mushrooms</p>
              <p className="text-sm text-gray-300 pixelated">💰 Cost: 10 SUI</p>
            </div>
            <Button
              onClick={handleCreateFarm}
              disabled={isCreating || !account}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg pixelated"
            >
              {isCreating ? "CREATING..." : "CREATE FARM"}
            </Button>
            {!account && <p className="text-sm text-gray-300 pixelated">Connect your wallet to create a farm</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}
