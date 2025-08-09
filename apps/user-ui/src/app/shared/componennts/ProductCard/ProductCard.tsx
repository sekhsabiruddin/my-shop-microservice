// // "use client";
// // import Image from "next/image";
// // import React from "react";
// // import { Product } from "../../../store/slices/product.slice";
// // import { useAppDispatch, useAppSelector } from "../../../store/hook";
// // import {
// //   addToCart as addToCartStore,
// //   removeFromCart,
// // } from "../../../store/slices/cartSlice";
// // import { RootState } from "../../../store";
// // import Link from "next/link";
// // import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import axios from "axios";
// // import axiosInstance from "../../../utils/axiosinstance";

// // export default function ProductCard({
// //   id,
// //   images,
// //   slug,
// //   tags,
// //   title,
// //   description,
// //   salePrice,
// //   regularPrice,
// //   discountPercentage,
// // }: Product) {
// //   const dispatch = useAppDispatch();
// //   const queryClient = useQueryClient();

// //   // Local cart state check
// //   const isInCart = useAppSelector((state: RootState) =>
// //     state.cart.items.some((item) => item.productId === id)
// //   );

// //   // ---- Mutation to add item to cart ----
// //   const { mutate: addToCartApi, isPending: isAdding } = useMutation({
// //     mutationFn: async () => {
// //       const res = await axiosInstance.post("/cart/api/add-to-cart", {
// //         productId: id,
// //         quantity: 1,
// //       });
// //       return res.data;
// //     },
// //     onSuccess: () => {
// //       dispatch(addToCartStore(id)); // update Redux cart
// //       queryClient.invalidateQueries({ queryKey: ["cart"] });
// //     },
// //     onError: (error: any) => {
// //       console.error(
// //         "Add to cart failed",
// //         error.response?.data || error.message
// //       );
// //     },
// //   });

// //   // ---- Mutation to remove item from cart ----
// //   const { mutate: removeFromCartApi, isPending: isRemoving } = useMutation({
// //     mutationFn: async () => {
// //       const res = await axiosInstance.delete(
// //         "cart/api/remove-to-cart",
// //         {
// //           data: { productId: id },
// //         }
// //       );
// //       return res.data;
// //     },
// //     onSuccess: () => {
// //       dispatch(removeFromCart(id));
// //       queryClient.invalidateQueries({ queryKey: ["cart"] });
// //     },
// //     onError: (error: any) => {
// //       console.error(
// //         "Remove from cart failed",
// //         error.response?.data || error.message
// //       );
// //     },
// //   });

// //   const handleCartToggle = () => {
// //     if (isInCart) {
// //       removeFromCartApi();
// //     } else {
// //       addToCartApi();
// //     }
// //   };

// //   function slugify(text: string) {
// //     return text
// //       .toLowerCase()
// //       .replace(/[^a-z0-9]+/g, "-")
// //       .replace(/(^-|-$)+/g, "");
// //   }

// //   return (
// //     <div className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
// //       {/* Tags */}
// //       <Link href={`/product/${id}-${slugify(slug)}`}>
// //         <div className="flex gap-2 px-3 pt-3">
// //           {tags &&
// //             tags.map((tag, index) => (
// //               <span
// //                 key={index}
// //                 className="text-xs px-2 py-1 bg-[#EADDE2] text-[#6B3E4C] rounded-md"
// //               >
// //                 {tag}
// //               </span>
// //             ))}
// //         </div>

// //         {/* Image */}
// //         <div className="flex justify-center items-center py-6">
// //           <Image
// //             src={images[0]?.url || "/placeholder-image.jpg"}
// //             alt={title}
// //             width={300}
// //             height={300}
// //             className="object-cover"
// //           />
// //         </div>

// //         {/* Info */}
// //         <div className="px-4 pb-16">
// //           <p className="text-xs text-[#6B3E4C] font-semibold uppercase mb-2">
// //             {description}
// //           </p>
// //           <h3 className="text-sm text-[#191817] font-medium line-clamp-2">
// //             {title}
// //           </h3>

