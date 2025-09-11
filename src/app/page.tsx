"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchBar from "@/components/SearchBar"

export default function HomePage() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-center leading-snug text-hotel-text">
          Os melhores{" "}
          <span className="text-hotel-primary">Hoteis</span> e{" "}
          <span className="text-hotel-primary">Destinos</span> <br />
          para sua viagem
        </h1>
        <SearchBar />
      </div>
      <Footer />
    </main>
  )
}
