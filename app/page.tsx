import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Star, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ImageWithFallback from "@/components/image-with-fallback"
import FoodCategorySection from "@/components/food-category-section"
import AIAssistant from "@/components/ai-assistant"
import Logo from "@/components/logo"
import SearchBar from "@/components/search-bar"
import Image from "next/image"

// Food category data
const pizzaItems = [
  {
    id: 101,
    name: "Veggie Supreme Pizza",
    restaurant: "Pizza Paradise",
    price: 14.99,
    rating: 4.7,
    image: "/images/veggie-supreme-pizza.png",
    prepTime: "20-30",
    isPopular: true,
    description: "A delightful mix of fresh vegetables on a crispy crust",
  },
  {
    id: 102,
    name: "Pepperoni Feast",
    restaurant: "Pizza Palace",
    price: 16.99,
    rating: 4.8,
    image: "/images/pepperoni-feast.png",
    prepTime: "25-35",
    description: "Loaded with savory pepperoni slices",
  },
  {
    id: 103,
    name: "Margherita Classic",
    restaurant: "Italian Corner",
    price: 12.99,
    rating: 4.5,
    image: "/images/margherita-classic.png",
    prepTime: "15-25",
    description: "A simple yet delicious pizza with fresh basil, mozzarella, and tomato",
  },
  {
    id: 104,
    name: "Meat Lovers Pizza",
    restaurant: "Pizza Palace",
    price: 18.99,
    rating: 4.9,
    image: "/images/meat-lovers-pizza.png",
    prepTime: "25-35",
    isNew: true,
    description: "A carnivore's delight with a variety of meats",
  },
]

const burgerItems = [
  {
    id: 201,
    name: "Classic Cheeseburger",
    restaurant: "Burger Palace",
    price: 9.99,
    rating: 4.6,
    image: "/images/classic-cheeseburger.png",
    prepTime: "15-25",
    isPopular: true,
    description: "A juicy beef patty with cheese, lettuce, tomato, and onion",
  },
  {
    id: 202,
    name: "Double Bacon Burger",
    restaurant: "Burger Shack",
    price: 12.99,
    rating: 4.8,
    image: "/images/double-bacon-burger.png",
    prepTime: "20-30",
    description: "Two beef patties with crispy bacon and all the fixings",
  },
  {
    id: 203,
    name: "Veggie Burger",
    restaurant: "Green Eats",
    price: 8.99,
    rating: 4.3,
    image: "/images/veggie-burger.png",
    prepTime: "15-20",
    description: "A flavorful plant-based patty with fresh toppings",
  },
  {
    id: 204,
    name: "Spicy Jalapeño Burger",
    restaurant: "Burger Palace",
    price: 11.99,
    rating: 4.7,
    image: "/images/spicy-jalapeno-burger.png",
    prepTime: "15-25",
    isNew: true,
    description: "A burger with a kick, featuring jalapeños and spicy sauce",
  },
]

const sushiItems = [
  {
    id: 301,
    name: "Salmon Nigiri Set",
    restaurant: "Sushi Sensation",
    price: 16.99,
    rating: 4.8,
    image: "/images/salmon-nigiri-set.png",
    prepTime: "20-30",
    isPopular: true,
    description: "Fresh salmon slices on perfectly seasoned rice",
  },
  {
    id: 302,
    name: "Dragon Roll",
    restaurant: "Tokyo Treats",
    price: 14.99,
    rating: 4.7,
    image: "/images/dragon-roll.png",
    prepTime: "25-35",
    description: "Shrimp tempura roll topped with avocado and special sauce",
  },
  {
    id: 303,
    name: "California Roll Set",
    restaurant: "Sushi Sensation",
    price: 12.99,
    rating: 4.5,
    image: "/images/california-roll-set.png",
    prepTime: "15-25",
    description: "Classic rolls with crab, avocado, and cucumber",
  },
  {
    id: 304,
    name: "Spicy Tuna Roll",
    restaurant: "Ocean Flavors",
    price: 13.99,
    rating: 4.6,
    image: "/images/spicy-tuna-roll.png",
    prepTime: "20-30",
    isNew: true,
    description: "Flavorful tuna with spicy mayo and fresh ingredients",
  },
]

