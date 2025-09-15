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
        <div style={{  boxShadow: "0 1px 25px rgba(0,0,0,0.15)", flexShrink: 0, width: "447px", height: "312px", overflow: "hidden", borderRadius: "24px" }}>
          <img src={hotel.hotel.image} alt={hotel.hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px", color: "var(--hotel-text)" }}>{hotel.hotel.name}</h1>
          <p style={{ fontWeight: 500, marginBottom: "8px", color: "var(--hotel-text)" }}>{hotel.hotel.address}</p>
          <p style={{ marginBottom: "8px", color: "gold" }}>
            {Array.from({ length: hotel.hotel.stars }).map((_, i) => (
              <span key={i} style={{ color: "gold", fontSize: "24px" }}>★</span>
            ))}
          </p>
          <p style={{ color: "var(--hotel-text)", fontSize: "14px", marginTop: "8px" }}>{hotel.hotel.description}</p>
        </div>
        <div className="text-hotel-text" style={{ width: "100%", maxWidth: "1200px", marginTop: "32px", padding: "0px 24px 0px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600 }}>Quartos disponíveis</h2>
          {hotel.rooms.map((room: Room, index: number) => (
            <div
              key={index}
              style={{
                backgroundColor: "var(--hotel-light-gray)",
                borderRadius: "16px",
                padding: "0px 24px 0px 24px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "88px",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontWeight: 600, color: "var(--hotel-text)", margin: 0 }}>
                  {room.roomType.name}
                </p>
                {room.cancellationPolicies.refundable ?
                  <p className="mt-[4px]" style={{ fontWeight: 600, display: "flex", alignItems: "center", fontSize: "14px", margin: 0, color: "var(--hotel-primary)" }}>
                    <img
                      src={"/icons/cancely.svg"}
                      alt="Login"
                      className="w-[14px] h-[14px] mr-[5px]"
                    />
                    Cancelamento gratuito
                  </p>
                :
                  <p className="mt-[4px]" style={{ fontWeight: 600, display: "flex", alignItems: "center", fontSize: "14px", margin: 0, color: "var(--hotel-red)" }}>
                    <img
                      src={"/icons/canceln.svg"}
                      alt="Login"
                      className="w-[14px] h-[14px] mr-[5px]"
                    />
                    Multa de cancelamento
                  </p>
                }
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
                <p style={{ margin: 0, fontWeight: 500 }}>
                  {room.price.currency} {room.price.amount}
                </p>
                <button
                  style={{
                    color: "#FFFFFF",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    border: "none",
                    outline: "none",
                    width: "8.5vw",
                    height: "4.5vh",
                    padding: "0px 24px 0px 24px"
                  }}
                  className="bg-hotel-primary hover:bg-blue-600 text-[14px] font-semibold rounded-full w-[118px] h-[38px]"
                onClick={() =>
                  router.push(
                    `/hotels/${id}/reserve/${index}?roomName=${encodeURIComponent(room.roomType.name)}`
                  )
                }
                >
                  Reservar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
