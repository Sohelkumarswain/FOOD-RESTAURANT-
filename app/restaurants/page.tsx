import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import RestaurantCard from "@/components/restaurant-card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RestaurantsPage() {
  // Mock restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Spice Garden",
      image: "/images/restaurant1.png",
      cuisine: "Indian",
      rating: 4.7,
      deliveryTime: "25-35",
      distance: "1.2",
    },
    {
      id: 2,
      name: "Burger Palace",
      image: "/images/restaurant2.png",
      cuisine: "American",
      rating: 4.5,
      deliveryTime: "15-25",
      distance: "0.8",
    },
    {
      id: 3,
      name: "Pasta Paradise",
      image: "/images/restaurant3.png",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "30-40",
      distance: "1.5",
    },
    {
      id: 4,
      name: "Sushi Sensation",
      image: "/images/restaurant4.png",
      cuisine: "Japanese",
      rating: 4.6,
      deliveryTime: "20-30",
      distance: "1.0",
    },
    {
      id: 5,
      name: "Taco Time",
      image: "/images/restaurant1.png",
      cuisine: "Mexican",
      rating: 4.4,
      deliveryTime: "20-35",
      distance: "1.8",
    },
    {
      id: 6,
      name: "Pizza Planet",
      image: "/images/restaurant2.png",
      cuisine: "Italian",
      rating: 4.3,
      deliveryTime: "25-40",
      distance: "2.0",
    },
    {
      id: 7,
      name: "Noodle House",
      image: "/images/restaurant3.png",
      cuisine: "Chinese",
      rating: 4.5,
      deliveryTime: "20-30",
      distance: "1.5",
    },
    {
      id: 8,
      name: "Falafel Factory",
      image: "/images/restaurant4.png",
      cuisine: "Middle Eastern",
      rating: 4.6,
      deliveryTime: "25-35",
      distance: "1.7",
    },
  ]

  const cuisineFilters = ["All", "Indian", "American", "Italian", "Japanese", "Chinese", "Mexican", "Middle Eastern"]

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search for restaurants or cuisines..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-6 flex flex-wrap h-auto gap-2">
          {cuisineFilters.map((cuisine) => (
            <TabsTrigger key={cuisine} value={cuisine.toLowerCase()}>
              {cuisine}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
            Fast Delivery
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
            4.5+ Rating
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
            Under 30 min
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
            Offers
          </Badge>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </TabsContent>

        {cuisineFilters.slice(1).map((cuisine) => (
          <TabsContent key={cuisine} value={cuisine.toLowerCase()} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurants
                .filter((restaurant) => restaurant.cuisine === cuisine)
                .map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More Restaurants</Button>
      </div>
    </div>
  )
}