// //           {/* Price */}
// //           <div className="mt-3">
// //             <span className="text-lg font-semibold text-[#191817]">
// //               ₹{salePrice}
// //             </span>
// //             <span className="text-sm line-through text-gray-400 ml-2">
// //               ₹{regularPrice}
// //             </span>
// //             <span className="text-sm text-green-600 ml-2">
// //               ({discountPercentage}% off)
// //             </span>
// //           </div>
// //         </div>
// //       </Link>

// //       {/* Add/Remove Button */}
// //       <div className="absolute bottom-[-100%] left-0 right-0 transition-all duration-300 group-hover:bottom-0">
// //         <button
// //           onClick={handleCartToggle}
// //           disabled={isAdding || isRemoving}
// //           className={`${
// //             isInCart
// //               ? "bg-red-600 hover:bg-red-700"
// //               : "bg-[#6B3E4C] hover:bg-[#5a2f3c]"
// //           } text-white text-sm font-semibold py-3 w-full transition-colors`}
// //         >
// //           {isAdding || isRemoving
// //             ? "Processing..."
// //             : isInCart
// //             ? "REMOVE FROM BAG"
// //             : "ADD TO BAG"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import Image from "next/image";
// import React from "react";
// import { Product } from "../../../store/slices/product.slice";
// import { useAppDispatch, useAppSelector } from "../../../store/hook";
// import {
//   addToCart as addToCartStore,
//   removeFromCart,
// } from "../../../store/slices/cartSlice";
// import { RootState } from "../../../store";
// import Link from "next/link";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axiosInstance from "../../../utils/axiosinstance";
// import { toast } from "sonner";

// export default function ProductCard({
//   id,
//   images,
//   slug,
//   tags,
//   title,
//   description,
//   salePrice,
//   regularPrice,
//   discountPercentage,
// }: Product) {
//   const dispatch = useAppDispatch();
//   const queryClient = useQueryClient();

//   // Local cart state check
//   const isInCart = useAppSelector((state: RootState) =>
//     state.cart.items.some((item) => item.productId === id)
//   );

//   // ---- Mutation to add item to cart ----
//   const { mutate: addToCartApi, isPending: isAdding } = useMutation({
//     mutationFn: async () => {
//       const res = await axiosInstance.post("/cart/api/add-to-cart", {
//         productId: id,
//         quantity: 1,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       dispatch(addToCartStore(id)); // update Redux cart
//       queryClient.invalidateQueries({ queryKey: ["cart"] });

//       // Show success message from backend
//       toast.success(data?.message || "Product added to cart successfully");
//     },
//     onError: (error: any) => {
//       // Show error message from backend
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         error.message ||
//         "Failed to add product to cart";

//       toast.error(errorMessage);
//     },
//   });

//   // ---- Mutation to remove item from cart ----
//   const { mutate: removeFromCartApi, isPending: isRemoving } = useMutation({
//     mutationFn: async () => {
//       const res = await axiosInstance.delete("cart/api/remove-to-cart", {
//         data: { productId: id },
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       dispatch(removeFromCart(id));
//       queryClient.invalidateQueries({ queryKey: ["cart"] });

//       // Show success message from backend
//       toast.success(data?.message || "Product removed from cart successfully");
//     },
//     onError: (error: any) => {
//       // Show error message from backend
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         error.message ||
//         "Failed to remove product from cart";

//       toast.error(errorMessage);
//     },
//   });

//   const handleCartToggle = () => {
//     if (isInCart) {
//       removeFromCartApi();
//     } else {
//       addToCartApi();
//     }
//   };

//   function slugify(text: string) {
//     return text
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)+/g, "");
//   }

//   return (
//     <div className="bg-white border border-gray-200 overflow-hidden  group relative">
//       {/* Tags */}
//       <Link href={`/product/${id}-${slugify(slug)}`}>
//         <div className="flex gap-2 px-3 pt-3">
//           {tags &&
//             tags.map((tag, index) => (
//               <div className="bg-secondary-10 capitalize">
//                 <span
//                   key={index}
//                   className="sub-heading-03-regular-mobile md:text-[12px] lg:sub-heading-08-regular text-secondary-60 py-[2px] lg:py-[4px] px-[4px] lg:px-[8px] truncate max-w-[80px] md:max-w-[100px] lg:max-w-[120px]"
//                 >
//                   {tag}
//                 </span>
//               </div>
//             ))}
//         </div>

