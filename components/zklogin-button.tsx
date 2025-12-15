"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useSuiClient } from "@mysten/dapp-kit"
import { ZkLoginManager } from "@/lib/zklogin"
import { Mail, LogOut } from "lucide-react"
import { useToast } from "@/lib/simple-toast"

export function ZkLoginButton() {
  const client = useSuiClient()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [zkAddress, setZkAddress] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const savedState = ZkLoginManager.getZkLoginState()
    if (savedState?.address) {
      setZkAddress(savedState.address)
    }
  }, [])

  const handleZkLogin = async () => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      toast({
        title: "Configuration Error",
        description: "Google Client ID not configured",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const epoch = await client.getLatestSuiSystemState()
      const maxEpoch = Number(epoch.epoch) + 10

      const zkLoginState = await ZkLoginManager.prepareZkLogin(maxEpoch)

      ZkLoginManager.saveZkLoginState(zkLoginState)

      const authUrl = ZkLoginManager.getGoogleAuthUrl(zkLoginState.nonce)
      window.location.href = authUrl
    } catch (error) {
      console.error("zkLogin error:", error)
      toast({
        title: "Login Failed",
        description: "Failed to initialize zkLogin",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleLogout = () => {
    ZkLoginManager.clearZkLoginState()
    setZkAddress(null)
    toast({
      title: "Logged Out",
      description: "Successfully logged out from zkLogin",
    })
  }

  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash
      if (hash) {
        const params = new URLSearchParams(hash.substring(1))
        const idToken = params.get("id_token")

        if (idToken) {
          try {
            const jwtPayload = JSON.parse(atob(idToken.split(".")[1]))

            const userSalt = BigInt(
              "0x" +
                Array.from(jwtPayload.sub)
                  .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
                  .join("")
                  .slice(0, 32),
            ).toString()

            const address = await ZkLoginManager.getAddressFromJWT(idToken, userSalt)

            setZkAddress(address)
            const savedState = ZkLoginManager.loadZkLoginState()
            if (savedState) {
              // Update the existing full state with the new address
              savedState.address = address
              ZkLoginManager.saveZkLoginState(savedState)
            }

            toast({
              title: "Login Successful!",
              description: `Logged in as ${address.substring(0, 8)}...`,
            })

            window.history.replaceState(null, "", window.location.pathname)
          } catch (error) {
            console.error("Failed to process JWT:", error)
            toast({
              title: "Login Failed",
              description: "Failed to process login credentials",
              variant: "destructive",
            })
          }
        }
      }
    }

    handleCallback()
  }, [toast])

  if (!mounted) {
    return <div className="w-[180px] h-10" />
  }

  if (zkAddress) {
    return (
      <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
        <span className="text-xs">
          {zkAddress.substring(0, 6)}...{zkAddress.substring(zkAddress.length - 4)}
        </span>
        <LogOut className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <Button onClick={handleZkLogin} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
      <Mail className="w-4 h-4" />
      {loading ? "Loading..." : "Login with Email"}
    </Button>
  )
}
