"use client"

export default function ClientMainWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-start px-[70px] py-8">
      {children}
    </main>
  )
}