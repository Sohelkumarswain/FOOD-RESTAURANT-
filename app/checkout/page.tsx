"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, CreditCard, Wallet, Clock, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [addressType, setAddressType] = useState("home")

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    instructions: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      // Clear cart
      localStorage.setItem("cart", "[]")

      toast({
        title: "Order placed successfully!",
        description: "Your food is being prepared and will be delivered soon.",
      })
      router.push("/order-confirmation")
    }, 2000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/cart">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="md:col-span-2 space-y-6" variants={container} initial="hidden" animate="show">
            {/* Delivery Address */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St, Apt 4B"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address Type</Label>
                    <RadioGroup value={addressType} onValueChange={setAddressType} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="home" id="home" />
                        <Label htmlFor="home">Home</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="work" id="work" />
                        <Label htmlFor="work">Work</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      name="instructions"
                      placeholder="E.g., Ring the doorbell, leave at the door, etc."
                      value={formData.instructions}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Delivery Options */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Delivery Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-4">
                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <div>
                          <Label htmlFor="standard" className="font-medium">
                            Standard Delivery
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Estimated delivery in 30-45 minutes
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">$2.99</span>
                    </div>
                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <div>
                          <Label htmlFor="express" className="font-medium">
                            Express Delivery
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Estimated delivery in 15-25 minutes
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">$5.99</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="cash">Cash on Delivery</TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="cash">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
                        <Wallet className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Pay with cash when your order arrives
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <span>${deliveryOption === "standard" ? "2.99" : "5.99"}</span>
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

                <div className="border-t border-b py-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${deliveryOption === "standard" ? "43.44" : "46.44"}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" type="submit" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </form>
    </div>
  )
}
