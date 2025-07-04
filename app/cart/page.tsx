"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus, Trash2, ChevronLeft, Tag, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  restaurant: string
}

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [deliveryFee, setDeliveryFee] = useState(2.99)
  const [tip, setTip] = useState(2)

  // Load cart from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart")
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart)
        setCartItems(parsedCart)
      }
    } catch (error) {
      console.error("Error loading cart:", error)
      setCartItems([])
    }
  }, [])

  const updateQuantity = (id: number, change: number) => {
    try {
      const updatedItems = cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      })

      setCartItems(updatedItems)
      localStorage.setItem("cart", JSON.stringify(updatedItems))
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const removeItem = (id: number) => {
    try {
      const updatedItems = cartItems.filter((item) => item.id !== id)
      setCartItems(updatedItems)
      localStorage.setItem("cart", JSON.stringify(updatedItems))

      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      })
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const applyPromoCode = () => {
    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toUpperCase() === "WELCOME50") {
        const subtotal = calculateSubtotal()
        setDiscount(subtotal * 0.5) // 50% off
        toast({
          title: "Promo code applied",
          description: "You got 50% off on your order!",
        })
      } else if (promoCode.toUpperCase() === "FREEDEL") {
        setDeliveryFee(0)
        toast({
          title: "Promo code applied",
          description: "Free delivery applied to your order!",
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "Please enter a valid promo code",
          variant: "destructive",
        })
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal + deliveryFee + tip - discount
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  const tipOptions = [0, 2, 3, 5]

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md text-center fade-in">
        <div className="mb-6">
          <div className="mx-auto h-32 w-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/restaurants">Browse Restaurants</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/restaurants">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Items ({cartItems.length})</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  From {cartItems[0]?.restaurant}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-2 border-b last:border-0">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=100&width=100"
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Promo Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={applyPromoCode} disabled={!promoCode || isApplyingPromo}>
                  {isApplyingPromo ? "Applying..." : "Apply"}
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Try "WELCOME50" for 50% off or "FREEDEL" for free delivery
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4">
                <Label className="mb-2 block">Add a tip</Label>
                <div className="grid grid-cols-4 gap-2">
                  {tipOptions.map((option) => (
                    <Button
                      key={option}
                      variant={tip === option ? "default" : "outline"}
                      className="h-10"
                      onClick={() => setTip(option)}
                    >
                      {option === 0 ? "No Tip" : `$${option}`}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t border-b py-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
