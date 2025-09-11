import { HotelItem } from "@/types"

export const fetchHotels = async (): Promise<HotelItem[]> => {
  const res = await fetch("http://localhost:3333/hotels")
  if (!res.ok) throw new Error("Failed to fetch hotels")
  return res.json()
}

export async function fetchHotelById(id: string) {
  const res = await fetch(`http://localhost:3333/hotels/${id}`)
  if (!res.ok) throw new Error("Erro ao buscar hotel")
  return res.json()
}