"use client"

import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchHotels } from "@/lib/api"
import HotelCard from "@/components/HotelCard"
import SearchBar from "@/components/SearchBar"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || ""

  const { data: hotels, isLoading, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
    enabled: true
  })

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
      <SearchBar initialDestination={destination} />

      <h1 style={{ fontSize: "24px", fontWeight: 600, margin: "32px 0", color: "var(--hotel-primary)" }}>
        Hotéis em {destination}
      </h1>

      {isLoading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}
      {!isLoading && hotels?.length === 0 && <p>Nenhum hotel encontrado.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
        {hotels?.map(h => (
          <HotelCard
            key={h.id}
            id={h.id}
            name={h.hotel.name}
            image={h.hotel.image}
            stars={h.hotel.stars}
          />
        ))}
      </div>
    </div>
  )
}
