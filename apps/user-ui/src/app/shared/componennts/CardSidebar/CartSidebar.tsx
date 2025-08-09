"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axiosinstance";
import { useAppDispatch } from "../../../store/hook";
import { closeCart } from "../../../store/slices/cartSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";

// Types
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

type CartResponse = CartItem[];

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("/cart/api/get-all-cart", {
        withCredentials: true,
      });
      return res.data.data;
    },
  });

  const cartItems = data?.cartItems ?? [];
  const summary = data?.summary;

  // Mutations
  const { mutate: increaseQuantity, isPending: isIncreasing } = useMutation({
    mutationFn: async (productId: string) => {
      const res = await axiosInstance.patch(
        "/cart/api/increase-to-cart",
        { productId },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data?.message || "Quantity increased successfully");
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<any>;
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error?.message ||
        err.message ||
        "Failed to increase quantity";
      toast.error(errorMessage);
    },
  });

  const { mutate: decreaseQuantity, isPending: isDecreasing } = useMutation({
    mutationFn: async (productId: string) => {
      const res = await axiosInstance.patch(
        "/cart/api/decrease-to-cart",
        { productId },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data?.message || "Quantity updated successfully");
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<any>;
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error?.message ||
        err.message ||
        "Failed to decrease quantity";
      toast.error(errorMessage);
    },
  });

  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: async (productId: string) => {
      const res = await axiosInstance.delete("/cart/api/remove-to-cart", {
        data: { productId },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data?.message || "Item removed from cart successfully");
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<any>;
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error?.message ||
        err.message ||
        "Failed to remove item from cart";
      toast.error(errorMessage);
    },
  });

  const handleIncrease = (productId: string) => {
    increaseQuantity(productId);
  };

  const handleDecrease = (productId: string) => {
    decreaseQuantity(productId);
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  const total = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) => acc + item.product.salePrice * item.quantity,
        0
      )
    : 0;

  return (
    <div className="h-full w-96 bg-white p-4 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex gap-3 items-center">
          <span
            onClick={() => dispatch(closeCart())}
            className="cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </span>
          <p className="font-bold text-lg">Your Bag</p>
          {cartItems.length > 0 && (
            <span className="text-gray-500">({cartItems.length} items)</span>
          )}
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex-1 space-y-4 overflow-y-auto mt-4">
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && (
          <p className="text-center text-red-500">Failed to load cart</p>
        )}
        {!isLoading && !isError && cartItems.length === 0 && (
          <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
        )}

        {cartItems.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <Image
              src={item.product.images?.[0]?.url || "/fallback.png"}
              alt={item.product.title}
              width={60}
              height={60}
              className="rounded object-cover"
            />
            <div className="flex-1 ml-4">
              <p className="text-sm font-semibold line-clamp-2">
                {item.product.title}
              </p>
              <p className="text-sm font-medium">₹{item.product.salePrice}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => handleDecrease(item.productId)}
                  disabled={isDecreasing || isRemoving}
                  className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  −
                </button>
                <span className="px-2 min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrease(item.productId)}
                  disabled={isIncreasing || isRemoving}
                  className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.productId)}
              disabled={isRemoving}
              className="text-red-500 ml-2 hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
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
              onClick={() => dispatch(closeCart())}
              className="bg-black text-white uppercase px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
