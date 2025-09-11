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

export default function SearchBar({ initialDestination = "" }: SearchBarProps) {
  const [destination, setDestination] = useState(initialDestination)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

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
      router.push(`/search?destination=${encodeURIComponent(destination)}`)
    } else {
      alert("Digite um destino válido!")
    }
  }

  return (
    <section className="flex flex-col items-center justify-center w-full my-8">
      <div className="flex flex-wrap bg-hotel-white shadow-md rounded-lg overflow-visible w-[90%] max-w-5xl">
        <div className="flex-1 p-4 border-r relative">
          <p className="text-hotel-caption text-sm">Destino</p>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => destination.length > 1 && setShowSuggestions(true)}
            placeholder="Digite o destino"
            className="font-semibold text-hotel-text w-full outline-none"
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
        <div className="flex-1 p-4 border-r">
          <p className="text-hotel-caption text-sm">Entrada</p>
          <p className="font-semibold text-hotel-text">22/12/2022</p>
        </div>
        <div className="flex-1 p-4 border-r">
          <p className="text-hotel-caption text-sm">Saída</p>
          <p className="font-semibold text-hotel-text">28/12/2022</p>
        </div>
        <div className="flex-1 p-4 border-r">
          <p className="text-hotel-caption text-sm">Hóspedes</p>
          <p className="font-semibold text-hotel-text">2 Adultos, 1 Quarto</p>
        </div>
        <div className="flex items-center justify-center p-4">
          <button
            onClick={handleSearch}
            className="bg-hotel-primary hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2"
          >
            Pesquisar
          </button>
        </div>
      </div>
    </section>
  )
}
