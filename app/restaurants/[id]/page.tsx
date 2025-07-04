"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, MapPin, Heart, Share, Plus, Minus, ShoppingCart } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  popular?: boolean
  veg?: boolean
}

interface MenuCategory {
  id: number
  name: string
  items: MenuItem[]
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("menu")
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({})

  // Mock restaurant data
  const restaurant = {
    id: Number.parseInt(params.id),
    name: "Spice Garden",
    coverImage: "/images/restaurant1.png",
    logo: "/images/logo.png",
    cuisine: "Indian",
    rating: 4.7,
    reviewCount: 243,
    deliveryTime: "25-35",
    distance: "1.2",
    address: "123 Main St, Anytown, USA",
    openingHours: "10:00 AM - 10:00 PM",
    description:
      "Authentic Indian cuisine with a modern twist. Our chefs use traditional recipes and fresh ingredients to create delicious dishes that will transport you to India.",
  }

  // Mock menu data
  const menuCategories: MenuCategory[] = [
    {
      id: 1,
      name: "Starters",
      items: [
        {
          id: 101,
          name: "Vegetable Samosa",
          description: "Crispy pastry filled with spiced potatoes and peas",
          price: 5.99,
          image: "/images/food1.png",
          popular: true,
          veg: true,
        },
        {
          id: 102,
          name: "Chicken Tikka",
          description: "Tender chicken pieces marinated in spices and grilled",
          price: 8.99,
          image: "/images/food2.png",
        },
      ],
    },
    {
      id: 2,
      name: "Main Course",
      items: [
        {
          id: 201,
          name: "Butter Chicken",
          description: "Tender chicken cooked in a rich tomato and butter sauce",
          price: 14.99,
          image: "/images/food3.png",
          popular: true,
        },
        {
          id: 202,
          name: "Paneer Tikka Masala",
          description: "Cottage cheese cubes in a spiced tomato gravy",
          price: 12.99,
          image: "/images/food4.png",
          veg: true,
        },
      ],
    },
    {
      id: 3,
      name: "Breads & Rice",
      items: [
        {
          id: 301,
          name: "Garlic Naan",
          description: "Leavened bread topped with garlic and butter",
          price: 3.99,
          image: "/images/food1.png",
          veg: true,
        },
        {
          id: 302,
          name: "Vegetable Biryani",
          description: "Fragrant rice cooked with mixed vegetables and spices",
          price: 10.99,
          image: "/images/food2.png",
          veg: true,
        },
      ],
    },
  ]

  const addToCart = (itemId: number) => {
    try {
      setCartItems((prev) => {
        const newItems = { ...prev }
        newItems[itemId] = (newItems[itemId] || 0) + 1
        return newItems
      })

      // Update localStorage cart
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
      const item = menuCategories.flatMap((category) => category.items).find((item) => item.id === itemId)

      if (item) {
        const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === itemId)

        if (existingItemIndex >= 0) {
          existingCart[existingItemIndex].quantity += 1
        } else {
          existingCart.push({
            ...item,
            quantity: 1,
            restaurant: restaurant.name,
          })
        }

        localStorage.setItem("cart", JSON.stringify(existingCart))
      }

      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const removeFromCart = (itemId: number) => {
    try {
      setCartItems((prev) => {
        const newItems = { ...prev }
        if (newItems[itemId] > 1) {
          newItems[itemId] -= 1
        } else {
          delete newItems[itemId]
        }
        return newItems
      })

      // Update localStorage cart
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === itemId)

      if (existingItemIndex >= 0) {
        if (existingCart[existingItemIndex].quantity > 1) {
          existingCart[existingItemIndex].quantity -= 1
        } else {
          existingCart.splice(existingItemIndex, 1)
        }

        localStorage.setItem("cart", JSON.stringify(existingCart))
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  const getItemQuantity = (itemId: number) => {
    return cartItems[itemId] || 0
  }

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0)
  }

  return (
    <div className="fade-in">
      {/* Restaurant Cover */}
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={restaurant.coverImage || "/placeholder.svg"}
          alt={restaurant.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=400&width=600"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto flex items-end justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={restaurant.logo || "/placeholder.svg"}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=100&width=100"
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{restaurant.name}</h1>
                <p className="text-white/80">{restaurant.cuisine}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{restaurant.rating}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">({restaurant.reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{restaurant.distance} mi</span>
            </div>
          </div>
          <div>
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800"
            >
              Open Now
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {/* Menu Categories */}
            <Accordion type="single" collapsible className="w-full">
              {menuCategories.map((category) => (
                <AccordionItem key={category.id} value={`category-${category.id}`}>
                  <AccordionTrigger className="text-lg font-semibold">{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {category.items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex">
                              <div className="flex-1 p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="font-medium">
                                      {item.name}
                                      {item.veg && (
                                        <span className="ml-2 inline-block h-4 w-4 rounded-sm border border-green-500 bg-white p-0.5">
                                          <span className="block h-full w-full rounded-sm bg-green-500"></span>
                                        </span>
                                      )}
                                    </h3>
                                    {item.popular && (
                                      <Badge
                                        variant="outline"
                                        className="mt-1 text-xs bg-orange-50 text-orange-600 border-orange-200"
                                      >
                                        Popular
                                      </Badge>
                                    )}
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                                    <p className="font-semibold mt-2">${item.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="relative h-24 w-24 flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "/placeholder.svg?height=100&width=100"
                                  }}
                                />
                                <div className="absolute bottom-2 right-2">
                                  {getItemQuantity(item.id) > 0 ? (
                                    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full shadow-md p-1">
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={() => removeFromCart(item.id)}
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="text-xs font-medium w-4 text-center">
                                        {getItemQuantity(item.id)}
                                      </span>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={() => addToCart(item.id)}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button
                                      size="icon"
                                      className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
                                      onClick={() => addToCart(item.id)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl font-bold">{restaurant.rating}</div>
                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(restaurant.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Based on {restaurant.reviewCount} reviews</p>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      The food was amazing! I ordered the Butter Chicken and Garlic Naan, and it was delicious. The
                      delivery was also very quick. Will definitely order again.
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Load More Reviews
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Restaurant Information</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">About</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{restaurant.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Address</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{restaurant.address}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Opening Hours</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{restaurant.openingHours}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Cuisines</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline">{restaurant.cuisine}</Badge>
                    <Badge variant="outline">Vegetarian Options</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Payment Methods</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline">Cash</Badge>
                    <Badge variant="outline">Credit Card</Badge>
                    <Badge variant="outline">Online Payment</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cart Button */}
      {getTotalCartItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10">
          <div className="container mx-auto">
            <Button className="w-full flex items-center justify-between" size="lg" asChild>
              <Link href="/cart">
                <div className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  <span>{getTotalCartItems()} items</span>
                </div>
                <span>View Cart</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
