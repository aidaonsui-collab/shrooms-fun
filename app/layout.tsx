import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import { ToastProvider } from "@/lib/simple-toast"
import "./globals.css"

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "block",
})

export const metadata: Metadata = {
  title: "Shrooms.fun - Magic Mushroom Farming on Sui",
  description:
    "Grow magic mushrooms and earn $SHROOMS tokens on Sui blockchain. The first mushroom farming game with real blockchain rewards!",
  generator: "v0.app",
  keywords: ["Sui", "blockchain", "mushroom", "farming", "game", "SHROOMS", "crypto"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pressStart.className} antialiased`} suppressHydrationWarning>
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
