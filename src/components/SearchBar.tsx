"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Suggestion {
  id: number
  name: string
  region: string
  type: string
}

interface SearchBarProps {
  initialDestination?: string
}

export default function SearchBar({ initialDestination = "São Paulo" }: SearchBarProps) {
  const [destination, setDestination] = useState(initialDestination)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [checkIn, setCheckIn] = useState("2022-12-22")
  const [checkOut, setCheckOut] = useState("2022-12-28")
  const [guests, setGuests] = useState(2)

  const router = useRouter()

  useEffect(() => {
    if (destination.length > 1) {
      fetch(`http://localhost:3333/suggestions`)
        .then(res => res.json())
        .then((data: Suggestion[]) => {
          const filtered = data.filter(s =>
            s.name.toLowerCase().includes(destination.toLowerCase())
          )
          setSuggestions(filtered)
          setShowSuggestions(true)
        })
        .catch(() => {
          setSuggestions([])
          setShowSuggestions(false)
        })
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [destination])

  const handleSelectSuggestion = (s: Suggestion) => {
    setDestination(s.name)
    setShowSuggestions(false)
  }

  const handleSearch = () => {
    if (destination.trim() !== "") {
      router.push(
        `/search?destination=${encodeURIComponent(
          destination
        )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      )
    } else {
      alert("Digite um destino válido!")
    }
  }

  return (
    <section className="flex justify-center w-full my-8 px-2">
      <div style={{ padding: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }} className="bg-hotel-white shadow-2xl rounded-[12px] w-full max-w-[1307px] h-[34px] px-4 flex items-center gap-4">
        <div className="flex flex-1 gap-4">
          <div className="flex-1 flex flex-col justify-center relative">
            <div className="flex items-center">
              <img src="/icons/destiny.svg" alt="Destino" className="w-[18px] h-[18px] mr-[10px]" />
              <label className="text-hotel-caption font-normal text-[14px] leading-[26px] tracking-normal">
                Destino
              </label>
            </div>
            <input
              style={{ color: '#00264D', fontWeight: 600 }}
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => destination.length > 1 && setShowSuggestions(true)}
              placeholder="Digite o destino"
              className="h-[28px] w-full max-w-[200px] px-2 text-[12px] leading-[26px] font-semibold tracking-normal font-poppins border border-gray-200 rounded-md text-[16px] g-white border-none outline-none"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full bg-white border border-hotel-light-gray shadow-md rounded-md mt-1 max-h-60 overflow-y-auto z-50">
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => handleSelectSuggestion(s)}
                    className="px-4 py-2 cursor-pointer hover:bg-hotel-light-gray"
                  >
                    <span className="font-medium text-hotel-text">{s.name}</span>
                    <span className="ml-2 text-sm text-hotel-caption">{s.region}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center">
              <img src="/icons/calendar.svg" alt="Entrada" className="w-[18px] h-[18px] mr-[10px]" />
              <label className="text-hotel-caption font-normal text-[14px] leading-[26px] tracking-normal">
                Entrada
              </label>
            </div>
            <input
              style={{ color: '#00264D', fontWeight: 600 }}
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="h-[28px] w-full max-w-[200px] px-2 text-[12px] leading-[26px] font-semibold tracking-normal font-poppins border border-gray-200 rounded-md text-[16px] g-white border-none outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center">
              <img src="/icons/calendar.svg" alt="Saida" className="w-[18px] h-[18px] mr-[10px]" />
              <label className="text-hotel-caption font-normal text-[14px] leading-[26px] tracking-normal">
                Saída
              </label>
            </div>
            <input
              style={{ color: '#00264D', fontWeight: 600 }}
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="h-[28px] w-full max-w-[200px] px-2 text-[12px] leading-[26px] font-semibold tracking-normal font-poppins border border-gray-200 rounded-md text-[16px] g-white border-none outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center">
              <img src="/icons/person.svg" alt="Hospede" className="w-[18px] h-[18px] mr-[10px]" />
              <label className="text-hotel-caption font-normal text-[14px] leading-[26px] tracking-normal">
                Hóspedes
              </label>
            </div>
            <input
              style={{ color: '#00264D', fontWeight: 600 }}
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="h-[28px] w-full max-w-[200px] px-2 text-[12px] leading-[26px] font-semibold tracking-normal font-poppins border border-gray-200 rounded-md text-[16px] g-white border-none outline-none"
            />
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <button
            style={{ color: '#FFFFFF', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', border: "none", outline: "none" }}
            onClick={handleSearch}
            className="bg-hotel-primary hover:bg-blue-600 text-[14px] font-semibold rounded-full w-[118px] h-[38px]"
          >
            Pesquisar
          </button>
        </div>
      </div>
    </section>
  )
}
