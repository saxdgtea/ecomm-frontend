import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">ShopHub</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted online shopping destination for quality products at
              great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
