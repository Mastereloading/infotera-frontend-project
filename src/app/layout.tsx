// src/app/layout.tsx
"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Poppins } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "@/styles/globals.css"

const queryClient = new QueryClient()

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
})

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()

  const background =
    pathname.includes("/confirmed")
      ? "#123952"
      : "var(--hotel-light-gray)"
  
  return (
    <html lang="pt-br">
      <body className={`${poppins.className} font-normal flex flex-col min-h-screen`}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main style={{ backgroundColor: background }} className="flex-1 flex flex-col items-center justify-start px-[70px] py-8">
            {children}
          </main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  )
}
