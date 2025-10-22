"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { productsAPI, categoriesAPI } from "@/lib/api";
import { ArrowLeft, Upload } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stock", formData.stock);

      if (image) {
        formDataToSend.append("image", image);
      }

      await productsAPI.create(formDataToSend);
      alert("Product created successfully!");
      router.push("/admin/products");
    } catch (err) {
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <Link
        href="/admin/products"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">Create a new product listing</p>
      </div>

      {/* Form */}
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="card space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input"
              placeholder="Enter product description"
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price ($) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={handleChange}
                className="input"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock Quantity *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={handleChange}
                className="input"
                placeholder="0"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-sm text-gray-700">Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
            <Link href="/admin/products" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
