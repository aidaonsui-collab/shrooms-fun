"use client"

import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit"
import { Transaction } from "@mysten/sui/transactions"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function DevPanel() {
  const account = useCurrentAccount()
  const client = useSuiClient()
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
  const { toast } = useToast()

  const [feePoolBalance, setFeePoolBalance] = useState(0)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [isForceWithdrawing, setIsForceWithdrawing] = useState(false)

  const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || ""
  const GAME_STATE_ID = process.env.NEXT_PUBLIC_GAME_STATE_ID || ""
  const DEV_WALLET = process.env.NEXT_PUBLIC_DEV_WALLET || ""

  useEffect(() => {
    const fetchFeePool = async () => {
      try {
        const gameState = await client.getObject({
          id: GAME_STATE_ID,
          options: { showContent: true },
        })

        if (gameState.data?.content?.dataType === "moveObject") {
          const fields = gameState.data.content.fields as any

          let feePool = 0

          // Try different possible structures
          if (fields.fee_pool?.fields?.balance) {
            feePool = fields.fee_pool.fields.balance
          } else if (fields.fee_pool?.fields?.value) {
            feePool = fields.fee_pool.fields.value
          } else if (fields.fee_pool) {
            feePool = fields.fee_pool
          } else if (fields.fee_balance) {
            feePool = fields.fee_balance
          }

          setFeePoolBalance(Number(feePool) / 1_000_000_000)
        }
      } catch (error) {
        console.error("Error fetching fee pool:", error)
      }
    }

    fetchFeePool()
    const interval = setInterval(fetchFeePool, 5000)
    return () => clearInterval(interval)
  }, [client, GAME_STATE_ID])

  const handleWithdrawFees = async () => {
    if (!account || account.address !== DEV_WALLET) {
      toast({
        title: "Unauthorized",
        description: "Only the dev wallet can withdraw fees",
        variant: "destructive",
      })
      return
    }

    setIsWithdrawing(true)
    try {
      const tx = new Transaction()
      tx.moveCall({
        target: `${PACKAGE_ID}::shrooms_token::withdraw_fees`,
        arguments: [tx.object(GAME_STATE_ID)],
      })

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: () => {
            toast({
              title: "Fees withdrawn!",
              description: "Fees have been withdrawn successfully",
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
      setIsWithdrawing(false)
    }
  }

  const handleForceWithdraw = async () => {
    if (!account || account.address !== DEV_WALLET) {
      toast({
        title: "Unauthorized",
        description: "Only the dev wallet can withdraw fees",
        variant: "destructive",
      })
      return
    }

    setIsForceWithdrawing(true)
    try {
      const tx = new Transaction()
      tx.moveCall({
        target: `${PACKAGE_ID}::shrooms_token::withdraw_fees`,
        arguments: [tx.object(GAME_STATE_ID)],
      })

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: () => {
            toast({
              title: "Fees withdrawn!",
              description: "Fees have been withdrawn successfully",
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
      setIsForceWithdrawing(false)
    }
  }

  // Only show for dev wallet
  if (account?.address !== DEV_WALLET) {
    return null
  }

  return (
    <Card className="p-6 border-4 border-yellow-500 bg-yellow-50 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-yellow-900 mb-2 pixelated">👨‍💻 Dev Panel</h3>
          <p className="text-yellow-800 pixelated">
            Fee Pool: <span className="font-bold">{feePoolBalance.toFixed(2)} SUI</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleWithdrawFees}
            disabled={isWithdrawing || feePoolBalance === 0}
            className="bg-green-600 hover:bg-green-700 pixelated"
          >
            {isWithdrawing ? "WITHDRAWING..." : `WITHDRAW ALL (${feePoolBalance.toFixed(2)} SUI)`}
          </Button>
          <Button
            onClick={handleForceWithdraw}
            disabled={isForceWithdrawing}
            variant="destructive"
            className="pixelated"
          >
            {isForceWithdrawing ? "FORCING..." : "FORCE WITHDRAW"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
