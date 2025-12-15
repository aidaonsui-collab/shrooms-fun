import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { generateNonce, generateRandomness } from "@mysten/sui/zklogin"
import { jwtToAddress } from "@mysten/sui/zklogin"

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3000"
const OPENID_PROVIDER_URL = "https://accounts.google.com"
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!

export interface ZkLoginState {
  ephemeralKeyPair: Ed25519Keypair
  nonce: string
  randomness: string
  maxEpoch: number
  address?: string // Added address field to persist logged-in state
}

export class ZkLoginManager {
  static generateEphemeralKeyPair(): Ed25519Keypair {
    return new Ed25519Keypair()
  }

  static async prepareZkLogin(maxEpoch: number): Promise<ZkLoginState> {
    const ephemeralKeyPair = this.generateEphemeralKeyPair()
    const randomness = generateRandomness()

    const publicKey = ephemeralKeyPair.getPublicKey()
    const nonce = generateNonce(publicKey, maxEpoch, randomness)

    return {
      ephemeralKeyPair,
      nonce,
      randomness,
      maxEpoch,
    }
  }

  static getGoogleAuthUrl(nonce: string): string {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URL,
      response_type: "id_token",
      scope: "openid email profile",
      nonce: nonce,
    })

    return `${OPENID_PROVIDER_URL}/o/oauth2/v2/auth?${params.toString()}`
  }

  static async getAddressFromJWT(jwt: string, userSalt: string): Promise<string> {
    try {
      const address = jwtToAddress(jwt, userSalt)
      return address
    } catch (error) {
      console.error("Error deriving address from JWT:", error)
      throw error
    }
  }

  static saveZkLoginState(state: ZkLoginState): void {
    const secretKey = state.ephemeralKeyPair.getSecretKey()
    localStorage.setItem(
      "zklogin_state",
      JSON.stringify({
        secretKey,
        nonce: state.nonce,
        randomness: state.randomness,
        maxEpoch: state.maxEpoch,
        address: state.address,
      }),
    )
  }

  static loadZkLoginState(): ZkLoginState | null {
    const stored = localStorage.getItem("zklogin_state")
    if (!stored) return null

    try {
      const parsed = JSON.parse(stored)
      const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(parsed.secretKey)

      return {
        ephemeralKeyPair,
        nonce: parsed.nonce,
        randomness: parsed.randomness,
        maxEpoch: parsed.maxEpoch,
        address: parsed.address,
      }
    } catch {
      return null
    }
  }

  static getZkLoginState(): { address?: string } | null {
    const stored = localStorage.getItem("zklogin_state")
    if (!stored) return null

    try {
      const parsed = JSON.parse(stored)
      return { address: parsed.address }
    } catch {
      return null
    }
  }

  static clearZkLoginState(): void {
    localStorage.removeItem("zklogin_state")
  }
}
