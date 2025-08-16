"use client";

import { Search, Heart, ShoppingCart, User, Bell } from "lucide-react";

import { useAppSelector, useAppDispatch } from "../../../store/hook";
import { toggleCart } from "../../../store/slices/cartSlice";
import { RootState } from "../../../store";
import Link from "next/link";
import { useState } from "react";
import NotificationSidebar, {
  NotificationBell,
} from "../../../(routes)/notification/page";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <>
      <header className="bg-[#ffffff] text-[#191817] shadow-md sticky top-0 z-50">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <span className="text-2xl font-bold text-purple-600 hover:text-purple-800">
                MyShop
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full bg-white text-[#191817] border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button className="hover:text-purple-600 transition-colors">
              <Link href="/wishlist">
                <Heart className="w-6 h-6" />
              </Link>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="hover:text-purple-600 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full px-1.5">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <Link href="/profile">
              <User className="w-6 h-6" />
            </Link>
            <div>
              <NotificationBell onClick={() => setIsSidebarOpen(true)} />
              <NotificationSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>
          </div>
        </div>

        {/* Bottom Menu Bar */}
        <nav className="bg-[#ffffff] border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-purple-600 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Electronics
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Fashion
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Home & Garden
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Deals
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
