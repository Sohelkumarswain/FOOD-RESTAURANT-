"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Clock, MapPin, ChevronRight, Copy, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function OrderConfirmationPage() {
  const { toast } = useToast()
  const [orderStatus, setOrderStatus] = useState("confirmed")
  const [timeRemaining, setTimeRemaining] = useState(35)

  // Mock order data
  const order = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    restaurant: "Spice Garden",
    items: [
      { name: "Vegetable Samosa", quantity: 2, price: 5.99 },
      { name: "Butter Chicken", quantity: 1, price: 14.99 },
      { name: "Garlic Naan", quantity: 2, price: 3.99 },
    ],
    total: 43.44,
    address: "123 Main St, Apt 4B, New York, NY 10001",
    deliveryTime: "30-45 minutes",
  }

  useEffect(() => {
    // Simulate order progress
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const statusTimer = setTimeout(() => {
      setOrderStatus("preparing")

      setTimeout(() => {
        setOrderStatus("on_the_way")

        setTimeout(() => {
          setOrderStatus("delivered")
        }, 15000)
      }, 10000)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(statusTimer)
    }
  }, [])

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id)
    toast({
      title: "Order ID copied",
      description: "Order ID has been copied to clipboard",
    })
  }

  const getStatusText = () => {
    switch (orderStatus) {
      case "confirmed":
        return "Order Confirmed"
      case "preparing":
        return "Preparing Your Food"
      case "on_the_way":
        return "On The Way"
      case "delivered":
        return "Delivered"
      default:
        return "Order Placed"
    }
  }

  const getStatusDescription = () => {
    switch (orderStatus) {
      case "confirmed":
        return "Your order has been received and confirmed"
      case "preparing":
        return "The restaurant is preparing your delicious food"
      case "on_the_way":
        return "Your food is on the way to your location"
      case "delivered":
        return "Your food has been delivered. Enjoy your meal!"
      default:
        return "Your order has been placed successfully"
    }
  }

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes)
    const secs = Math.floor((minutes - mins) * 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl fade-in">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <motion.div
            className="mx-auto h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your order. We'll have your delicious food to you soon!
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order #{order.id.slice(-6)}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">From {order.restaurant}</p>
              </div>
              <Button variant="outline" size="sm" onClick={copyOrderId}>
                <Copy className="h-4 w-4 mr-2" />
                Copy ID
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2">
                <motion.div
                  className={`h-4 w-4 rounded-full ${
                    orderStatus !== "confirmed" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <div
                  className={`h-1 flex-1 ${
                    orderStatus !== "confirmed" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                ></div>
                <motion.div
                  className={`h-4 w-4 rounded-full ${
                    orderStatus === "preparing" || orderStatus === "on_the_way" || orderStatus === "delivered"
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                ></motion.div>
                <div
                  className={`h-1 flex-1 ${
                    orderStatus === "preparing" || orderStatus === "on_the_way" || orderStatus === "delivered"
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                ></div>
                <motion.div
                  className={`h-4 w-4 rounded-full ${
                    orderStatus === "on_the_way" || orderStatus === "delivered"
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                ></motion.div>
                <div
                  className={`h-1 flex-1 ${
                    orderStatus === "on_the_way" || orderStatus === "delivered"
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                ></div>
                <motion.div
                  className={`h-4 w-4 rounded-full ${
                    orderStatus === "delivered" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                ></motion.div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      orderStatus === "delivered"
                        ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {orderStatus === "delivered" ? <Check className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{getStatusText()}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{getStatusDescription()}</p>
                    {orderStatus !== "delivered" && (
                      <p className="text-sm font-medium mt-1">
                        Estimated delivery in {formatTime(timeRemaining)} minutes
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-b py-4 space-y-2">
              <h3 className="font-medium mb-2">Order Details</h3>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-medium pt-2">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-2">Delivery Address</h3>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{order.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {orderStatus === "delivered" ? (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">How was your food?</h3>
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button key={rating} variant="outline" size="icon" className="h-10 w-10">
                    <Star className={`h-5 w-5 ${rating <= 3 ? "" : "fill-yellow-500 text-yellow-500"}`} />
                  </Button>
                ))}
              </div>
              <Button className="w-full">Submit Rating</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col space-y-4">
            <Button asChild variant="outline">
              <Link href={`/order-tracking/${order.id}`} className="flex justify-between items-center">
                <span>Track Order</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/support" className="flex justify-between items-center">
                <span>Need Help?</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
