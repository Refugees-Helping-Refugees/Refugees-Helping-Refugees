"use client"

import { useState } from "react"
import Image from "next/image"

const languages = [
  { label: "English", key: "english" },
  { label: "Arabic / عربي", key: "arabic" },
  { label: "Spanish / Español", key: "spanish" },
  { label: "Somali / Soomaali", key: "somali" },
  { label: "Dari / دری", key: "dari" },
]

export default function RhrQrPage() {
  const [selected, setSelected] = useState("english")

  return (
    <main className="min-h-screen flex">
      {/* Left sidebar */}
      <div className="flex flex-col gap-3 p-6 w-56 border-r border-gray-200 justify-center">
        {languages.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`py-3 px-4 rounded-lg font-medium text-left transition-colors ${
              selected === key
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Right: poster image */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative w-full max-w-2xl aspect-[3/4]">
          <Image
            src={`/poster/poster_${selected}.png`}
            alt={`${selected} poster`}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </main>
  )
}
