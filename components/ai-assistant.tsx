"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, X } from "lucide-react"

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ type: "user" | "bot"; content: string }[]>([
    { type: "bot", content: "👋 Hi there! I'm TastyTrail's AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { type: "user", content: input }])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      if (input.toLowerCase().includes("recommendation") || input.toLowerCase().includes("suggest")) {
        response =
          "I'd recommend trying our new Truffle Mushroom Pizza or the Spicy Tuna Roll if you like sushi! Both are highly rated by our customers."
      } else if (input.toLowerCase().includes("delivery") || input.toLowerCase().includes("time")) {
        response =
          "Our average delivery time is 30-45 minutes depending on your location and the restaurant's busyness."
      } else if (input.toLowerCase().includes("payment") || input.toLowerCase().includes("pay")) {
        response =
          "We accept credit cards, PayPal, and cash on delivery. All payment information is securely processed."
      } else {
        response =
          "Thank you for your message! If you have questions about our menu, delivery times, or need recommendations, I'm here to help."
      }
      setMessages((prev) => [...prev, { type: "bot", content: response }])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg z-50"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 sm:w-96 shadow-xl z-50">
      <div className="bg-primary text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="h-6 w-6 mr-2" />
          <span className="font-medium">TastyTrail Assistant</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-white hover:bg-primary/80"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-0">
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.type === "user" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-3 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-0 focus:ring-0 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button size="sm" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
