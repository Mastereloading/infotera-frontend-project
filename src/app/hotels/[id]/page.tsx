"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchHotelById } from "@/lib/api"

interface Room {
  roomType: {
    name: string
  }
  price: {
    currency: string
    amount: number
  }
  cancellationPolicies: {
    refundable: boolean
  }
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
  lowestPrice: {
    currency: string
    amount: number
  }
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

  if (isLoading) return <p className="p-8">Carregando...</p>
  if (error) return <p className="p-8 text-red-500">{(error as Error).message}</p>
  if (!hotel) return <p className="p-8">Hotel não encontrado.</p>

  return (
    <div className="p-8 max-w-4xl mx-auto text-[var(--hotel-text)]">
      <h1 className="text-3xl font-bold mb-4">{hotel.hotel.name}</h1>
      <img
        src={hotel.hotel.image}
        alt={hotel.hotel.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="mb-2 font-semibold">Endereço: {hotel.hotel.address}</p>
      <p className="mb-2">Estrelas: {hotel.hotel.stars}</p>
      <p className="mb-4">Preço: {hotel.lowestPrice.currency} {hotel.lowestPrice.amount}</p>
      <div dangerouslySetInnerHTML={{ __html: hotel.hotel.description }} className="text-sm text-gray-700" />

      <h2 className="text-xl font-bold mt-6 mb-2">Quartos disponíveis</h2>
      <ul className="space-y-2">
        {hotel.rooms.map((room: Room, index: number) => (
          <li key={index} className="border p-2 rounded flex flex-col gap-2">
            <p className="font-semibold">{room.roomType.name}</p>
            <p>Preço: {room.price.currency} {room.price.amount}</p>
            <p>Cancelamento reembolsável: {room.cancellationPolicies.refundable ? "Sim" : "Não"}</p>
            <button
              className="bg-hotel-primary text-white px-4 py-2 rounded hover:bg-blue-700 w-fit"
              onClick={() =>
                router.push(
                  `/hotels/${id}/reserve/${index}?roomName=${encodeURIComponent(room.roomType.name)}`
                )
              }
            >
              Reservar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
