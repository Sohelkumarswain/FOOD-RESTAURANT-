"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ImageWithFallback from "@/components/image-with-fallback"

export default function OffersPage() {
  const offers = [
    {
      id: 1,
      title: "50% OFF",
      description: "On your first order",
      code: "WELCOME50",
      image: "/images/food1.png",
      color: "bg-primary",
      validUntil: "May 31, 2023",
      terms: "Valid on orders above $20. Maximum discount $10.",
    },
    {
      id: 2,
      title: "FREE DELIVERY",
      description: "On orders above $25",
      code: "FREEDEL",
      image: "/images/food2.png",
      color: "bg-accent",
      validUntil: "June 15, 2023",
      terms: "Valid on all restaurants within 5 miles.",
    },
    {
      id: 3,
      title: "20% OFF",
      description: "On weekend orders",
      code: "WEEKEND20",
      image: "/images/food3.png",
      color: "bg-purple-500",
      validUntil: "Ongoing",
      terms: "Valid on Saturday and Sunday. Maximum discount $15.",
    },
    {
      id: 4,
      title: "BUY 1 GET 1",
      description: "On selected items",
      code: "B1G1FREE",
      image: "/images/food4.png",
      color: "bg-orange-500",
      validUntil: "June 30, 2023",
      terms: "Valid on selected items only. Second item must be of equal or lesser value.",
    },
    {
      id: 5,
      title: "30% OFF",
      description: "On orders above $50",
      code: "SAVE30",
      image: "/images/food1.png",
      color: "bg-blue-500",
      validUntil: "July 15, 2023",
      terms: "Valid on orders above $50. Maximum discount $20.",
    },
    {
      id: 6,
      title: "$10 OFF",
      description: "For new users",
      code: "NEWUSER10",
      image: "/images/food2.png",
      color: "bg-green-500",
      validUntil: "Ongoing",
      terms: "Valid for first-time users only.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold mb-2">Offers & Promotions</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Exclusive deals and discounts to save on your favorite food
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  )
}

function OfferCard({ offer }: { offer: any }) {
  const { toast } = useToast()

  const copyCode = () => {
    navigator.clipboard.writeText(offer.code)
    toast({
      title: "Promo code copied",
      description: `${offer.code} has been copied to clipboard`,
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className={`${offer.color} h-40 relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            <ImageWithFallback
              src={offer.image || "/placeholder.svg"}
              alt={offer.title}
              fill
              className="object-cover opacity-40"
              fallbackType="food"
            />
          </div>
        </div>
        <div className="absolute inset-0 p-6 text-white">
          <h2 className="text-3xl font-bold">{offer.title}</h2>
          <p className="text-white/90">{offer.description}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Use code:</p>
            <p className="text-lg font-semibold">{offer.code}</p>
          </div>
          <Button size="sm" variant="outline" onClick={copyCode}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Valid until:</span> {offer.validUntil}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{offer.terms}</p>
        </div>
      </CardContent>
    </Card>
  )
}
