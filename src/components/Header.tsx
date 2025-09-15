"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const headerStyle =
    pathname === "/"
      ? { backgroundColor: "var(--hotel-light-gray)" }
      : pathname.includes("/confirmed")
      ? { display: "none" }
      : {
          boxShadow: "0 1px 10px rgba(0,0,0,0.15)",
          backgroundColor: "var(--hotel-white)",
        }
  const divStyle =
    pathname === "/"
      ? { marginTop: "1vw", marginLeft: "8vw", marginRight: "8vw" }
      : { marginLeft: "8vw", marginRight: "8vw" }

  const router = useRouter()

  return (
    <header
      className="w-full border-b border-gray-300 py-4 px-6 flex justify-between items-center"
      style={{ ...headerStyle }}
    >
      <div
        style={{ ...divStyle }}
        className="w-full flex justify-between items-center header-container"
      >
        <h1
          className="font-semibold text-[28px] leading-[26px] text-hotel-text text-right header-title"
          style={{ width: "101px", height: "26px" }}
        >
          infotravel
        </h1>
        <div className="flex items-center gap-2 text-hotel-blue font-semibold header-actions">
          <div
            style={{ display: pathname === "/" ? "none" : "" }}
            className="flex items-center"
            onClick={() => router.push("/")}
          >
            <img
              src="/icons/return.svg"
              alt="Login"
              className="w-[18px] h-[18px] mr-[10px]"
            />
            <label
              style={{ paddingRight: "20px" }}
              className="text-hotel-caption font-normal text-[16px] leading-[26px] tracking-normal"
            >
              Página Inicial
            </label>
          </div>
          <img
            src="/icons/login.svg"
            alt="Login"
            className="w-[18px] h-[18px] mr-[10px] action-login"
          />
          <label className="text-hotel-caption font-normal text-[16px] leading-[26px] tracking-normal action-login">
            Iniciar Sessão
          </label>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .header-container {
            justify-content: center;
          }

          .header-actions {
            display: none;
          }

          .header-title {
            margin: 2vw auto;
          }
        }
      `}</style>
    </header>
  )
}
