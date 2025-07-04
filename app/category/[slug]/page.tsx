 import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import ImageWithFallback from "@/components/image-with-fallback"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const slug = params.slug

  // Category data based on slug
  const categoryMap: Record<
    string,
    {
      title: string
      description: string
      image: string
      items: any[]
    }
  > = {
    pizza: {
      title: "Pizza",
      description: "Delicious pizzas from the best pizzerias in town",
      image: "/images/pizza.png",
      items: [
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
        {
          id: 105,
          name: "BBQ Chicken Pizza",
          restaurant: "Pizza Paradise",
          price: 17.99,
          rating: 4.6,
          image: "/images/pizza.png",
          prepTime: "20-30",
        },
        {
          id: 106,
          name: "Hawaiian Pizza",
          restaurant: "Pizza Palace",
          price: 15.99,
          rating: 4.4,
          image: "/images/pizza.png",
          prepTime: "20-30",
        },
        {
          id: 107,
          name: "Mushroom Truffle Pizza",
          restaurant: "Italian Corner",
          price: 19.99,
          rating: 4.8,
          image: "/images/pizza.png",
          prepTime: "25-35",
        },
        {
          id: 108,
          name: "Spinach & Feta Pizza",
          restaurant: "Green Eats",
          price: 16.99,
          rating: 4.5,
          image: "/images/pizza.png",
          prepTime: "20-30",
        },
      ],
    },
    burgers: {
      title: "Burgers",
      description: "Juicy burgers for every taste",
      image: "/images/burger.png",
      items: [
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
        {
          id: 205,
          name: "Mushroom Swiss Burger",
          restaurant: "Burger Shack",
          price: 10.99,
          rating: 4.5,
          image: "/images/burger.png",
          prepTime: "15-25",
        },
        {
          id: 206,
          name: "BBQ Burger",
          restaurant: "Burger Palace",
          price: 11.99,
          rating: 4.7,
          image: "/images/burger.png",
          prepTime: "15-25",
        },
        {
          id: 207,
          name: "Avocado Turkey Burger",
          restaurant: "Healthy Bites",
          price: 12.99,
          rating: 4.4,
          image: "/images/burger.png",
          prepTime: "20-30",
        },
        {
          id: 208,
          name: "Ultimate Steak Burger",
          restaurant: "Burger Shack",
          price: 14.99,
          rating: 4.9,
          image: "/images/burger.png",
          prepTime: "20-30",
        },
      ],
    },
    sushi: {
      title: "Sushi",
      description: "Fresh and authentic sushi from top Japanese restaurants",
      image: "/images/sushi.png",
      items: [
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
        {
          id: 305,
          name: "Rainbow Roll",
          restaurant: "Tokyo Treats",
          price: 15.99,
          rating: 4.7,
          image: "/images/sushi.png",
          prepTime: "25-30",
        },
        {
          id: 306,
          name: "Tempura Roll",
          restaurant: "Sushi Sensation",
          price: 14.99,
          rating: 4.6,
          image: "/images/sushi.png",
          prepTime: "20-30",
        },
        {
          id: 307,
          name: "Tuna Sashimi",
          restaurant: "Ocean Flavors",
          price: 18.99,
          rating: 4.9,
          image: "/images/sushi.png",
          prepTime: "15-25",
        },
        {
          id: 308,
          name: "Vegetable Roll",
          restaurant: "Green Eats",
          price: 11.99,
          rating: 4.3,
          image: "/images/sushi.png",
          prepTime: "15-25",
        },
      ],
    },
    pasta: {
      title: "Pasta",
      description: "Authentic Italian pasta dishes made with love",
      image: "/images/pasta.png",
      items: [
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
        {
          id: 405,
          name: "Fettuccine Carbonara",
          restaurant: "Italian Corner",
          price: 14.99,
          rating: 4.7,
          image: "/images/pasta.png",
          prepTime: "20-30",
        },
        {
          id: 406,
          name: "Lasagna",
          restaurant: "Pasta Paradise",
          price: 16.99,
          rating: 4.8,
          image: "/images/pasta.png",
          prepTime: "25-35",
        },
        {
          id: 407,
          name: "Pesto Gnocchi",
          restaurant: "Italian Corner",
          price: 13.99,
          rating: 4.5,
          image: "/images/pasta.png",
          prepTime: "20-30",
        },
        {
          id: 408,
          name: "Mushroom Ravioli",
          restaurant: "Pasta Paradise",
          price: 15.99,
          rating: 4.6,
          image: "/images/pasta.png",
          prepTime: "25-35",
        },
      ],
    },
    salads: {
      title: "Salads",
      description: "Fresh and healthy salads for a light meal",
      image: "/images/salad.png",
      items: [
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
        {
          id: 505,
          name: "Mediterranean Salad",
          restaurant: "Green Eats",
          price: 11.99,
          rating: 4.5,
          image: "/images/salad.png",
          prepTime: "10-15",
        },
        {
          id: 506,
          name: "Asian Chicken Salad",
          restaurant: "Healthy Bites",
          price: 12.99,
          rating: 4.6,
          image: "/images/salad.png",
          prepTime: "15-20",
        },
        {
          id: 507,
          name: "Kale & Avocado Salad",
          restaurant: "Green Eats",
          price: 10.99,
          rating: 4.4,
          image: "/images/salad.png",
          prepTime: "10-15",
        },
        {
          id: 508,
          name: "Tuna Nicoise Salad",
          restaurant: "Ocean Flavors",
          price: 13.99,
          rating: 4.7,
          image: "/images/salad.png",
          prepTime: "15-20",
        },
      ],
    },
    desserts: {
      title: "Desserts",
      description: "Sweet treats to satisfy your cravings",
      image: "/images/dessert.png",
      items: [
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
        {
          id: 605,
          name: "Apple Pie",
          restaurant: "Sweet Treats",
          price: 6.99,
          rating: 4.7,
          image: "/images/dessert.png",
          prepTime: "10-15",
        },
        {
          id: 606,
          name: "Chocolate Mousse",
          restaurant: "Dessert Palace",
          price: 7.99,
          rating: 4.8,
          image: "/images/dessert.png",
          prepTime: "5-10",
        },
        {
          id: 607,
          name: "Red Velvet Cupcake",
          restaurant: "Sweet Treats",
          price: 4.99,
          rating: 4.6,
          image: "/images/dessert.png",
          prepTime: "5-10",
        },
        {
          id: 608,
          name: "Crème Brûlée",
          restaurant: "French Delights",
          price: 8.99,
          rating: 4.9,
          image: "/images/dessert.png",
          prepTime: "15-20",
        },
      ],
    },
  }

  const category = categoryMap[slug]

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{category.description}</p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`Search for ${category.title.toLowerCase()}...`} className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
          Most Popular
        </Badge>
        <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
          Highest Rated
        </Badge>
        <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
          Fastest Delivery
        </Badge>
        <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
          Best Value
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.items.map((item) => (
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
                  <span className="text-xs font-medium">{item.rating} ★</span>
                </div>
                {item.isNew && <Badge className="absolute top-2 left-2 bg-accent text-white">New</Badge>}
                {item.isPopular && <Badge className="absolute top-2 left-2 bg-orange-500 text-white">Popular</Badge>}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.restaurant}</p>
                {item.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>{item.prepTime} min</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-primary">₹{(item.price * 83).toFixed(0)}</span>
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
  )
}
