import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"

export default function AboutPage() {
  const features = [
    {
      title: "Wide Restaurant Selection",
      description: "Choose from thousands of restaurants offering diverse cuisines",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Fast Delivery",
      description: "Get your food delivered quickly with our efficient delivery network",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Real-time Tracking",
      description: "Track your order in real-time from restaurant to your doorstep",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Exclusive Offers",
      description: "Enjoy special discounts and promotions available only on TastyTrail",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Secure Payments",
      description: "Multiple secure payment options for hassle-free transactions",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "24/7 Customer Support",
      description: "Our dedicated support team is always ready to assist you",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Priya Patel",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Wilson",
      role: "Marketing Director",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">About TastyTrail</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We're on a mission to make food delivery convenient, reliable, and delightful for everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Founded in 2023, TastyTrail connects food lovers with the best restaurants in their city. We believe
                that good food should be accessible to all, and we're working hard to make that a reality.
              </p>
              <Button size="lg" asChild>
                <Link href="/restaurants">Explore Restaurants</Link>
              </Button>
            </div>
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="/images/hero-food.png"
                alt="About TastyTrail"
                fill
                className="object-cover"
                fallbackType="hero"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose TastyTrail</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best food delivery experience with features designed to make your life
              easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">500+</p>
              <p className="text-gray-600 dark:text-gray-300">Restaurants</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">50,000+</p>
              <p className="text-gray-600 dark:text-gray-300">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">100,000+</p>
              <p className="text-gray-600 dark:text-gray-300">Orders Delivered</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">20+</p>
              <p className="text-gray-600 dark:text-gray-300">Cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate individuals behind TastyTrail who are dedicated to bringing you the best food delivery
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                  <ImageWithFallback
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    fallbackType="restaurant"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order Delicious Food?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who use TastyTrail to get their favorite food delivered to their
            doorstep.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/restaurants">Order Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
