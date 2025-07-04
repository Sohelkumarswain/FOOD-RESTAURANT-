"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchResult {
  id: number
  name: string
  type: "restaurant" | "food"
  category?: string
  url: string
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Mock search function - in a real app, this would call an API
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true)
      // Simulate API call delay
      const timer = setTimeout(() => {
        const mockResults: SearchResult[] = [
          { id: 1, name: "Margherita Pizza", type: "food", category: "Pizza", url: "/category/pizza" },
          { id: 2, name: "Cheeseburger", type: "food", category: "Burgers", url: "/category/burgers" },
          { id: 3, name: "California Roll", type: "food", category: "Sushi", url: "/category/sushi" },
          { id: 4, name: "Pasta Paradise", type: "restaurant", url: "/restaurants/3" },
          { id: 5, name: "Burger Palace", type: "restaurant", url: "/restaurants/2" },
        ].filter((item) => item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))

        setResults(mockResults)
        setIsSearching(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [debouncedSearchTerm])

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for food or restaurants..."
          className="pl-10 pr-4 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {(results.length > 0 || isSearching) && (
        <Card className="absolute mt-1 w-full z-50 max-h-80 overflow-auto">
          <div className="p-2">
            {isSearching ? (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">Searching...</div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={result.url}
                    className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setSearchTerm("")}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{result.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                        {result.type === "food" ? result.category : "Restaurant"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">No results found</div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
