// "use client";

// import Image from "next/image";
// import React from "react";
// import { Product } from "../../../store/slices/product.slice";
// import { useAppDispatch, useAppSelector } from "../../../store/hook";
// import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";
// import { RootState } from "../../../store";
// import Link from "next/link";

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

//   // Check if product is already in the cart
//   const isInCart = useAppSelector((state: RootState) =>
//     state.cart.items.some((item) => item.productId === id)
//   );

//   const handleCartToggle = () => {
//     if (isInCart) {
//       dispatch(removeFromCart(id));
//     } else {
//       dispatch(addToCart(id));
//     }
//   };
//   function slugify(text: string) {
//     return text
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)+/g, "");
//   }
//   return (
//     <div className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
//       {/* Tags */}
//       <Link href={`/product/${id}-${slugify(slug)}`}>
//         <div className="flex gap-2 px-3 pt-3">
//           {tags &&
//             tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="text-xs px-2 py-1 bg-[#EADDE2] text-[#6B3E4C] rounded-md"
//               >
//                 {tag}
//               </span>
//             ))}
//         </div>

//         {/* Image */}
//         <div className="flex justify-center items-center py-6">
//           <Image
//             src={images[0]?.url || "/placeholder-image.jpg"}
//             alt={title}
//             width={300}
//             height={300}
//             className="object-cover"
//           />
//         </div>

//         {/* Info */}
//         <div className="px-4 pb-16">
//           <p className="text-xs text-[#6B3E4C] font-semibold uppercase mb-2">
//             {description}
//           </p>
//           <h3 className="text-sm text-[#191817] font-medium line-clamp-2">
//             {title}
//           </h3>
//           {/* <p className="text-xs text-gray-500 mt-1">{size}</p> */}
//           {/* Price */}
//           <div className="mt-3">
//             <span className="text-lg font-semibold text-[#191817]">
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
//           className={`${
//             isInCart
//               ? "bg-red-600 hover:bg-red-700"
//               : "bg-[#6B3E4C] hover:bg-[#5a2f3c]"
//           } text-white text-sm font-semibold py-3 w-full transition-colors`}
//         >
//           {isInCart ? "REMOVE FROM BAG" : "ADD TO BAG"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import React from "react";
import { Product } from "../../../store/slices/product.slice";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
  addToCart as addToCartStore,
  removeFromCart,
} from "../../../store/slices/cartSlice";
import { RootState } from "../../../store";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../../../utils/axiosinstance";

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
    onSuccess: () => {
      dispatch(addToCartStore(id)); // update Redux cart
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      console.error(
        "Add to cart failed",
        error.response?.data || error.message
      );
    },
  });

  // ---- Mutation to remove item from cart ----
  const { mutate: removeFromCartApi, isPending: isRemoving } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(
        "cart/api/remove-to-cart",
        {
          data: { productId: id },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      dispatch(removeFromCart(id));
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      console.error(
        "Remove from cart failed",
        error.response?.data || error.message
      );
    },
  });

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCartApi();
    } else {
      addToCartApi();
    }
  };

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
      {/* Tags */}
      <Link href={`/product/${id}-${slugify(slug)}`}>
        <div className="flex gap-2 px-3 pt-3">
          {tags &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-[#EADDE2] text-[#6B3E4C] rounded-md"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Image */}
        <div className="flex justify-center items-center py-6">
          <Image
            src={images[0]?.url || "/placeholder-image.jpg"}
            alt={title}
            width={300}
            height={300}
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="px-4 pb-16">
          <p className="text-xs text-[#6B3E4C] font-semibold uppercase mb-2">
            {description}
          </p>
          <h3 className="text-sm text-[#191817] font-medium line-clamp-2">
            {title}
          </h3>

          {/* Price */}
          <div className="mt-3">
            <span className="text-lg font-semibold text-[#191817]">
              ₹{salePrice}
            </span>
            <span className="text-sm line-through text-gray-400 ml-2">
              ₹{regularPrice}
            </span>
            <span className="text-sm text-green-600 ml-2">
              ({discountPercentage}% off)
            </span>
          </div>
        </div>
      </Link>

      {/* Add/Remove Button */}
      <div className="absolute bottom-[-100%] left-0 right-0 transition-all duration-300 group-hover:bottom-0">
        <button
          onClick={handleCartToggle}
          disabled={isAdding || isRemoving}
          className={`${
            isInCart
              ? "bg-red-600 hover:bg-red-700"
              : "bg-[#6B3E4C] hover:bg-[#5a2f3c]"
          } text-white text-sm font-semibold py-3 w-full transition-colors`}
        >
          {isAdding || isRemoving
            ? "Processing..."
            : isInCart
            ? "REMOVE FROM BAG"
            : "ADD TO BAG"}
        </button>
      </div>
    </div>
  );
}
