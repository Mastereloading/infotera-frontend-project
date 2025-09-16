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
      className="reserve-page"
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
      <div className="reserve-wrapper" style={{ display: "flex", gap: "24px", width: "100%" }}>
        <div className="reserve-inputs">
          <div className="card">
            <p style={{ color: "var(--hotel-text)", margin: 0, fontSize: "16px" }}>HOTEL: {hotel.hotel.name}</p>
            <div className="input-group">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ fontSize: "14px", margin: "0 4px 4px 0" }}>Nome</p>
                  <p style={{ fontSize: "14px", margin: "0 0 4px 0", fontWeight: 400 }}> (Hóspede)</p>
                </div>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Sobrenome</p>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Sobrenome"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <p style={{ margin: 0 }}>Contato da reserva</p>
            <div className="input-group">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Nome</p>
                <input className="input-field" type="text" placeholder="Nome" value={reservename} onChange={(e) => setReservename(e.target.value)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Email</p>
                <input className="input-field" type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>Telefone (WhatsApp)</p>
                <input className="input-field" type="tel" placeholder="(XX) XXXXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
        <div className="reserve-summary card">
          <p style={{ margin: 0, fontWeight: 600, color: "var(--hotel-primary)", fontSize: "18px" }}>
            Sua reserva
          </p>
          <hr style={{ border: "none", borderTop: "2px solid #E4E4E4", margin: "0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <p style={{ margin: 0, fontWeight: 600 }}>{hotel.hotel.name}</p>
            <p style={{ margin: "0 0 4px 0", color: "var(--hotel-caption)", fontWeight: 400 }}>{hotel.hotel.address}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <p style={{ margin: 0, fontWeight: 400 }}>Quarto: {room.roomType.name}</p>
            {room.cancellationPolicies.refundable ?
              <p style={{ fontWeight: 600, display: "flex", alignItems: "center", fontSize: "14px", margin: 0, color: "var(--hotel-primary)" }}>
                <img src={"/icons/cancely.svg"} alt="Login" style={{ width: "14px", height: "14px", marginRight: "5px" }} />
                Cancelamento gratuito
              </p>
              :
              <p style={{ fontWeight: 600, display: "flex", alignItems: "center", fontSize: "14px", margin: 0, color: "var(--hotel-red)" }}>
                <img src={"/icons/canceln.svg"} alt="Login" style={{ width: "14px", height: "14px", marginRight: "5px" }} />
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
              <p style={{ margin: 0, fontWeight: 400, color: "#273240" }}>Total</p>
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
            onClick={handleConfirm}
          >
            Reservar
          </button>
        </div>
      </div>

      <style jsx>{`
        .reserve-wrapper {
          flex-wrap: wrap;
        }

        .reserve-inputs {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-width: 920px;
          box-sizing: border-box;
        }

        .reserve-inputs .input-field {
          min-width: 205px;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .input-group {
          display: flex;
          gap: 12px;
        }

        .reserve-summary {
          flex: 1;
          max-width: 352px;
        }

        .card {
          background-color: var(--hotel-white);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          box-sizing: border-box;
        }

        @media (max-width: 1480px) {
          .reserve-inputs {
            min-width: unset;
          }
          .reserve-inputs .input-field {
            min-width: unset;
          }
        }

        @media (max-width: 1120px) {
          .reserve-wrapper {
            flex-direction: column;
          }
          .reserve-summary {
            max-width: 100%;
          }
        }

        @media (max-width: 700px) {
          .input-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
