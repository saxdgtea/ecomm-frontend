"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { addToCart } from "@/lib/cart";
import { ShoppingCart, Package, Check } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const inStock = product.stock > 0;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail

    if (!inStock) return;

    addToCart(product, 1);
    setAdded(true);

    // Trigger cart update event
    window.dispatchEvent(new Event("cartUpdated"));

    // Reset after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/products/${product._id}`}>
      <div className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        {/* Product Image */}
        <div className="relative h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>

            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Package className="h-4 w-4" />
              <span>{product.stock} left</span>
            </div>
          </div>

          {/* Category Badge */}
          {product.category && (
            <div className="pt-2">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {product.category.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
