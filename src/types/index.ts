export type HotelItem = {
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
  rooms: any[]
}