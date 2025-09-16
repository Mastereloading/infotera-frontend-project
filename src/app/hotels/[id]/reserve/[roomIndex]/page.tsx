"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function ReservePage() {
  const router = useRouter()

  const [hotel, setHotel] = useState<any>(null)
  const [room, setRoom] = useState<any>(null)
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [reservename, setReservename] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [observations, setObservations] = useState("")

  useEffect(() => {
    const savedData = localStorage.getItem("selectedRoom")
    if (savedData) {
      const { hotel, room } = JSON.parse(savedData)
      setHotel(hotel)
      setRoom(room)
    }
  }, [])

  if (!hotel || !room) return <p style={{ padding: "32px" }}>Carregando...</p>

  const handleConfirm = () => {
    if (!name || !surname || !email || !phone) {
      alert("Preencha todos os campos obrigatórios")
      return
    }
    router.push(
      `/hotels/${hotel.id}/reserve/${encodeURIComponent(
        room.roomType.name
      )}/confirmed?name=${encodeURIComponent(name)}&surname=${encodeURIComponent(
        surname
      )}&reservename=${encodeURIComponent(reservename)}&email=${encodeURIComponent(
        email
      )}&hotelName=${encodeURIComponent(
        hotel.hotel.name
      )}`
    )
  }

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "32px",
        backgroundColor: "var(--hotel-light-gray)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <p
        style={{
          color: "var(--hotel-text)",
          fontSize: "16px",
          fontWeight: 600,
          margin: 0,
          marginBottom: "8px"
        }}
      >
        Finalize sua reserva!
      </p>
      <div
        style={{
          display: "flex",
          gap: "24px",
          width: "100%"
        }}
      >
        <div style={{ minWidth: "805px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              backgroundColor: "var(--hotel-white)",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <p style={{ color: "var(--hotel-text)", margin: 0, fontSize: "16px" }}>HOTEL: {hotel.hotel.name}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ fontSize: "14px", margin: "0 4px 4px 0" }}>Nome</p>
                  <p style={{ fontSize: "14px", margin: "0 0 4px 0", fontWeight: 400 }}> (Hóspede)</p>
                </div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ minWidth: "205px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Sobrenome</p>
                <input
                  type="text"
                  placeholder="Sobrenome"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  style={{ minWidth: "205px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "var(--hotel-white)",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <p style={{ margin: 0 }}>Contato da reserva</p>

            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Nome</p>
                <input
                  type="text"
                  placeholder="Nome"
                  value={reservename}
                  onChange={(e) => setReservename(e.target.value)}
                  style={{ minWidth: "205px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Email</p>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ minWidth: "205px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Telefone (WhatsApp)</p>
                <input
                  type="tel"
                  placeholder="(XX) XXXXX-XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ minWidth: "205px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Observações</p>
              <textarea
                placeholder="Sua Mensagem"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                style={{
                  fontSize: "14px",
                  resize: "none",
                  width: "100%",
                  padding: "8px 0px 8px 8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  minHeight: "80px"
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1 }}>
          <div
            style={{
              backgroundColor: "var(--hotel-white)",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              maxWidth: "352px"
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: "var(--hotel-primary)", fontSize: "18px" }}>
              Sua reserva
            </p>
            <hr style={{ border: "none", borderTop: "2px solid #E4E4E4", margin: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{hotel.hotel.name}</p>
              <p style={{ margin: "0 0 4px 0", color: "var(--hotel-caption)", fontWeight: 400 }}>{hotel.hotel.address}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <p style={{ margin: 0, fontWeight: 400 }}>Quarto: {room.roomType.name}</p>
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
            <hr style={{ border: "none", borderTop: "2px solid #E4E4E4", margin: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, color: "#273240", fontWeight: 400 }}>Impostos e taxas</p>
                <p style={{ margin: 0, fontSize: "16px" }}>
                  {room.price.currency.replace("BRL", "R$")} {room.price.amount}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0, fontWeight: 400, color: "#273240" }}>
                  Total
                </p>
                <p style={{ margin: 0, fontWeight: 600, color: "var(--hotel-primary)", fontSize: "24px" }}>
                  {room.price.currency.replace("BRL", "R$")} {room.price.amount}
                </p>
              </div>
            </div>
            <button
              style={{
                backgroundColor: "var(--hotel-primary)",
                color: "#fff",
                border: "none",
                outline: "none",
                padding: "16px",
                borderRadius: "32px",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "24px",
                width: "100%",
                boxShadow: "0 10px 25px rgba(0, 128, 255, 0.25)",
              }}
              className="bg-hotel-primary hover:bg-blue-600 text-[16px]"
              onClick={handleConfirm}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