const pastaItems = [
  {
    id: 401,
    name: "Creamy Chicken Alfredo",
    restaurant: "Pasta Paradise",
    price: 15.99,
    rating: 4.7,
    image: "/images/creamy-chicken-pasta.png",
    prepTime: "20-30",
    isPopular: true,
    description: "Penne pasta with grilled chicken in a rich, creamy sauce with spinach",
  },
  {
    id: 402,
    name: "Spaghetti Bolognese",
    restaurant: "Italian Corner",
    price: 13.99,
    rating: 4.6,
    image: "/images/spaghetti-bolognese.png",
    prepTime: "20-30",
    description: "Classic Italian spaghetti with rich meat sauce and parmesan",
  },
  {
    id: 403,
    name: "Vegetable Primavera",
    restaurant: "Green Eats",
    price: 12.99,
    rating: 4.4,
    image: "/images/vegetable-primavera.png",
    prepTime: "15-25",
    description: "Pasta with fresh seasonal vegetables in a light garlic sauce",
  },
  {
    id: 404,
    name: "Seafood Linguine",
    restaurant: "Ocean Flavors",
    price: 18.99,
    rating: 4.8,
    image: "/images/seafood-linguine.png",
    prepTime: "25-35",
    isNew: true,
    description: "Linguine pasta with shrimp, mussels, and calamari in tomato sauce",
  },
]

const saladItems = [
  {
    id: 501,
    name: "Greek Salad",
    restaurant: "Green Eats",
    price: 10.99,
    rating: 4.5,
    image: "/images/greek-salad.png",
    prepTime: "10-15",
    isPopular: true,
    description: "Fresh greens with tomatoes, cucumbers, olives, and feta cheese",
  },
  {
    id: 502,
    name: "Caesar Salad",
    restaurant: "Healthy Bites",
    price: 9.99,
    rating: 4.4,
    image: "/images/caesar-salad.png",
    prepTime: "10-15",
    description: "Crisp romaine lettuce with croutons, parmesan, and Caesar dressing",
  },
  {
    id: 503,
    name: "Cobb Salad",
    restaurant: "Green Eats",
    price: 12.99,
    rating: 4.6,
    image: "/images/cobb-salad.png",
    prepTime: "15-20",
    description: "Mixed greens with chicken, bacon, egg, avocado, and blue cheese",
  },
  {
    id: 504,
    name: "Quinoa Veggie Bowl",
    restaurant: "Healthy Bites",
    price: 11.99,
    rating: 4.7,
    image: "/images/quinoa-veggie-bowl.png",
    prepTime: "15-20",
    isNew: true,
    description: "Protein-rich quinoa with avocado, beans, and fresh vegetables",
  },
]

const dessertItems = [
  {
    id: 601,
    name: "Tiramisu",
    restaurant: "Italian Corner",
    price: 7.99,
    rating: 4.8,
    image: "/images/tiramisu.png",
    prepTime: "5-10",
    isPopular: true,
    description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
  },
  {
    id: 602,
    name: "Chocolate Lava Cake",
    restaurant: "Sweet Treats",
    price: 8.99,
    rating: 4.9,
    image: "/images/chocolate-lava-cake.png",
    prepTime: "15-20",
    description: "Warm chocolate cake with a gooey molten chocolate center",
  },
  {
    id: 603,
    name: "Strawberry Cheesecake",
    restaurant: "Sweet Treats",
    price: 6.99,
    rating: 4.7,
    image: "/images/strawberry-cheesecake.png",
    prepTime: "5-10",
    description: "Creamy New York-style cheesecake topped with fresh strawberry sauce",
  },
  {
    id: 604,
    name: "Ice Cream Sundae",
    restaurant: "Dessert Palace",
    price: 5.99,
    rating: 4.6,
    image: "/images/ice-cream-sundae.png",
    prepTime: "5-10",
    isNew: true,
    description: "Delicious vanilla and chocolate ice cream with whipped cream and toppings",
  },
]

