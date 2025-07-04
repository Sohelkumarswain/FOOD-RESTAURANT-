"use client"

import Image from "next/image"
import { Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface FoodCardProps {
  food: {
    id: number
    name: string
    image: string
    restaurant: string
    price: number
    rating: number
  }
}

export default function FoodCard({ food }: FoodCardProps) {
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    try {
      // Get existing cart from localStorage or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === food.id)

      if (existingItemIndex >= 0) {
        // If item exists, increment quantity
        existingCart[existingItemIndex].quantity += 1
      } else {
        // If item doesn't exist, add it with quantity 1
        existingCart.push({
          ...food,
          quantity: 1,
        })
      }

      // Save updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart))

      // Show toast notification
      toast({
        title: "Added to cart",
        description: `${food.name} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      })
    }
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={food.image || "/placeholder.svg"}
          alt={food.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=100&width=100"
          }}
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-medium">{food.rating}</span>
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button onClick={handleAddToCart} className="bg-primary hover:bg-primary/90">
              Add to Cart
            </Button>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{food.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{food.restaurant}</p>
          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-primary">${food.price.toFixed(2)}</span>
            <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0" onClick={handleAddToCart}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
