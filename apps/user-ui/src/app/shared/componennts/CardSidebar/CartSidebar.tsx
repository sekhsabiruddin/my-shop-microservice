"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axiosinstance";
import { useAppDispatch } from "../../../store/hook";
import { closeCart } from "../../../store/slices/cartSlice";

// Type definitions
type ProductImage = {
  url: string;
};

type Product = {
  id: string;
  title: string;
  salePrice: number;
  images: ProductImage[];
};

type CartItem = {
  id: string;
  quantity: number;
  productId: string;
  product: Product;
};

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    isError,
  } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("/cart/api/get-all-cart", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const handleIncrease = async (productId: string) => {
    await axiosInstance.patch(
      "/cart/api/increase-to-cart",
      { productId },
      { withCredentials: true }
    );
    queryClient.invalidateQueries(["cart"]);
  };

  const handleDecrease = async (productId: string) => {
    await axiosInstance.patch(
      "/cart/api/decrease-to-cart",
      { productId },
      { withCredentials: true }
    );
    queryClient.invalidateQueries(["cart"]);
  };

  const handleRemove = async (productId: string) => {
    await axiosInstance.delete("/cart/api/remove-to-cart", {
      data: { productId },
      withCredentials: true,
    });
    queryClient.invalidateQueries(["cart"]);
  };

  const total = cartItems?.reduce((acc, item) => {
    return acc + item.product.salePrice * item.quantity;
  }, 0);

  return (
    <div className="h-full w-96 bg-white p-4 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex gap-3 items-center">
          <span
            onClick={() => dispatch(closeCart())}
            className="cursor-pointer"
          >
            ✕
          </span>
          <p className="font-bold text-lg">Your Bag</p>
          {cartItems && <span>({cartItems.length} items)</span>}
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex-1 space-y-4 overflow-y-auto mt-4">
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && (
          <p className="text-center text-red-500">Failed to load cart</p>
        )}
        {cartItems?.length === 0 && (
          <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
        )}

        {cartItems?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <Image
              src={item.product.images?.[0]?.url || "/fallback.png"}
              alt={item.product.title}
              width={60}
              height={60}
              className="rounded"
            />
            <div className="flex-1 ml-4">
              <p className="text-sm font-semibold">{item.product.title}</p>
              <p className="text-sm font-medium">₹{item.product.salePrice}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => handleDecrease(item.productId)}
                  className="px-2 py-1 border rounded"
                >
                  −
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item.productId)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.productId)}
              className="text-red-500 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      {cartItems && cartItems.length > 0 && (
        <div className="pt-4 border-t mt-4">
          <div className="bg-surface-10 h-[72px] w-full shadow p-4 flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500 uppercase">Total</p>
              <p className="text-lg font-semibold text-gray-900">
                ₹{total?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400">
                Inclusive of all taxes
              </p>
            </div>

            <Link
              href="/checkout"
              className="bg-black text-white uppercase px-4 py-2 text-sm"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
