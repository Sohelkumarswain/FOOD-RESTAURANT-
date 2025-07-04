"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, Phone, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import OrderTracker from "@/components/order-tracker"

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl fade-in">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ChevronLeft className="h-4 w-4 mr-2" /> Back
      </Button>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Track Your Order</h1>

        <OrderTracker orderId={params.id} />

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-medium text-lg">Order Details</h3>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Vegetable Samosa (2)</span>
                <span>$11.98</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Butter Chicken (1)</span>
                <span>$14.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Garlic Naan (2)</span>
                <span>$7.98</span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>$34.95</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span>$3.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tip</span>
                <span>$2.00</span>
              </div>
            </div>

            <div className="border-t border-b py-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$43.44</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=100&width=100" alt="Driver" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Michael is your delivery driver</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">5-star rated driver</p>
              </div>
              <div className="flex space-x-2">
                <Button size="icon" variant="outline">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button className="flex-1" variant="outline" asChild>
            <Link href="/help">Need Help?</Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
