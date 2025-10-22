"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categoriesAPI } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function CategoryProductsPage() {
  const params = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCategory();
    }
  }, [params.id]);

  const fetchCategory = async () => {
    try {
      const response = await categoriesAPI.getById(params.id);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Category Not Found
            </h2>
            <Link href="/categories" className="btn btn-primary">
              Back to Categories
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/categories"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {category.name}
            </h1>
            <p className="text-gray-600">{category.description}</p>
          </div>

          {/* Products Grid */}
          {category.products && category.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products in this category yet
              </p>
              <Link href="/products" className="btn btn-primary mt-4">
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
