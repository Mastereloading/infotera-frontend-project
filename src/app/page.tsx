"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchHotels } from "@/lib/api"
import { HotelItem } from "@/types"

import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function HomePage() {
  const { data: hotels, isLoading, error, refetch } = useQuery<HotelItem[]>({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
    enabled: false
  })

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-8">
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
              <p className="font-bold text-hotel-text">{h.hotel.name}</p>
              <p className="text-hotel-text">Endereço: {h.hotel.address}</p>
              <p className="text-hotel-text">Preço: ${h.lowestPrice.amount}</p>
              <p className="text-hotel-text">--------------------------------------------------</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  )
}
