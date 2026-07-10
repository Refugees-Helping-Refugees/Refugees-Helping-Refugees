"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function PdfViewer({ lang }: { lang: string }) {
  const [numPages, setNumPages] = useState(0)

  return (
    <Document
      file={`/api/poster/${lang}`}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      loading={<p className="text-gray-400 mt-8">Loading...</p>}
      error={<p className="text-red-400 mt-8">Failed to load PDF.</p>}
    >
      {Array.from({ length: numPages }, (_, i) => (
        <div key={i} className="mb-4">
          <Page
            pageNumber={i + 1}
            width={Math.min(600, window.innerWidth - 40)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </div>
      ))}
    </Document>
  )
}
