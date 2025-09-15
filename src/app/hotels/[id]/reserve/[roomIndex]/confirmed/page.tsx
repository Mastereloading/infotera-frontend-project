"use client"

import { useSearchParams } from "next/navigation"

export default function ConfirmedPage() {
  const searchParams = useSearchParams()

  const name = searchParams.get("name") || ""
  const surname = searchParams.get("surname") || ""
  const reservename = searchParams.get("reservename") || ""
  const email = searchParams.get("email") || ""
  const hotelName = searchParams.get("hotelName") || "Hotel"

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#123952",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        minWidth: "100%"
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          textAlign: "left"
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "16px",
            color: "#FFF",
          }}
        >
          Reserva realizada com sucesso!
        </h1>
        <div style={{ marginBottom: "24px", display: "flex", margin: "0 0 2px 0", alignItems: "center" }}>
          <p style={{ color: "#FFF", fontWeight: 600, marginRight: "4px" }}>Hotel:</p>
          <p style={{ color: "#FFF", fontWeight: 400 }}>{hotelName}</p>
        </div>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "#FFF", fontWeight: 600, margin: "0 0 2px 0" }}>Hóspede:</p>
          <p style={{ color: "#FFF", fontWeight: 400, margin: 0 }}>Nome: {name} {surname}</p>
        </div>
        <div>
          <p style={{ color: "#FFF", fontWeight: 600, margin: "0 0 2px 0" }}>Contato:</p>
          <p style={{ color: "#FFF", fontWeight: 400, margin: "0 0 2px 0" }}>Nome: {reservename}</p>
          <p style={{ color: "#FFF", fontWeight: 400, margin: 0 }}>E-mail: {email}</p>
        </div>
      </div>
    </div>
  )
}
