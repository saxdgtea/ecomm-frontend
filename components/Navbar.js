"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { getUser, removeToken, removeUser } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
    window.location.href = "/";
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-lg font-medium transition-colors ${
                isActive("/")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-lg font-medium transition-colors ${
                isActive("/products")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={`text-lg font-medium transition-colors ${
                isActive("/categories")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Categories
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
              </>
            ) : (
              <Link href="/login" className="btn btn-primary text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
