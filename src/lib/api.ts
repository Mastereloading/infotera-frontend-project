import { HotelItem } from "@/types"

export const fetchHotels = async (): Promise<HotelItem[]> => {
  const res = await fetch("http://localhost:3333/hotels")
  if (!res.ok) throw new Error("Failed to fetch hotels")
  return res.json()
}