//         {/* Image */}
//         <div className="px-2 py-3">
//           <div className="w-full h-[200px] overflow-hidden">
//             <Image
//               src={images[0]?.url || "/placeholder-image.jpg"}
//               alt={title}
//               width={200}
//               height={200}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>

//         {/* Info */}
//         <div className="px-4 pb-16">
//           <h3 className="text-sm font-roboto  text-[#191817] font-medium line-clamp-2 font-inter">
//             {title}
//           </h3>
//           <p className="mt-1   font-moontime text-xs text-[#6B3E4C] font-semibold uppercase mb-2 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
//             {description}
//           </p>

//           {/* Price */}
//           <div className="mt-3">
//             <span className="text-lg font-semibold text-[#191817] font-poppins">
//               ₹{salePrice}
//             </span>
//             <span className="text-sm line-through text-gray-400 ml-2">
//               ₹{regularPrice}
//             </span>
//             <span className="text-sm text-green-600 ml-2">
//               ({discountPercentage}% off)
//             </span>
//           </div>
//         </div>
//       </Link>

//       {/* Add/Remove Button */}
//       <div className="absolute bottom-[-100%] left-0 right-0 transition-all duration-300 group-hover:bottom-0">
//         <button
//           onClick={handleCartToggle}
//           disabled={isAdding || isRemoving}
//           className={`${
//             isInCart
//               ? "bg-red-600 hover:bg-red-700 disabled:bg-red-400"
//               : "bg-[#6B3E4C] hover:bg-[#5a2f3c] disabled:bg-gray-400"
//           } text-white text-sm font-semibold py-3 w-full transition-colors`}
//         >
//           {isAdding || isRemoving
//             ? "Processing..."
//             : isInCart
//             ? "REMOVE FROM BAG"
//             : "ADD TO BAG"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Product } from "../../../store/slices/product.slice";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
  addToCart as addToCartStore,
  removeFromCart,
} from "../../../store/slices/cartSlice";
import { RootState } from "../../../store";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axiosinstance";
import { toast } from "sonner";
import { Heart, Eye } from "lucide-react";

