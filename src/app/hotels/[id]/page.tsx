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
    <div style={{ marginTop: "16px", padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh", backgroundColor: "var(--hotel-light-gray)" }}>
      <SearchBar initialDestination="" />

      <div
        className="hotel-details-wrapper"
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "var(--hotel-white)",
          borderRadius: "24px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          marginTop: "32px",
          padding: "24px",
          flexWrap: "wrap",
        }}
      >
        <div className="hotel-image-container">
          <img src={hotel.hotel.image} alt={hotel.hotel.name} />
        </div>
        <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column" }}>
          <p style={{ margin: "0px", fontSize: "28px", fontWeight: 600, color: "var(--hotel-text)" }}>{hotel.hotel.name}</p>
          <p style={{ margin: "0px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: 400, marginBottom: "8px", color: "var(--hotel-caption)" }}>
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
          <p style={{ whiteSpace: "pre-line", color: "var(--hotel-caption)", fontSize: "14px", marginTop: "8px", fontWeight: 400 }}>
            {hotel.hotel.description.replace(/<br\s*\/?>/gi, "\n")}
          </p>
        </div>
        <div className="text-hotel-text" style={{ width: "100%", maxWidth: "1200px", marginTop: "24px", padding: "0px 24px 0px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ margin: "0px", fontSize: "20px", fontWeight: 600 }}>Quartos disponíveis</p>
          {hotel.rooms.map((room: Room, index: number) => (
            <div
              key={index}
              className="room-card"
              style={{
                backgroundColor: "var(--hotel-light-gray)",
                borderRadius: "16px",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div className="room-info" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p className="room-name" style={{ fontWeight: 600, color: "var(--hotel-text)", margin: 0 }}>
                  {room.roomType.name}
                </p>
                {room.cancellationPolicies.refundable ? (
                  <p className="room-cancel" style={{ fontWeight: 600, display: "flex", alignItems: "center", fontSize: "14px", margin: 0, color: "var(--hotel-primary)" }}>
                    <img
                      src={"/icons/cancely.svg"}
                      alt="Login"
                      className="w-[14px] h-[14px] mr-[5px]"
                    />
                    Cancelamento gratuito
                  </p>
                ) : (
                  <p className="room-cancel" style={{ fontWeight: 600, display: "flex", alignItems: "center", fontSize: "14px", margin: 0, color: "var(--hotel-red)" }}>
                    <img
                      src={"/icons/canceln.svg"}
                      alt="Login"
                      className="w-[14px] h-[14px] mr-[5px]"
                    />
                    Multa de cancelamento
                  </p>
                )}
              </div>

              <div className="room-actions" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "36px", flexWrap: "wrap" }}>
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
                    cursor: "pointer",
                  }}
                  className="bg-hotel-primary hover:bg-blue-600 text-[14px] font-semibold rounded-full w-[132px] h-[38px]"
                  onClick={() => {
                    localStorage.setItem(
                      "selectedRoom",
                      JSON.stringify({
                        hotel,
                        room,
                      })
                    )
                    router.push(
                      `/hotels/${hotel.id}/reserve/${encodeURIComponent(room.roomType.name)}`
                    )
                  }}
                >
                  Reservar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hotel-image-container {
          flex-shrink: 0;
          width: 100%;
          max-width: 447px;
          height: auto;
          border-radius: 24px;
          box-shadow: 0 1px 25px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .hotel-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 970px) {
          .hotel-image-container {
            max-width: 70%;
          }
        }

        @media (max-width: 768px) {
          .hotel-details-wrapper {
            flex-direction: column;
          }

          .hotel-image-container {
            max-width: 100%;
            margin-bottom: 16px;
          }

          .room-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 20px;
          }

          .room-info {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
          }

          .room-info .room-name,
          .room-info .room-cancel {
            text-align: center;
            margin: 4px 0;
          }

          .room-actions {
            flex-direction: column;
            gap: 16px;
            margin-top: 12px;
            width: 100%;
            align-items: center;
          }

          .room-actions button {
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  )
}