export default function Home() {
  const categories = [
    { name: "Pizza", image: "/images/pizza.png", href: "/category/pizza" },
    { name: "Burgers", image: "/images/burger.png", href: "/category/burgers" },
    { name: "Sushi", image: "/images/sushi.png", href: "/category/sushi" },
    { name: "Pasta", image: "/images/pasta.png", href: "/category/pasta" },
    { name: "Salads", image: "/images/salad.png", href: "/category/salads" },
    { name: "Desserts", image: "/images/dessert.png", href: "/category/desserts" },
  ]

  const offers = [
    {
      id: 1,
      title: "50% OFF",
      description: "On your first order",
      code: "WELCOME50",
      color: "bg-primary",
    },
    {
      id: 2,
      title: "FREE DELIVERY",
      description: "On orders above ₹500",
      code: "FREEDEL",
      color: "bg-accent",
    },
    {
      id: 3,
      title: "20% OFF",
      description: "On weekend orders",
      code: "WEEKEND20",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="fade-in">
      {/* Hero Section with New Food Image */}
      <section className="relative bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Logo />
                <Badge variant="outline" className="bg-accent text-white border-none">
                  AI Powered
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Delicious Food,
                <span className="text-primary block">Delivered Fast</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Order from your favorite restaurants and get food delivered to your doorstep in minutes.
              </p>
              <div className="w-full max-w-md">
                <SearchBar />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-md">
                  Order Now
                </Button>
                <Button size="lg" variant="outline" className="text-md">
                  View Restaurants
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="/images/hero-food-new.png"
                  alt="Delicious gourmet food platter with meat and sides"
                  fill
                  className="object-cover"
                  fallbackType="hero"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Fast Delivery</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">30 min average</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center space-x-2">
                  <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                    <Star className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Top Rated</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">4.8 average rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section with Prominent Logo */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold">Food Categories</h2>
              <div className="flex items-center mt-2">
                <div className="relative h-16 w-16 mr-3">
                  <Image
                    src="/images/logo.png"
                    alt="TastyTrail Logo"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Delicious food delivered fast</p>
              </div>
            </div>
            <Link href="/categories" className="text-primary flex items-center text-sm font-medium">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center hover:shadow-md transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800 block"
              >
                <div className="flex justify-center mb-3">
                  <div className="relative w-16 h-16 mx-auto">
                    <ImageWithFallback
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-contain"
                      fallbackType="food"
                    />
                  </div>
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Food Categories Sections */}
      <FoodCategorySection
        title="Pizza"
        description="Delicious pizzas from the best pizzerias in town"
        items={pizzaItems}
        viewAllHref="/category/pizza"
      />

      <FoodCategorySection
        title="Burgers"
        description="Juicy burgers for every taste"
        items={burgerItems}
        viewAllHref="/category/burgers"
      />

      <FoodCategorySection
        title="Sushi"
        description="Fresh and authentic sushi from top Japanese restaurants"
        items={sushiItems}
        viewAllHref="/category/sushi"
      />

      <FoodCategorySection
        title="Pasta"
        description="Authentic Italian pasta dishes made with love"
        items={pastaItems}
        viewAllHref="/category/pasta"
      />

      <FoodCategorySection
        title="Salads"
        description="Fresh and healthy salads for a light meal"
        items={saladItems}
        viewAllHref="/category/salads"
      />

      <FoodCategorySection
        title="Desserts"
        description="Sweet treats to satisfy your cravings"
        items={dessertItems}
        viewAllHref="/category/desserts"
      />

      {/* Offers & Promotions */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Offers & Promotions</h2>
            <Link href="/offers" className="text-primary flex items-center text-sm font-medium">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <Carousel className="w-full">
            <CarouselContent>
              {offers.map((offer) => (
                <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className={`${offer.color} rounded-xl overflow-hidden shadow-lg h-48 relative`}>
                    <div className="absolute inset-0 p-6 text-white flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{offer.title}</h3>
                        <p className="text-white/90">{offer.description}</p>
                      </div>
                      <div>
                        <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                          Use code: {offer.code}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-primary/5 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Download Our Mobile App</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get the TastyTrail app for faster ordering, exclusive deals, and real-time order tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex items-center space-x-2">
                  <Link href="/download">
                    <span className="text-xl">🍎</span>
                    <div className="text-left">
                      <p className="text-xs">Download on the</p>
                      <p className="text-sm font-medium">App Store</p>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex items-center space-x-2">
                  <Link href="/download">
                    <span className="text-xl">🤖</span>
                    <div className="text-left">
                      <p className="text-xs">Get it on</p>
                      <p className="text-sm font-medium">Google Play</p>
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full">
              <ImageWithFallback
                src="/images/app-mockup.png"
                alt="Mobile App"
                fill
                className="object-contain"
                fallbackType="hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}
