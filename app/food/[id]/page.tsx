"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Heart, Share, Plus, Minus, ShoppingCart, ChevronLeft, Info } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { notFound, useRouter } from "next/navigation"

// Food database
const foodItems = [
  // Pizza items
  {
    id: 101,
    name: "Veggie Supreme Pizza",
    restaurant: "Pizza Paradise",
    restaurantId: 5,
    category: "Pizza",
    price: 14.99,
    rating: 4.7,
    image: "/images/veggie-supreme-pizza.png",
    prepTime: "20-30",
    description:
      "A delightful mix of fresh vegetables on a crispy crust. Topped with bell peppers, onions, mushrooms, olives, and tomatoes on our signature sauce.",
    ingredients: [
      "Bell peppers",
      "Onions",
      "Mushrooms",
      "Black olives",
      "Tomatoes",
      "Mozzarella cheese",
      "Tomato sauce",
    ],
    isPopular: true,
    calories: 280,
    isVegetarian: true,
  },
  {
    id: 102,
    name: "Pepperoni Feast",
    restaurant: "Pizza Palace",
    restaurantId: 4,
    category: "Pizza",
    price: 16.99,
    rating: 4.8,
    image: "/images/pepperoni-feast.png",
    prepTime: "25-35",
    description: "Loaded with savory pepperoni slices on a bed of melted cheese and our signature tomato sauce.",
    ingredients: ["Pepperoni", "Mozzarella cheese", "Tomato sauce", "Italian herbs"],
    calories: 350,
    isVegetarian: false,
  },
  {
    id: 103,
    name: "Margherita Classic",
    restaurant: "Italian Corner",
    restaurantId: 3,
    category: "Pizza",
    price: 12.99,
    rating: 4.5,
    image: "/images/margherita-classic.png",
    prepTime: "15-25",
    description: "A simple yet delicious pizza with fresh basil, mozzarella, and tomato. The classic Italian favorite.",
    ingredients: ["Fresh mozzarella", "Tomatoes", "Fresh basil", "Olive oil", "Tomato sauce"],
    calories: 260,
    isVegetarian: true,
  },
  {
    id: 104,
    name: "Meat Lovers Pizza",
    restaurant: "Pizza Palace",
    restaurantId: 4,
    category: "Pizza",
    price: 18.99,
    rating: 4.9,
    image: "/images/meat-lovers-pizza.png",
    prepTime: "25-35",
    description:
      "A carnivore's delight with a variety of meats including pepperoni, sausage, bacon, and ham on our signature crust.",
    ingredients: ["Pepperoni", "Sausage", "Bacon", "Ham", "Mozzarella cheese", "Tomato sauce"],
    isNew: true,
    calories: 420,
    isVegetarian: false,
  },

  // Burger items
  {
    id: 201,
    name: "Classic Cheeseburger",
    restaurant: "Burger Palace",
    restaurantId: 2,
    category: "Burgers",
    price: 9.99,
    rating: 4.6,
    image: "/images/classic-cheeseburger.png",
    prepTime: "15-25",
    description: "A juicy beef patty with cheese, lettuce, tomato, and onion on a toasted sesame seed bun.",
    ingredients: ["Beef patty", "American cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame seed bun"],
    isPopular: true,
    calories: 580,
    isVegetarian: false,
  },
  {
    id: 202,
    name: "Double Bacon Burger",
    restaurant: "Burger Shack",
    restaurantId: 6,
    category: "Burgers",
    price: 12.99,
    rating: 4.8,
    image: "/images/double-bacon-burger.png",
    prepTime: "20-30",
    description: "Two beef patties with crispy bacon and all the fixings for the ultimate burger experience.",
    ingredients: ["Two beef patties", "Bacon", "Cheddar cheese", "Lettuce", "Tomato", "Onion", "Mayo", "Brioche bun"],
    calories: 820,
    isVegetarian: false,
  },
  {
    id: 203,
    name: "Veggie Burger",
    restaurant: "Green Eats",
    restaurantId: 8,
    category: "Burgers",
    price: 8.99,
    rating: 4.3,
    image: "/images/veggie-burger.png",
    prepTime: "15-20",
    description: "A flavorful plant-based patty with fresh toppings including lettuce, tomato, and our special sauce.",
    ingredients: ["Plant-based patty", "Lettuce", "Tomato", "Onion", "Vegan mayo", "Whole grain bun"],
    calories: 420,
    isVegetarian: true,
  },
  {
    id: 204,
    name: "Spicy Jalapeño Burger",
    restaurant: "Burger Palace",
    restaurantId: 2,
    category: "Burgers",
    price: 11.99,
    rating: 4.7,
    image: "/images/spicy-jalapeno-burger.png",
    prepTime: "15-25",
    description: "A burger with a kick, featuring jalapeños and spicy sauce that will satisfy your craving for heat.",
    ingredients: ["Beef patty", "Pepper jack cheese", "Jalapeños", "Lettuce", "Tomato", "Spicy mayo", "Brioche bun"],
    isNew: true,
    calories: 650,
    isVegetarian: false,
  },

  // Sushi items
  {
    id: 301,
    name: "Salmon Nigiri Set",
    restaurant: "Sushi Sensation",
    restaurantId: 7,
    category: "Sushi",
    price: 16.99,
    rating: 4.8,
    image: "/images/salmon-nigiri-set.png",
    prepTime: "20-30",
    description: "Fresh salmon slices on perfectly seasoned rice. Includes 6 pieces of premium salmon nigiri.",
    ingredients: ["Fresh salmon", "Sushi rice", "Wasabi", "Soy sauce"],
    isPopular: true,
    calories: 320,
    isVegetarian: false,
  },
  {
    id: 302,
    name: "Dragon Roll",
    restaurant: "Tokyo Treats",
    restaurantId: 9,
    category: "Sushi",
    price: 14.99,
    rating: 4.7,
    image: "/images/dragon-roll.png",
    prepTime: "25-35",
    description: "Shrimp tempura roll topped with avocado and special sauce. A visually stunning and delicious roll.",
    ingredients: ["Shrimp tempura", "Avocado", "Cucumber", "Sushi rice", "Nori", "Eel sauce"],
    calories: 450,
    isVegetarian: false,
  },
  {
    id: 303,
    name: "California Roll Set",
    restaurant: "Sushi Sensation",
    restaurantId: 7,
    category: "Sushi",
    price: 12.99,
    rating: 4.5,
    image: "/images/california-roll-set.png",
    prepTime: "15-25",
    description: "Classic California rolls with crab, avocado, and cucumber. Includes 8 pieces.",
    ingredients: ["Imitation crab", "Avocado", "Cucumber", "Sushi rice", "Nori", "Sesame seeds"],
    calories: 350,
    isVegetarian: false,
  },
  {
    id: 304,
    name: "Spicy Tuna Roll",
    restaurant: "Ocean Flavors",
    restaurantId: 10,
    category: "Sushi",
    price: 13.99,
    rating: 4.6,
    image: "/images/spicy-tuna-roll.png",
    prepTime: "20-30",
    description: "Fresh tuna mixed with spicy mayo and topped with tobiko. A perfect balance of heat and flavor.",
    ingredients: ["Fresh tuna", "Spicy mayo", "Cucumber", "Tobiko (fish roe)", "Sushi rice", "Nori"],
    isNew: true,
    calories: 380,
    isVegetarian: false,
  },

  // Pasta items
  {
    id: 401,
    name: "Creamy Chicken Alfredo",
    restaurant: "Pasta Paradise",
    restaurantId: 3,
    category: "Pasta",
    price: 15.99,
    rating: 4.7,
    image: "/images/creamy-chicken-pasta.png",
    prepTime: "20-30",
    description: "Penne pasta with grilled chicken in a rich, creamy sauce with spinach and green peas.",
    ingredients: [
      "Penne pasta",
      "Grilled chicken",
      "Alfredo sauce",
      "Spinach",
      "Green peas",
      "Parmesan cheese",
      "Garlic",
    ],
    isPopular: true,
    calories: 780,
    isVegetarian: false,
  },
  {
    id: 402,
    name: "Spaghetti Bolognese",
    restaurant: "Italian Corner",
    restaurantId: 3,
    category: "Pasta",
    price: 13.99,
    rating: 4.6,
    image: "/images/spaghetti-bolognese.png",
    prepTime: "20-30",
    description: "Classic Italian spaghetti with rich meat sauce, herbs, and grated parmesan cheese.",
    ingredients: [
      "Spaghetti",
      "Ground beef",
      "Tomato sauce",
      "Onions",
      "Carrots",
      "Celery",
      "Italian herbs",
      "Parmesan cheese",
    ],
    calories: 650,
    isVegetarian: false,
  },
  {
    id: 403,
    name: "Vegetable Primavera",
    restaurant: "Green Eats",
    restaurantId: 8,
    category: "Pasta",
    price: 12.99,
    rating: 4.4,
    image: "/images/vegetable-primavera.png",
    prepTime: "15-25",
    description: "Pasta with fresh seasonal vegetables in a light garlic and olive oil sauce.",
    ingredients: [
      "Spaghetti",
      "Bell peppers",
      "Cherry tomatoes",
      "Zucchini",
      "Yellow squash",
      "Basil",
      "Garlic",
      "Olive oil",
    ],
    calories: 520,
    isVegetarian: true,
  },
  {
    id: 404,
    name: "Seafood Linguine",
    restaurant: "Ocean Flavors",
    restaurantId: 10,
    category: "Pasta",
    price: 18.99,
    rating: 4.8,
    image: "/images/seafood-linguine.png",
    prepTime: "25-35",
    description: "Linguine pasta with shrimp, mussels, and calamari in a flavorful tomato sauce.",
    ingredients: [
      "Linguine",
      "Shrimp",
      "Mussels",
      "Calamari",
      "Tomato sauce",
      "Garlic",
      "White wine",
      "Red pepper flakes",
      "Parsley",
    ],
    isNew: true,
    calories: 620,
    isVegetarian: false,
  },

  // Salad items
  {
    id: 501,
    name: "Greek Salad",
    restaurant: "Green Eats",
    restaurantId: 8,
    category: "Salads",
    price: 10.99,
    rating: 4.5,
    image: "/images/greek-salad.png",
    prepTime: "10-15",
    description: "Fresh greens with tomatoes, cucumbers, red onions, olives, and feta cheese with Greek dressing.",
    ingredients: [
      "Romaine lettuce",
      "Cucumber",
      "Tomatoes",
      "Red onion",
      "Kalamata olives",
      "Feta cheese",
      "Greek dressing",
    ],
    isPopular: true,
    calories: 320,
    isVegetarian: true,
  },
  {
    id: 502,
    name: "Caesar Salad",
    restaurant: "Healthy Bites",
    restaurantId: 10,
    category: "Salads",
    price: 9.99,
    rating: 4.4,
    image: "/images/caesar-salad.png",
    prepTime: "10-15",
    description: "Crisp romaine lettuce with croutons, parmesan cheese, and our signature Caesar dressing.",
    ingredients: ["Romaine lettuce", "Croutons", "Parmesan cheese", "Caesar dressing", "Grilled chicken"],
    calories: 380,
    isVegetarian: false,
  },
  {
    id: 503,
    name: "Cobb Salad",
    restaurant: "Green Eats",
    restaurantId: 8,
    category: "Salads",
    price: 12.99,
    rating: 4.6,
    image: "/images/cobb-salad.png",
    prepTime: "15-20",
    description:
      "Mixed greens topped with grilled chicken, bacon, hard-boiled egg, avocado, tomatoes, and blue cheese.",
    ingredients: [
      "Mixed greens",
      "Grilled chicken",
      "Bacon",
      "Hard-boiled egg",
      "Avocado",
      "Tomatoes",
      "Blue cheese",
      "Ranch dressing",
    ],
    calories: 540,
    isVegetarian: false,
  },
  {
    id: 504,
    name: "Quinoa Veggie Bowl",
    restaurant: "Healthy Bites",
    restaurantId: 10,
    category: "Salads",
    price: 11.99,
    rating: 4.7,
    image: "/images/quinoa-veggie-bowl.png",
    prepTime: "15-20",
    description: "Protein-rich quinoa with avocado, black beans, corn, tomatoes, and a zesty lime dressing.",
    ingredients: [
      "Quinoa",
      "Avocado",
      "Black beans",
      "Corn",
      "Cherry tomatoes",
      "Red onion",
      "Cilantro",
      "Lime dressing",
    ],
    isNew: true,
    calories: 420,
    isVegetarian: true,
  },

  // Dessert items
  {
    id: 601,
    name: "Tiramisu",
    restaurant: "Italian Corner",
    restaurantId: 3,
    category: "Desserts",
    price: 7.99,
    rating: 4.8,
    image: "/images/tiramisu.png",
    prepTime: "5-10",
    description:
      "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.",
    ingredients: ["Ladyfingers", "Mascarpone cheese", "Coffee", "Eggs", "Sugar", "Cocoa powder"],
    isPopular: true,
    calories: 420,
    isVegetarian: true,
  },
  {
    id: 602,
    name: "Chocolate Lava Cake",
    restaurant: "Sweet Treats",
    restaurantId: 11,
    category: "Desserts",
    price: 8.99,
    rating: 4.9,
    image: "/images/chocolate-lava-cake.png",
    prepTime: "15-20",
    description: "Warm chocolate cake with a gooey molten chocolate center, served with vanilla ice cream.",
    ingredients: ["Chocolate", "Flour", "Eggs", "Butter", "Sugar", "Vanilla ice cream"],
    calories: 550,
    isVegetarian: true,
  },
  {
    id: 603,
    name: "Strawberry Cheesecake",
    restaurant: "Sweet Treats",
    restaurantId: 11,
    category: "Desserts",
    price: 6.99,
    rating: 4.7,
    image: "/images/strawberry-cheesecake.png",
    prepTime: "5-10",
    description: "Creamy New York-style cheesecake topped with fresh strawberry sauce.",
    ingredients: ["Cream cheese", "Graham cracker crust", "Sugar", "Eggs", "Vanilla", "Strawberries"],
    calories: 480,
    isVegetarian: true,
  },
  {
    id: 604,
    name: "Ice Cream Sundae",
    restaurant: "Dessert Palace",
    restaurantId: 12,
    category: "Desserts",
    price: 5.99,
    rating: 4.6,
    image: "/images/ice-cream-sundae.png",
    prepTime: "5-10",
    description: "Delicious vanilla and chocolate ice cream with whipped cream, chocolate sauce, and nuts.",
    ingredients: ["Vanilla ice cream", "Chocolate ice cream", "Whipped cream", "Chocolate sauce", "Nuts", "Cherry"],
    isNew: true,
    calories: 520,
    isVegetarian: true,
  },
]

