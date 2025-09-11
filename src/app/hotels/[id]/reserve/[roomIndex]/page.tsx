"use client"

import { useSearchParams, useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function ReservePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const roomIndex = Array.isArray(params?.roomIndex) ? params.roomIndex[0] : params?.roomIndex
  const roomName = searchParams.get("roomName") || "Quarto"
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleConfirm = () => {
    if (!name || !email) {
      alert("Preencha nome e email")
      return
    }
    router.push(`/hotels/${id}/reserve/${roomIndex}/confirmed?name=${encodeURIComponent(name)}&roomName=${encodeURIComponent(roomName)}`)
  }

  return (
    <div className="p-8 max-w-md mx-auto text-[var(--hotel-text)]">
      <h1 className="text-2xl font-bold mb-4">Reserva do {roomName}</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          className="bg-hotel-primary text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleConfirm}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
