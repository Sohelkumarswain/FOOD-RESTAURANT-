"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, Clock, ChefHat, Bike, Home } from "lucide-react"
import Image from "next/image"

interface OrderStatus {
  step: number
  status: "confirmed" | "preparing" | "on_the_way" | "delivered"
  timeRemaining: number // minutes
}

export default function OrderTracker({ orderId }: { orderId: string }) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    step: 1,
    status: "confirmed",
    timeRemaining: 35,
  })

  useEffect(() => {
    // Simulate order progress
    const timer = setInterval(() => {
      setOrderStatus((prev) => {
        // Decrease time remaining
        const newTimeRemaining = Math.max(0, prev.timeRemaining - 0.5)

        // Update status based on time remaining
        let newStatus = prev.status
        let newStep = prev.step

        if (prev.timeRemaining > 25 && newTimeRemaining <= 25) {
          newStatus = "preparing"
          newStep = 2
        } else if (prev.timeRemaining > 10 && newTimeRemaining <= 10) {
          newStatus = "on_the_way"
          newStep = 3
        } else if (prev.timeRemaining > 0 && newTimeRemaining === 0) {
          newStatus = "delivered"
          newStep = 4
          clearInterval(timer)
        }

        return {
          ...prev,
          status: newStatus as OrderStatus["status"],
          step: newStep,
          timeRemaining: newTimeRemaining,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes)
    const secs = Math.floor((minutes - mins) * 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const getStatusText = () => {
    switch (orderStatus.status) {
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

  const getProgressPercentage = () => {
    const total = 35 // total estimated time
    const elapsed = total - orderStatus.timeRemaining
    return Math.min(100, (elapsed / total) * 100)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Order #{orderId}</h3>
          {orderStatus.timeRemaining > 0 && (
            <div className="text-sm font-medium">
              Estimated delivery in {formatTime(orderStatus.timeRemaining)} minutes
            </div>
          )}
        </div>

        <Progress value={getProgressPercentage()} className="h-2 mb-6" />

        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${orderStatus.step >= 1 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
            >
              {orderStatus.step > 1 ? <Check className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
            </div>
            <span className="text-xs font-medium">Confirmed</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${orderStatus.step >= 2 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
            >
              {orderStatus.step > 2 ? <Check className="h-5 w-5" /> : <ChefHat className="h-5 w-5" />}
            </div>
            <span className="text-xs font-medium">Preparing</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${orderStatus.step >= 3 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
            >
              {orderStatus.step > 3 ? <Check className="h-5 w-5" /> : <Bike className="h-5 w-5" />}
            </div>
            <span className="text-xs font-medium">On the way</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${orderStatus.step >= 4 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
            >
              {orderStatus.step > 4 ? <Check className="h-5 w-5" /> : <Home className="h-5 w-5" />}
            </div>
            <span className="text-xs font-medium">Delivered</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center space-x-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image src="/placeholder.svg?height=100&width=100" alt="Driver" fill className="object-cover" />
            </div>
            <div>
              <p className="font-medium">
                {orderStatus.status === "on_the_way" ? "Michael is delivering your order" : getStatusText()}
              </p>
              {orderStatus.status === "on_the_way" && (
                <p className="text-sm text-gray-500">
                  Your food is on the way! Arriving in approximately {formatTime(orderStatus.timeRemaining)} minutes.
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
