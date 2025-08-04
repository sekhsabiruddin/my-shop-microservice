// "use client";

// import Image from "next/image";
// import React from "react";

// import { Product } from "../../../store/slices/product.slice";

// export default function ProductCard({
//   imageUrl,
//   secondaryImageUrl,
//   tags,
//   title,
//   description,
//   size,
//   price,
//   originalPrice,
//   discountPercentage,
// }: Product) {
//   return (
//     <div className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
//       {/* Tags */}
//       <div className="flex gap-2 px-3 pt-3">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             className="text-xs px-2 py-1 bg-[#EADDE2] text-[#6B3E4C] rounded-md"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* Image */}
//       <div className="flex justify-center items-center py-6">
//         {/* <img src={imageUrl} alt={title} className="h-32 object-contain" /> */}
//         {secondaryImageUrl && (
//           <Image
//             src={imageUrl}
//             alt={""}
//             width={300}
//             height={300}
//             className="object-cover"
//           />
//         )}
//       </div>

//       {/* Info */}
//       <div className="px-4 pb-16">
//         {" "}
//         {/* extra bottom padding for button space */}
//         <p className="text-xs text-[#6B3E4C] font-semibold uppercase mb-2">
//           {description}
//         </p>
//         <h3 className="text-sm text-[#191817] font-medium line-clamp-2">
//           {title}
//         </h3>
//         <p className="text-xs text-gray-500 mt-1">{size}</p>
//         {/* Price */}
//         <div className="mt-3">
//           <span className="text-lg font-semibold text-[#191817]">₹{price}</span>
//           <span className="text-sm line-through text-gray-400 ml-2">
//             ₹{originalPrice}
//           </span>
//           <span className="text-sm text-green-600 ml-2">
//             ({discountPercentage}% off)
//           </span>
//         </div>
//       </div>

//       {/* Add to Bag Button */}
//       <div className="absolute bottom-[-100%] left-0 right-0 transition-all duration-300 group-hover:bottom-0">
//         <button className="bg-[#6B3E4C] text-white text-sm font-semibold py-3 w-full hover:bg-[#5a2f3c] transition-colors">
//           ADD TO BAG
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
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";
import { RootState } from "../../../store";

export default function ProductCard({
  id,
  imageUrl,
  secondaryImageUrl,
  tags,
  title,
  description,
  size,
  price,
  originalPrice,
  discountPercentage,
}: Product) {
  const dispatch = useAppDispatch();

  // Check if product is already in the cart
  const isInCart = useAppSelector((state: RootState) =>
    state.cart.items.some((item) => item.productId === id)
  );

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart(id));
    }
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
      {/* Tags */}
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
        {secondaryImageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={300}
            className="object-cover"
          />
        )}
      </div>

      {/* Info */}
      <div className="px-4 pb-16">
        <p className="text-xs text-[#6B3E4C] font-semibold uppercase mb-2">
          {description}
        </p>
        <h3 className="text-sm text-[#191817] font-medium line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{size}</p>
        {/* Price */}
        <div className="mt-3">
          <span className="text-lg font-semibold text-[#191817]">₹{price}</span>
          <span className="text-sm line-through text-gray-400 ml-2">
            ₹{originalPrice}
          </span>
          <span className="text-sm text-green-600 ml-2">
            ({discountPercentage}% off)
          </span>
        </div>
      </div>

      {/* Add/Remove Button */}
      <div className="absolute bottom-[-100%] left-0 right-0 transition-all duration-300 group-hover:bottom-0">
        <button
          onClick={handleCartToggle}
          className={`${
            isInCart
              ? "bg-red-600 hover:bg-red-700"
              : "bg-[#6B3E4C] hover:bg-[#5a2f3c]"
          } text-white text-sm font-semibold py-3 w-full transition-colors`}
        >
          {isInCart ? "REMOVE FROM BAG" : "ADD TO BAG"}
        </button>
      </div>
    </div>
  );
}
