"use client"

import { Loader2 } from "lucide-react"

interface GlobalLoadingProps {
  text?: string
  fullScreen?: boolean
}

export default function GlobalLoading({
  text = "Loading...",
  fullScreen = true,
}: GlobalLoadingProps) {
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 z-50" : "relative min-h-[300px]"
      } flex items-center justify-center bg-background/80 backdrop-blur-sm`}
    >
      <div className="flex flex-col items-center gap-5">

        {/* Spinner */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />

        {/* Loading Text */}
        <p className="text-sm font-medium text-muted-foreground">
          {text}
        </p>


        {/* Animated Dots */}
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        </div>


        {/* Progress Bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[loading_1.5s_infinite] rounded-full bg-primary" />
        </div>

      </div>
    </div>
  )
}