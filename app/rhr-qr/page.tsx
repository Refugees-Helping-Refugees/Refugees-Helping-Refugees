"use client"

import { useState, useRef } from "react"
import dynamic from "next/dynamic"

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false })

const languages = [
  { label: "English", key: "english" },
  { label: "Arabic / عربي", key: "arabic" },
  { label: "Spanish / Español", key: "spanish" },
  { label: "Somali / Soomaali", key: "somali" },
  { label: "Dari / دری", key: "dari" },
]

export default function RhrQrPage() {
  const [selected, setSelected] = useState("english")
  const pdfRef = useRef<HTMLDivElement>(null)

  function handleSelect(key: string) {
    setSelected(key)
    setTimeout(() => {
      pdfRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
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

      {/* PDF viewer */}
      <div ref={pdfRef} className="flex-1 flex flex-col items-center py-6 px-4 overflow-y-auto">
        <PdfViewer key={selected} lang={selected} />
      </div>
    </main>
  )
}
