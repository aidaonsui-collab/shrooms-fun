"use client"

import { useState, useEffect } from "react"
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit"
import { Transaction } from "@mysten/sui/transactions"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/lib/simple-toast"
import { Copy, Users } from "lucide-react"

const REFERRAL_SYSTEM_ID = process.env.NEXT_PUBLIC_REFERRAL_SYSTEM_ID!
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID!

export function ReferralPanel() {
  const account = useCurrentAccount()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const client = useSuiClient()
  const { toast } = useToast()
  const [referralCode, setReferralCode] = useState("")
  const [referralCount, setReferralCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const myReferralLink = account ? `${window.location.origin}?ref=${account.address}` : ""

  const copyReferralLink = () => {
    navigator.clipboard.writeText(myReferralLink)
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    })
  }

  const fetchReferralStats = async () => {
    if (!account) return

    try {
      // In a real implementation, you'd call a view function here
      // This is a placeholder
      setReferralCount(0)
    } catch (error) {
      console.error("Error fetching referral stats:", error)
    }
  }

  const handleRegisterReferral = async () => {
    if (!account || !referralCode) return

    setLoading(true)
    const tx = new Transaction()

    tx.moveCall({
      target: `${PACKAGE_ID}::referral_system::register_referral`,
      arguments: [tx.object(REFERRAL_SYSTEM_ID), tx.pure.address(referralCode)],
    })

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          toast({
            title: "Referral Registered!",
            description: "You've been referred successfully. Start farming to give your referrer rewards!",
          })
          setReferralCode("")
        },
        onError: (error) => {
          toast({
            title: "Registration Failed",
            description: error.message,
            variant: "destructive",
          })
        },
        onSettled: () => {
          setLoading(false)
        },
      },
    )
  }

  useEffect(() => {
    // Check URL for referral parameter
    const params = new URLSearchParams(window.location.search)
    const ref = params.get("ref")
    if (ref) {
      setReferralCode(ref)
    }

    fetchReferralStats()
  }, [account])

  return (
    <Card className="p-6 bg-purple-900/80 border-4 border-purple-600">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-300" />
          <h3 className="text-2xl font-bold text-purple-200 pixelated">REFERRAL PROGRAM</h3>
        </div>

        <div className="space-y-2">
          <div className="bg-purple-800/50 p-4 rounded">
            <div className="text-sm text-purple-200 mb-1">Your Referrals</div>
            <div className="text-3xl font-bold text-purple-300">{referralCount}</div>
          </div>

          <div className="bg-purple-800/50 p-3 rounded text-sm text-purple-200">
            Earn 10% of every harvest from users you refer!
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-purple-200">Your Referral Link:</label>
          <div className="flex gap-2">
            <Input
              value={myReferralLink}
              readOnly
              className="flex-1 bg-purple-800/50 border-purple-600 text-purple-100"
            />
            <Button onClick={copyReferralLink} className="bg-purple-600 hover:bg-purple-700">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="border-t border-purple-600 pt-4">
          <label className="text-sm text-purple-200 mb-2 block">Have a referral code? Enter it:</label>
          <div className="flex gap-2">
            <Input
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referrer address..."
              className="flex-1 bg-purple-800/50 border-purple-600 text-purple-100"
            />
            <Button
              onClick={handleRegisterReferral}
              disabled={!referralCode || loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? "..." : "Register"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
