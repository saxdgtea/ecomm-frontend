"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { productsAPI } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await productsAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      alert(error.message || "Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="card">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="relative w-16 h-16">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="font-medium">{product.name}</td>
                  <td>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {product.category?.name || "N/A"}
                    </span>
                  </td>
                  <td className="font-semibold text-primary-600">
                    {formatPrice(product.price)}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/products/${product._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No products found</p>
          <Link href="/admin/products/new" className="btn btn-primary">
            Add Your First Product
          </Link>
        </div>
      )}
    </div>
  );
}
