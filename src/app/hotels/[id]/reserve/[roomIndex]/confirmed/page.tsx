"use client"

import { useSearchParams } from "next/navigation"

export default function ConfirmedPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""
  const roomName = searchParams.get("roomName") || "Quarto"

  return (
    <div className="p-8 max-w-md mx-auto text-[var(--hotel-text)]">
      <h1 className="text-2xl font-bold mb-4">Reserva Confirmada</h1>
      <p className="text-lg">Reserva do {roomName} confirmada em nome de <span className="font-semibold">{name}</span> ✅</p>
    </div>
  )
}
