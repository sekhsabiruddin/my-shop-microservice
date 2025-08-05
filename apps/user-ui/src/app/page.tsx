"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { closeCart } from "./store/slices/cartSlice";
import ProductCard from "./shared/componennts/ProductCard/ProductCard";
import CartSidebar from "./shared/componennts/CardSidebar/CartSidebar";

const Page = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cart.isOpen);

  // 🔹 Fetch products directly inside Page.tsx
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8080/product/api/products"
      );
      console.log("Product data", data);
      return data; // must return an array of products
    },
  });

  return (
    <div className="bg-[#FBF9F6] min-h-screen">
      <div className="max-w-[1240px] w-full mx-auto px-6 py-10">
        {isLoading && (
          <p className="text-center text-gray-600">Loading products...</p>
        )}
        {isError && (
          <p className="text-center text-red-600">
            Error: {(error as Error).message}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0
            ? products.map((product: any) => (
                <ProductCard key={product.id} {...product} />
              ))
            : !isLoading && (
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
