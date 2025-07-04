"use client"

import dynamic from "next/dynamic"

// Dynamically import the custom cursor with no SSR
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false,
  loading: () => null,
})

export default function ClientWrapper() {
  return <CustomCursor />
}
