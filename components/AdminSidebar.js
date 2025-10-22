"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Folder,
  ShoppingCart,
  LogOut,
  Home,
} from "lucide-react";
import { removeToken, removeUser } from "@/lib/api";

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    removeToken();
    removeUser();
    window.location.href = "/";
  };

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/categories", icon: Folder, label: "Categories" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-grow py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.href
              : isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-primary-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Actions */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Back to Store</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
