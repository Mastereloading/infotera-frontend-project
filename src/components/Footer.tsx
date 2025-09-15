"use client"

import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  
  const footerStyle =
  pathname.includes("/confirmed")
    ? { display: "none" }
    : { backgroundColor: "var(--hotel-white)" }
  
  return (
    <footer className="w-full h-16 flex items-center justify-center bg-hotel-dark text-white flex-shrink-0" style={{ ...footerStyle }}>
      <p className="text-hotel-text">© 2022 | Todos os direitos reservados</p>
    </footer>
  )
}