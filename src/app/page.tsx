"use client"

import SearchBar from "@/components/SearchBar"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4">
      <h1
        className="font-semibold text-center leading-snug text-hotel-text mb-10"
        style={{ fontSize: "clamp(36px, 5vw, 50px)" }}
      >
        Os melhores{" "}
        <span className="text-hotel-primary">Hoteis</span> e{" "}
        <span className="text-hotel-primary">Destinos</span> <br />
        para sua viagem
      </h1>
      <SearchBar />
    </div>
  )
}
