"use client"

import { useState, useRef } from "react"
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
  const imageRef = useRef<HTMLDivElement>(null)

  function handleSelect(key: string) {
    setSelected(key)
    setTimeout(() => {
      imageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }, 50)
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Language buttons — top bar on mobile, left sidebar on desktop */}
      <div className="flex flex-row flex-wrap gap-2 p-4 md:flex-col md:gap-3 md:p-6 md:w-56 md:border-r md:border-gray-200 md:justify-center border-b border-gray-200">
        {languages.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors md:py-3 md:px-4 md:text-base md:text-left ${
              selected === key
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Poster image */}
      <div ref={imageRef} className="flex-1 flex items-center justify-center p-4 md:p-8">
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
