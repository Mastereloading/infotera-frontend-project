"use client"

import { ReactNode } from "react"
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} font-normal flex flex-col h-screen`}
        style={{ backgroundColor: "var(--hotel-light-gray)" }}
      >
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="flex-1 flex flex-col items-center justify-center">
            {children}
          </main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  )
}
