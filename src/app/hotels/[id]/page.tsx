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
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh", backgroundColor: "var(--hotel-light-gray)" }}>
      <SearchBar initialDestination="" />
      <div style={{ width: "100%", maxWidth: "1200px", backgroundColor: "var(--hotel-white)", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "row", gap: "24px", marginTop: "32px", padding: "24px", flexWrap: "wrap" }}>
        <div style={{ boxShadow: "0 1px 25px rgba(0,0,0,0.15)", flexShrink: 0, width: "447px", height: "312px", overflow: "hidden", borderRadius: "24px" }}>
          <img src={hotel.hotel.image} alt={hotel.hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <p style={{ margin: "0px", fontSize: "28px", fontWeight: 600, color: "var(--hotel-text)" }}>{hotel.hotel.name}</p>
          <p style={{ margin: "0px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: 500, marginBottom: "8px", color: "var(--hotel-caption)" }}>
            <img
              src={"/icons/location.svg"}
              alt="Login"
              className="w-[14px] h-[14px] mr-[5px]"
            />
            {hotel.hotel.address}
          </p>
          <p style={{ margin: "0px", color: "gold" }}>
            {Array.from({ length: hotel.hotel.stars }).map((_, i) => (
              <img
                key={i}
                src={"/icons/star.svg"}
                alt="Login"
                className="w-[18px] h-[22.5px] mr-[5px]"
              />
            ))}
          </p>
          <p style={{ whiteSpace: "pre-line", color: "var(--hotel-caption)", fontSize: "14px", marginTop: "8px" }}>{hotel.hotel.description.replace(/<br\s*\/?>/gi, "\n")}</p>
        </div>
        <div className="text-hotel-text" style={{ width: "100%", maxWidth: "1200px", marginTop: "24px", padding: "0px 24px 0px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ margin: "0px", fontSize: "20px", fontWeight: 600 }}>Quartos disponíveis</p>
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "36px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                    <p style={{ margin: "0px", fontSize: "22px", fontWeight: 600, color: "var(--hotel-primary)" }}>
                      {room.price.currency.replace("BRL", "R$")} {Math.floor(room.price.amount)}
                    </p>
                    <span style={{ fontSize: "14px", color: "var(--hotel-primary)" }}>/ noite</span>
                  </div>
                  <p style={{ margin: "0px", fontSize: "14px", color: "var(--hotel-caption)" }}>Pagamento no hotel</p>
                </div>
                <button
                  style={{
                    color: "#FFFFFF",
                    boxShadow: "0 10px 25px rgba(0, 128, 255, 0.25)",
                    border: "none",
                    outline: "none",
                  }}
                  className="bg-hotel-primary hover:bg-blue-600 text-[14px] font-semibold rounded-full w-[132px] h-[38px]"
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
