import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "@/components/ui/sonner"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { AvisoIA } from "@/components/aviso-ia"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcommerceUI - Loja Online Moderna",
  description: "Uma interface moderna para e-commerce com carrinho de compras e checkout",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <Analytics />
      <SpeedInsights />
      <body className={inter.className}>
        <CartProvider>
          <AvisoIA />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
