import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Star, ChevronRight, Apple, Smartphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DownloadPage() {
  const appFeatures = [
    {
      title: "Real-time Order Tracking",
      description: "Track your food delivery in real-time from restaurant to your doorstep",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Exclusive App Offers",
      description: "Get special discounts and promotions available only on our mobile app",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Faster Checkout",
      description: "Save your delivery addresses and payment methods for quick ordering",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Personalized Recommendations",
      description: "Discover new restaurants and dishes based on your preferences",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
  ]

  const testimonials = [
    {
      name: "Priya S.",
      rating: 5,
      comment: "The app makes ordering food so convenient! I love the real-time tracking feature.",
    },
    {
      name: "Rahul M.",
      rating: 5,
      comment: "Great selection of restaurants and the exclusive app discounts are amazing!",
    },
    {
      name: "Ananya K.",
      rating: 4,
      comment: "The interface is intuitive and the delivery is always on time. Highly recommend!",
    },
  ]

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-700 dark:to-amber-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Get the TastyTrail App</h1>
              <p className="text-lg text-gray-800 dark:text-gray-200">
                Order delicious food, track your delivery in real-time, and enjoy exclusive app-only offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  <div className="text-left">
                    <p className="text-xs">Download on the</p>
                    <p className="text-sm font-medium">App Store</p>
                  </div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-gray-900 border-gray-900 flex items-center gap-2"
                >
                  <Smartphone className="h-5 w-5" />
                  <div className="text-left">
                    <p className="text-xs">Get it on</p>
                    <p className="text-sm font-medium">Google Play</p>
                  </div>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-sm text-gray-800 dark:text-gray-200">4.8 stars (10,000+ reviews)</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/images/app-download-illustration.png"
                  alt="TastyTrail Food Delivery App"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Download Our App?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The TastyTrail app offers a seamless food ordering experience with features designed to make your life
              easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {appFeatures.map((feature, index) => (
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

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Getting started with the TastyTrail app is quick and easy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Download the App</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get the TastyTrail app from the App Store or Google Play Store.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up with your email or continue with Google or Facebook.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Ordering</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse restaurants, select your favorite dishes, and place your order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who use the TastyTrail app for their food delivery needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.comment}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offers & Promotions Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-4">Exclusive App Offers</h2>
              <p className="max-w-md">
                Download the TastyTrail app now and enjoy special discounts and promotions available only to app users.
                Get 50% off your first order and free delivery on orders above ₹500!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  <div className="text-left">
                    <p className="text-xs">Download on the</p>
                    <p className="text-sm font-medium">App Store</p>
                  </div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white flex items-center gap-2 hover:bg-white/10"
                >
                  <Smartphone className="h-5 w-5" />
                  <div className="text-left">
                    <p className="text-xs">Get it on</p>
                    <p className="text-sm font-medium">Google Play</p>
                  </div>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/app-offers-illustration.png"
                alt="TastyTrail Food Delivery App Offers"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about the TastyTrail app? Find answers to common questions below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Is the TastyTrail app free to download?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, the TastyTrail app is completely free to download and use on both iOS and Android devices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">How do I track my order?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Once your order is confirmed, you can track it in real-time through the app. You'll receive
                  notifications at each stage of the delivery process.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Are there any exclusive app-only offers?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we regularly offer exclusive discounts and promotions only available to app users. Make sure to
                  enable notifications to stay updated on the latest offers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">How do I contact customer support?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You can contact our customer support team directly through the app. Go to your profile, select "Help &
                  Support," and choose your preferred contact method.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="text-primary flex items-center justify-center">
              Back to Home <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
