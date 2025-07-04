import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, ChevronRight } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"

interface FoodItem {
  id: number
  name: string
  restaurant: string
  price: number
  rating: number
  image: string
  prepTime: string
  isNew?: boolean
  isPopular?: boolean
  description?: string
}

interface FoodCategoryProps {
  title: string
  description: string
  items: FoodItem[]
  viewAllHref: string
}

export default function FoodCategorySection({ title, description, items, viewAllHref }: FoodCategoryProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <Link href={viewAllHref} className="text-primary flex items-center text-sm font-medium">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link href={`/food/${item.id}`} key={item.id}>
              <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-2 h-full">
                <div className="relative h-48 w-full">
                  <ImageWithFallback
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    fallbackType="food"
                  />
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                  {item.isNew && <Badge className="absolute top-2 left-2 bg-accent text-white">New</Badge>}
                  {item.isPopular && <Badge className="absolute top-2 left-2 bg-orange-500 text-white">Popular</Badge>}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.restaurant}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{item.prepTime} min</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                    <Button size="sm" variant="secondary" className="rounded-full">
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
