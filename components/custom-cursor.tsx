"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only run on client side and after component is mounted
    if (!isMounted || typeof window === "undefined") return

    // Check if we're on mobile - don't show custom cursor on mobile
    const isMobile = window.innerWidth <= 768
    if (isMobile) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("clickable")

      setIsHovering(isClickable)
    }

    const handleHoverEnd = () => {
      setIsHovering(false)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseover", handleHoverStart)
    window.addEventListener("mouseout", handleHoverEnd)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseover", handleHoverStart)
      window.removeEventListener("mouseout", handleHoverEnd)
    }
  }, [isVisible, isMounted])

  // Don't render anything until mounted or if not visible
  if (!isMounted || !isVisible) return null

  return (
    <div
      className={`custom-cursor ${isHovering ? "hover" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}
