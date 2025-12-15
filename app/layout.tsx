import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, Inter } from "next/font/google"
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Shrooms.fun - Magic Mushroom Farming on Sui",
  description:
    "Grow magic mushrooms and earn $SHROOMS tokens on Sui blockchain. The first mushroom farming game with real blockchain rewards!",
  generator: "v0.app",
  keywords: ["Sui", "blockchain", "mushroom", "farming", "game", "SHROOMS", "crypto"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart.className} antialiased`}>
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
