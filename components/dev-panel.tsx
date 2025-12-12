"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit"
import { Transaction } from "@mysten/sui/transactions"
import { CONTRACT_CONFIG, suiClient } from "@/lib/sui-client"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Coins } from "lucide-react"

const DEV_WALLET = "0x2c478b5f158e037cb21b3443a5a3512f6fee0b9a16d7a261baa00ddca69d6fc5"

export function DevPanel() {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const account = useCurrentAccount()
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [feePoolBalance, setFeePoolBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const [isDevWallet, setIsDevWallet] = useState(false)

  useEffect(() => {
    setIsDevWallet(!!account && account.address === DEV_WALLET)
  }, [account])

  useEffect(() => {
    if (!isDevWallet) return

    const fetchFeePoolBalance = async () => {
      try {
        const gameState = await suiClient.getObject({
          id: CONTRACT_CONFIG.gameStateId,
          options: { showContent: true },
        })

        console.log("[v0] GameState object:", JSON.stringify(gameState, null, 2))

        if (gameState.data?.content && "fields" in gameState.data.content) {
          const fields = gameState.data.content.fields as any
          console.log("[v0] GameState fields:", fields)

          let balance = 0
          if (fields.fee_pool && typeof fields.fee_pool === "object") {
            // Balance<SUI> has a 'value' field
            if (fields.fee_pool.fields && fields.fee_pool.fields.value) {
              balance = Number.parseInt(fields.fee_pool.fields.value)
            } else if (fields.fee_pool.value) {
              balance = Number.parseInt(fields.fee_pool.value)
            }
          } else if (typeof fields.fee_pool === "string") {
            balance = Number.parseInt(fields.fee_pool)
          }

          console.log("[v0] Extracted fee pool balance:", balance)
          setFeePoolBalance(balance)
        }
      } catch (error) {
        console.error("[v0] Error fetching fee pool:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeePoolBalance()
    const interval = setInterval(fetchFeePoolBalance, 10000)
    return () => clearInterval(interval)
  }, [isDevWallet])

  const handleWithdrawFees = () => {
    if (feePoolBalance === 0) {
      toast({
        title: "No Fees Available",
        description: "The fee pool is empty. Wait for users to create farms!",
        variant: "destructive",
      })
      return
    }

    setIsWithdrawing(true)

    const tx = new Transaction()

    tx.moveCall({
      target: `${CONTRACT_CONFIG.packageId}::shrooms_token::withdraw_fees`,
      arguments: [tx.object(CONTRACT_CONFIG.gameStateId), tx.pure.u64(feePoolBalance)],
    })

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          toast({
            title: "Fees Withdrawn! 💰",
            description: `${(feePoolBalance / 1e9).toFixed(2)} SUI transferred to dev wallet`,
          })
          setFeePoolBalance(0)
          setIsWithdrawing(false)
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
          setIsWithdrawing(false)
        },
      },
    )
  }

  if (!isDevWallet) {
    return null
  }

  return (
    <Card className="p-4 border-2 border-yellow-500 bg-yellow-500/10 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="font-bold font-mono text-sm">Dev Panel</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Fee Pool: </span>
            <span className="font-bold text-foreground">
              {isLoading ? "Loading..." : `${(feePoolBalance / 1e9).toFixed(2)} SUI`}
            </span>
          </div>
        </div>
        <Button
          onClick={handleWithdrawFees}
          disabled={isWithdrawing || feePoolBalance === 0}
          size="sm"
          className="font-bold"
        >
          {isWithdrawing ? "Withdrawing..." : `Withdraw All (${(feePoolBalance / 1e9).toFixed(2)} SUI)`}
        </Button>
      </div>
    </Card>
  )
}
