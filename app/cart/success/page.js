"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, MessageCircle, Home, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Sent Successfully!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your order has been sent via WhatsApp
          </p>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="h-6 w-6 text-green-600 mr-2" />
              What happens next?
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                  1
                </span>
                <span>
                  Check your WhatsApp - your order details have been sent
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                  2
                </span>
                <span>
                  Our team will confirm your order and provide payment details
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                  3
                </span>
                <span>
                  Once payment is received, we will process and ship your order
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                  4
                </span>
                <span>You will receive tracking information via WhatsApp</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn btn-primary flex items-center justify-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/products"
              className="btn btn-secondary flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? Contact us via WhatsApp or email at{" "}
              <a
                href="mailto:support@shophub.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                support@shophub.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
