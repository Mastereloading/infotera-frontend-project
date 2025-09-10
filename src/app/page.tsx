"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchHotels } from "@/lib/api"
import { HotelItem } from "@/types"

export default function HomePage() {
  const { data: hotels, isLoading, error, refetch } = useQuery<HotelItem[]>({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
    enabled: false
  })

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hotéis</h1>

      <button
        onClick={() => refetch()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Carregar Hotéis
      </button>

      {isLoading && <p className="mt-4">Carregando...</p>}
      {error && <p className="mt-4 text-red-500">{(error as Error).message}</p>}

      <ul className="mt-4 space-y-2">
        {hotels?.map((h) => (
          <li key={h.id} className="border p-2 rounded">
            <p className="font-bold">{h.hotel.name}</p>
            <p>Endereço: {h.hotel.address}</p>
            <p>Preço: ${h.lowestPrice.amount}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
