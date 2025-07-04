"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RestaurantCardProps {
  restaurant: {
    id: number
    name: string
    image: string
    cuisine: string
    rating: number
    deliveryTime: string
    distance: string
  }
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-2">
        <div className="relative h-48 w-full">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=200&width=300"
            }}
          />
          <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium">{restaurant.rating}</span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{restaurant.name}</h3>
              <Badge variant="outline" className="text-xs">
                {restaurant.cuisine}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{restaurant.deliveryTime} min</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{restaurant.distance} mi</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
