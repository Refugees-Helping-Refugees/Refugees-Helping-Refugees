"use client"

import { useState, useEffect } from "react"

export default function PdfViewer({ lang }: { lang: string }) {
  const [numPages, setNumPages] = useState<number | null>(null)

  useEffect(() => {
    fetch("/poster/manifest.json")
      .then((r) => r.json())
      .then((manifest) => setNumPages(manifest[lang] ?? 0))
      .catch(() => setNumPages(0))
  }, [lang])

  if (numPages === null) return <p className="text-gray-400 mt-8">Loading...</p>
  if (numPages === 0) return <p className="text-red-400 mt-8">Poster not available.</p>

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
      {Array.from({ length: numPages }, (_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/poster/${lang}/page-${i + 1}.png`}
          alt={`Page ${i + 1}`}
          className="w-full rounded shadow"
        />
      ))}
    </div>
  )
}
