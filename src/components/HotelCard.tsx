"use client"

import Link from "next/link"

interface HotelCardProps {
  id: number
  name: string
  image: string
  stars: number
}

export default function HotelCard({ id, name, image, stars }: HotelCardProps) {
  return (
    <div
      style={{
        width: "397px",
        borderRadius: "24px",
        backgroundColor: "var(--hotel-white)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <div style={{ width: "100%", height: "265px", overflow: "hidden" }}>
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "24px",
          }}
        />
      </div>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h2 style={{ fontWeight: 600, fontSize: "18px", marginBottom: "12px", color: "var(--hotel-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {name}
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
          <div style={{ display: "flex", gap: "2px" }}>
            {Array.from({ length: stars }).map((_, i) => (
              <span key={i} style={{ color: "gold", fontSize: "16px" }}>★</span>
            ))}
          </div>
          <Link
            href={`/hotels/${id}`}
            style={{
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              backgroundColor: "var(--hotel-primary)",
              color: "#fff",
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: "999px",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Ver mais
          </Link>
        </div>
      </div>
    </div>
  )
}
