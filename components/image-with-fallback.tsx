"use client"

import { useState } from "react"
import Image from "next/image"
import { getFallbackImage } from "@/lib/image-loader"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackType?: "food" | "restaurant" | "hero"
  className?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackType = "food",
  className,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setImgSrc(getFallbackImage(fallbackType))
      setHasError(true)
    }
  }

  return (
    <Image
      src={imgSrc || getFallbackImage(fallbackType)}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      onError={handleError}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      priority={priority}
      unoptimized={imgSrc.includes("placeholder.svg")}
    />
  )
}
