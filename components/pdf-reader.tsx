"use client"

import { useState, useCallback } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfReaderProps {
  url: string
  title: string
}

export default function PdfReader({ url, title }: PdfReaderProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [scale, setScale] = useState(1.2)
  const [loading, setLoading] = useState(true)

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setLoading(false)
  }, [])

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const goToNext = () => setCurrentPage((p) => Math.min(numPages, p + 1))
  const zoomIn = () => setScale((s) => Math.min(2.5, s + 0.2))
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.2))
  const resetZoom = () => setScale(1.2)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3 bg-card border border-border rounded-xl">
        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-foreground font-medium px-2">
            {loading ? "Loading..." : `${currentPage} / ${numPages}`}
          </span>
          <button
            onClick={goToNext}
            disabled={currentPage >= numPages}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 transition-all"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetZoom}
            className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-gold hover:border-gold/40 transition-all"
            aria-label="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={zoomIn}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 transition-all"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={resetZoom}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-all"
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF */}
      <div className="w-full overflow-auto rounded-xl border border-border bg-muted/30 flex justify-center py-6 min-h-[600px]">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center py-24 text-muted-foreground text-sm">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                Loading PDF...
              </span>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground text-sm gap-2">
              <p className="text-destructive">Failed to load PDF.</p>
              <p className="text-xs">Please refresh the page or contact support.</p>
            </div>
          }
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={goToPrev}
          disabled={currentPage <= 1}
          className="flex items-center gap-1.5 px-4 py-2 text-sm border border-border rounded-lg text-muted-foreground hover:text-gold hover:border-gold/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <span className="text-xs text-muted-foreground">Page {currentPage} of {numPages}</span>
        <button
          onClick={goToNext}
          disabled={currentPage >= numPages}
          className="flex items-center gap-1.5 px-4 py-2 text-sm border border-border rounded-lg text-muted-foreground hover:text-gold hover:border-gold/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
