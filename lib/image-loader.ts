// Custom image loader to handle fallbacks
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If the image is a placeholder, return it directly
  if (src.startsWith("/placeholder.svg")) {
    return src
  }

  // Otherwise, return the image path
  return src
}

// Function to get a fallback image if the main image fails to load
export function getFallbackImage(type: "food" | "restaurant" | "hero" = "food"): string {
  switch (type) {
    case "food":
      return "/placeholder.svg?height=200&width=200"
    case "restaurant":
      return "/placeholder.svg?height=300&width=400"
    case "hero":
      return "/placeholder.svg?height=400&width=600"
    default:
      return "/placeholder.svg?height=200&width=200"
  }
}
