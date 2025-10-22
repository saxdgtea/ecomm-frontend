"use client";

import { useEffect, useState } from "react";
import { productsAPI, categoriesAPI, ordersAPI } from "@/lib/api";
import { Package, Folder, ShoppingCart, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes, ordersRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
        ordersAPI.getAll(),
      ]);

      const totalRevenue = ordersRes.data.reduce(
        (sum, order) => sum + order.total,
        0
      );

      setStats({
        totalProducts: productsRes.count,
        totalCategories: categoriesRes.count,
        totalOrders: ordersRes.count,
        totalRevenue,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Categories",
      value: stats.totalCategories,
      icon: Folder,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${stat.color} p-4 rounded-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/admin/products/new"
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="text-center">
              <Package className="h-12 w-12 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg text-gray-900">
                Add New Product
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Create a new product listing
              </p>
            </div>
          </a>

          <a
            href="/admin/categories"
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="text-center">
              <Folder className="h-12 w-12 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg text-gray-900">
                Manage Categories
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Add or edit product categories
              </p>
            </div>
          </a>

          <a
            href="/admin/orders"
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="text-center">
              <ShoppingCart className="h-12 w-12 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg text-gray-900">
                View Orders
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Manage customer orders
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
