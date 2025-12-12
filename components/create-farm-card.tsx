"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Coins } from "lucide-react"
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"
import { createFarmTransaction } from "@/lib/sui-client"
import { useCurrentAccount } from "@mysten/dapp-kit"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function CreateFarmCard() {
  const account = useCurrentAccount()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const handleCreateFarm = () => {
    if (!account) return

    setIsCreating(true)
    const tx = createFarmTransaction(account.address)

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          toast({
            title: "Farm Created! 🎉",
            description: "Your mushroom farm is ready to grow!",
          })
          setIsCreating(false)
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
          setIsCreating(false)
        },
      },
    )
  }

  return (
    <Card className="p-6 border-4 border-dashed border-primary bg-card/60 backdrop-blur flex flex-col items-center justify-center min-h-[400px] hover:bg-card/80 transition-colors relative overflow-hidden">
      <div className="absolute top-4 left-4 text-3xl animate-float opacity-30">🍄</div>
      <div className="absolute bottom-4 right-4 text-3xl animate-float opacity-30" style={{ animationDelay: "1s" }}>
        🍄
      </div>
      <div className="absolute top-1/2 right-8 text-2xl animate-float opacity-20" style={{ animationDelay: "0.5s" }}>
        🌾
      </div>

      <div className="text-center relative z-10">
        <div className="mb-4 relative">
          <div className="text-7xl animate-float mb-2">👨‍🌾</div>
          <div
            className="text-4xl absolute -bottom-2 left-1/2 -translate-x-1/2 animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            🍄
          </div>
        </div>

        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Plus className="w-16 h-16 text-white" />
        </div>

        <h3 className="text-2xl font-black mb-2">Create New Farm</h3>
        <p className="text-muted-foreground mb-6 text-sm">Start growing magic mushrooms</p>

        <div className="flex items-center justify-center gap-2 mb-6 text-sm">
          <Coins className="w-4 h-4 text-blue-500" />
          <span className="font-mono font-bold">Cost: 10 SUI</span>
        </div>

        <Button size="lg" onClick={handleCreateFarm} disabled={isCreating} className="font-bold">
          {isCreating ? "Creating..." : "Create Farm"}
        </Button>
      </div>
    </Card>
  )
}
