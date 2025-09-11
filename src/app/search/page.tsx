"use client"

import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchHotels } from "@/lib/api"
import Link from "next/link"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || ""

  const { data: hotels, isLoading, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
    enabled: true
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hotéis em {destination}</h1>

      {isLoading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{(error as Error).message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {hotels?.map(h => (
          <Link
            key={h.id}
            href={`/hotels/${h.id}`}
            className="border rounded p-4 hover:shadow-lg flex flex-col items-start"
          >
            <div className="w-full h-24 overflow-hidden rounded-md">
              <img
                src={h.hotel.image}
                alt={h.hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-bold text-lg mt-2 truncate">{h.hotel.name}</h2>
            <p className="text-sm truncate">{h.hotel.address}</p>
            <p className="font-semibold mt-1">Preço: {h.lowestPrice.currency} {h.lowestPrice.amount}</p>
          </Link>
        ))}
        {!isLoading && hotels?.length === 0 && <p>Nenhum hotel encontrado.</p>}
      </div>
    </div>
  )
}