export default function ProductCard({
  id,
  images,
  slug,
  tags,
  title,
  description,
  salePrice,
  regularPrice,
  discountPercentage,
}: Product) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Local cart state check
  const isInCart = useAppSelector((state: RootState) =>
    state.cart.items.some((item) => item.productId === id)
  );

  // ---- Mutation to add item to cart ----
  const { mutate: addToCartApi, isPending: isAdding } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/cart/api/add-to-cart", {
        productId: id,
        quantity: 1,
      });
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(addToCartStore(id)); // update Redux cart
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Show success message from backend
      toast.success(data?.message || "Product added to cart successfully");
    },
    onError: (error: any) => {
      // Show error message from backend
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to add product to cart";

      toast.error(errorMessage);
    },
  });

  // ---- Mutation to remove item from cart ----
  const { mutate: removeFromCartApi, isPending: isRemoving } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete("cart/api/remove-to-cart", {
        data: { productId: id },
      });
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(removeFromCart(id));
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Show success message from backend
      toast.success(data?.message || "Product removed from cart successfully");
    },
    onError: (error: any) => {
      // Show error message from backend
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to remove product from cart";

      toast.error(errorMessage);
    },
  });

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCartApi();
    } else {
      addToCartApi();
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  const isProcessing = isAdding || isRemoving;

  return (
    <div
      className="bg-white border border-gray-100 overflow-hidden  shadow-sm  transition-all duration-500 group relative transform  backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}

      {/* Floating Action Buttons */}
      <div
        className={`absolute top-3 right-3 z-20 flex flex-col gap-2 transition-all duration-300 opacity-0 translate-x-4"
        }`}
      >
        <button
          onClick={handleWishlistToggle}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
            isWishlisted
              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
              : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        <Link href={`/product/${id}-${slugify(slug)}`}>
          <button className="p-2.5 rounded-full bg-white/90 text-gray-600 backdrop-blur-md hover:bg-[#5a2f3c]/10 hover:text-[#5a2f3c] transition-all duration-300 hover:scale-110 shadow-lg">
            <Eye className="w-4 h-4" />
          </button>
        </Link>
      </div>

      <Link href={`/product/${id}-${slugify(slug)}`}>
        {/* Tags */}
        <div className="flex gap-2 px-3 pt-3 relative z-10">
          {tags &&
            tags.slice(0, 2).map((tag, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#5a2f3c]/10 to-[#6B3E4C]/10 rounded-lg backdrop-blur-sm"
              >
                <span className="sub-heading-03-regular-mobile md:text-[12px] lg:sub-heading-08-regular text-[#5a2f3c] py-[4px] lg:py-[6px] px-[8px] lg:px-[12px] truncate max-w-[80px] md:max-w-[100px] lg:max-w-[120px] capitalize font-medium block">
                  {tag}
                </span>
              </div>
            ))}
        </div>

        {/* Image */}
        <div className="px-3 py-4">
          <div className="w-full h-[200px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <Image
              src={images[0]?.url || "/placeholder-image.jpg"}
              alt={title}
              width={200}
              height={200}
              className={`object-cover w-full h-full transition-all duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pb-16">
          <h3 className="text-sm font-roboto text-[#191817] font-semibold line-clamp-2 font-inter mb-2 group-hover:text-[#5a2f3c] transition-colors duration-300">
            {title}
          </h3>
          <p className=" text-xs text-[#6B3E4C] font-medium mb-3 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] leading-relaxed">
            {description}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#191817] font-poppins">
                ₹{salePrice?.toLocaleString()}
              </span>
              <span className="text-sm line-through text-gray-400">
                ₹{regularPrice?.toLocaleString()}
              </span>
            </div>
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">
              {discountPercentage}% OFF
            </div>
          </div>

          {/* Savings Display */}
          <div className="mt-2">
            <span className="text-xs text-green-600 font-medium">
              You save ₹
              {((regularPrice || 0) - (salePrice || 0)).toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      {/* Add/Remove Button - Enhanced */}
      <div className="absolute bottom-[-100%] left-0 right-0 transition-all duration-300 group-hover:bottom-0">
        <button
          onClick={handleCartToggle}
          disabled={isProcessing}
          className={`relative overflow-hidden w-full py-3.5 font-semibold text-sm transition-all duration-300 transform active:scale-95 ${
            isInCart
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
              : "bg-gradient-to-r from-[#5a2f3c] to-[#6B3E4C] hover:from-[#4a2532] hover:to-[#5a2f3c] text-white shadow-lg"
          } ${
            isProcessing ? "cursor-not-allowed opacity-75" : "hover:shadow-xl"
          }`}
        >
          {/* Loading Animation */}
          {isProcessing && (
            <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          <span
            className={`flex items-center justify-center gap-2 ${
              isProcessing ? "opacity-50" : "opacity-100"
            }`}
          >
            {!isProcessing && (
              <span className="text-lg">{isInCart ? "🗑️" : "🛍️"}</span>
            )}
            {isProcessing
              ? "PROCESSING..."
              : isInCart
              ? "REMOVE FROM BAG"
              : "ADD TO BAG"}
          </span>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#5a2f3c]/5 to-[#6B3E4C]/5"></div>
        <div className="absolute inset-0 rounded-xl ring-1 ring-[#5a2f3c]/20"></div>
      </div>

      {/* Success Pulse Animation */}
      {isInCart && !isProcessing && (
        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="bg-green-500 text-white p-1.5 rounded-full animate-pulse shadow-lg">
            <span className="text-xs">✓</span>
          </div>
        </div>
      )}
    </div>
  );
}