export default function FoodItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const id = Number.parseInt(params.id)
  const foodItem = foodItems.find((item) => item.id === id)

  if (!foodItem) {
    notFound()
  }

  // Related items - same category but not the same item
  const relatedItems = foodItems
    .filter((item) => item.category === foodItem.category && item.id !== foodItem.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    try {
      // Get existing cart from localStorage or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === foodItem.id)

      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        existingCart[existingItemIndex].quantity += quantity
      } else {
        // If item doesn't exist, add it with the selected quantity
        existingCart.push({
          ...foodItem,
          quantity: quantity,
        })
      }

      // Save updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart))

      // Show toast notification
      toast({
        title: "Added to cart",
        description: `${quantity} × ${foodItem.name} added to your cart`,
      })

      // Reset quantity
      setQuantity(1)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      })
    }
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  // Convert price to Indian Rupees (approximate conversion)
  const priceInRupees = (foodItem.price * 83).toFixed(0)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ChevronLeft className="h-4 w-4 mr-2" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Food Image */}
        <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden">
          <ImageWithFallback
            src={foodItem.image || "/placeholder.svg"}
            alt={foodItem.name}
            fill
            className="object-cover"
            fallbackType="food"
          />
          {foodItem.isVegetarian && <Badge className="absolute top-4 left-4 bg-green-500">Vegetarian</Badge>}
          {foodItem.isPopular && <Badge className="absolute top-4 right-4 bg-orange-500">Popular</Badge>}
        </div>

        {/* Food Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{foodItem.name}</h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium">{foodItem.rating}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">{foodItem.category}</span>
            <span className="text-gray-500 dark:text-gray-400">{foodItem.calories} cal</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/restaurants/${foodItem.restaurantId}`} className="text-primary hover:underline">
              {foodItem.restaurant}
            </Link>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              <span>{foodItem.prepTime} min</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300">{foodItem.description}</p>

          <div>
            <h3 className="font-medium mb-2">Ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              {foodItem.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="outline">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">₹{priceInRupees}</span>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "text-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center space-x-4">
            <div className="flex items-center border rounded-full overflow-hidden">
              <Button variant="ghost" size="icon" className="rounded-none h-10 w-10" onClick={decreaseQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" className="rounded-none h-10 w-10" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          <div className="pt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Info className="h-4 w-4 mr-1" />
            <span>Free delivery on orders over ₹500</span>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedItems.map((item) => (
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
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.restaurant}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-primary">₹{(item.price * 83).toFixed(0)}</span>
                    <Button size="sm" variant="secondary" className="rounded-full">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
