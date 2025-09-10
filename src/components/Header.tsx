"use client"

export default function Header() {
  return (
    <header className="w-full border-b border-gray-300 py-4 px-6 flex justify-between items-center" style={{ backgroundColor: "var(--hotel-primary)" }}>
      <h1
        className="font-semibold text-[20px] leading-[26px] text-hotel-text text-right"
        style={{ width: '101px', height: '26px' }}
      >INFOTRAVEL</h1>
      <button className="flex items-center gap-2 text-hotel-blue font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A8 8 0 1116.95 6.05M15 12h.01"
          />
        </svg>
        Iniciar sessão
      </button>
    </header>
  )
}