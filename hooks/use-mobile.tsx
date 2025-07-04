"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Set initial value
    checkIfMobile()

    // Add listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile
}
