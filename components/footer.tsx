import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">
              Tasty<span className="text-accent">Trail</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Delivering delicious food from your favorite restaurants right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  Offers & Discounts
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  Download App
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Customer Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Download Our App</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get the TastyTrail app for faster ordering and exclusive deals.
            </p>
            <div className="space-y-2">
              <Link href="#" className="block">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 flex items-center space-x-3 hover:border-primary">
                  <span className="text-xl">🍎</span>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Download on the</p>
                    <p className="text-sm font-medium">App Store</p>
                  </div>
                </div>
              </Link>
              <Link href="#" className="block">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 flex items-center space-x-3 hover:border-primary">
                  <span className="text-xl">🤖</span>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Get it on</p>
                    <p className="text-sm font-medium">Google Play</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} TastyTrail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
