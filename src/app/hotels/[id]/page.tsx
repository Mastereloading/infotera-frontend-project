"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchHotelById } from "@/lib/api"
import SearchBar from "@/components/SearchBar"

interface Room {
  roomType: { name: string }
  price: { currency: string; amount: number }
  cancellationPolicies: { refundable: boolean }
}

interface Hotel {
  id: number
  hotel: {
    name: string
    address: string
    stars: number
    image: string
    description: string
  }
  lowestPrice: { currency: string; amount: number }
  rooms: Room[]
}

export default function HotelPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const router = useRouter()

  const { data: hotel, isLoading, error } = useQuery<Hotel>({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelById(id!),
    enabled: !!id
  })

  if (isLoading) return <p style={{ padding: "32px" }}>Carregando...</p>
  if (error) return <p style={{ padding: "32px", color: "red" }}>{(error as Error).message}</p>
  if (!hotel) return <p style={{ padding: "32px" }}>Hotel não encontrado.</p>

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--hotel-light-gray)" }}>

      <SearchBar initialDestination="" />

      <div style={{ width: "100%", maxWidth: "1200px", backgroundColor: "var(--hotel-white)", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "row", gap: "24px", marginTop: "32px", padding: "24px", flexWrap: "wrap" }}>
        <div style={{ flexShrink: 0, width: "447px", height: "312px", overflow: "hidden", borderRadius: "24px" }}>
          <img src={hotel.hotel.image} alt={hotel.hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px", color: "var(--hotel-text)" }}>{hotel.hotel.name}</h1>
          <p style={{ fontWeight: 500, marginBottom: "8px", color: "var(--hotel-text)" }}>{hotel.hotel.address}</p>
          <p style={{ marginBottom: "8px", color: "gold" }}>
            {Array.from({ length: hotel.hotel.stars }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </p>
          <p style={{ color: "var(--hotel-text)", fontSize: "14px", marginTop: "8px" }}>{hotel.hotel.description}</p>
        </div>
      </div>

      <div className="text-hotel-text" style={{ width: "100%", maxWidth: "1200px", backgroundColor: "var(--hotel-white)", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", marginTop: "32px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 600 }}>Quartos disponíveis</h2>
        {hotel.rooms.map((room: Room, index: number) => (
          <div key={index} style={{ border: "1px solid #ccc", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontWeight: 500, color: "var(--hotel-text)" }}>{room.roomType.name}</p>
            <p>Preço: {room.price.currency} {room.price.amount}</p>
            <p>Cancelamento reembolsável: {room.cancellationPolicies.refundable ? "Sim" : "Não"}</p>
            <button
              style={{ backgroundColor: "var(--hotel-primary)", color: "#fff", borderRadius: "999px", padding: "8px 16px", fontWeight: 500, width: "fit-content", cursor: "pointer" }}
              onClick={() =>
                router.push(`/hotels/${id}/reserve/${index}?roomName=${encodeURIComponent(room.roomType.name)}`)
              }
            >
              Reservar
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}
