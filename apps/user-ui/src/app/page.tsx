"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store"; // ✅ adjust path to your store/index.ts
import ProductCard from "./shared/componennts/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { closeCart } from "./store/slices/cartSlice";
import CartSidebar from "./shared/componennts/CardSidebar/CartSidebar";

const Page = () => {
  // 🔹 Get products from Redux store
  const products = useSelector((state: RootState) => state.product.products);
  const isOpen = useAppSelector((state: RootState) => state.cart.isOpen);
  const dispatch = useAppDispatch();
  return (
    <div className="bg-[#FBF9F6] min-h-screen">
      <div className="max-w-[1240px] w-full mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No products available.
            </p>
          )}
        </div>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => dispatch(closeCart())}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white transform transition-transform duration-300 shadow-lg z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CartSidebar />
      </div>
    </div>
  );
};

export default Page;
