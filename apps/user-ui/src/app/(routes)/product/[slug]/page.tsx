// "use client";

// import React, { useState } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   Star,
//   Plus,
//   Minus,
// } from "lucide-react";

// // Mock product data based on your Redux structure
// const mockProduct = {
//   id: "1",
//   imageUrl:
//     "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
//   secondaryImageUrl:
//     "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
//   tags: ["THE MINIMALIST"],
//   title:
//     "Hair Growth Actives 18% Hair Serum For Reduces Hair Fall Boosts Growth",
//   description:
//     "Get luscious hair with the Minimalist Hair Growth Actives 18% Scalp Serum With Capixyl Redensyl For Hair Fall Control (30ml) This anti-hair fall serums and...",
//   size: "120 ML",
//   price: 4000,
//   originalPrice: 5600,
//   discountPercentage: 40,
//   rating: 4.3,
//   reviews: 23,
//   offers: 4,
//   freeSamples: 2,
//   images: [
//     "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1585652757173-57de05aa70fa?w=400&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
//   ],
// };

// const ProductSinglePage = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState("120 ML");
//   const [quantity, setQuantity] = useState(1);
//   const [pincode, setPincode] = useState("");

//   const sizes = ["120 ML", "250 ML", "500 ML", "1000 ML"];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === mockProduct.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? mockProduct.images.length - 1 : prev - 1
//     );
//   };

//   const incrementQuantity = () => setQuantity((prev) => prev + 1);
//   const decrementQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left Side - Product Images */}
//         <div className="space-y-4">
//           {/* Main Image */}
//           <div className="relative bg-gray-50 rounded-lg overflow-hidden">
//             <img
//               src={mockProduct.images[currentImageIndex]}
//               alt={mockProduct.title}
//               className="w-full h-96 object-cover"
//             />

//             {/* Navigation Arrows */}
//             <button
//               onClick={prevImage}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-600" />
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
//             >
//               <ChevronRight className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Thumbnail Images */}
//           <div className="flex gap-2">
//             {mockProduct.images.map((image, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentImageIndex(index)}
//                 className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                   currentImageIndex === index
//                     ? "border-gray-800"
//                     : "border-gray-200"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={`Product ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//             ))}
//           </div>

//           {/* Description */}
//           <div className="mt-6">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-sm font-medium">Description</span>
//               <div className="h-px bg-gray-300 flex-1"></div>
//             </div>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {mockProduct.description}
//             </p>
//             <button className="text-blue-600 text-sm mt-2 hover:underline">
//               Read More
//             </button>
//           </div>
//         </div>

//         {/* Right Side - Product Details */}
//         <div className="space-y-6">
//           {/* Brand Tag */}
//           <div className="text-sm text-gray-500 uppercase tracking-wide">
//             {mockProduct.tags[0]}
//           </div>

//           {/* Product Title */}
//           <h1 className="text-2xl font-medium text-gray-900 leading-tight">
//             {mockProduct.title}
//           </h1>

//           {/* Rating and Reviews */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-1">
//               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//               <span className="text-sm font-medium">{mockProduct.rating}</span>
//             </div>
//             <span className="text-sm text-gray-500">
//               {mockProduct.reviews} Reviews
//             </span>
//           </div>

//           {/* Size Selection */}
//           <div>
//             <h3 className="text-sm font-medium text-gray-900 mb-3">SIZE</h3>
//             <div className="flex gap-2">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 text-sm border rounded transition-all ${
//                     selectedSize === size
//                       ? "bg-gray-800 text-white border-gray-800"
//                       : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Price */}
//           <div className="space-y-1">
//             <div className="flex items-baseline gap-3">
//               <span className="text-3xl font-bold text-gray-900">
//                 ₹{mockProduct.price.toLocaleString()}
//               </span>
//               <span className="text-lg text-gray-500 line-through">
//                 ₹{mockProduct.originalPrice.toLocaleString()}
//               </span>
//               <span className="text-sm text-green-600 font-medium">
//                 ({mockProduct.discountPercentage}% off)
//               </span>
//             </div>
//             <p className="text-sm text-gray-500">Inclusive of all taxes</p>
//           </div>

//           {/* Offers */}
//           <div className="bg-[#f7ebe3] border border-red-100 rounded-lg p-3">
//             <div className="flex items-center gap-4 text-sm ">
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                 <span className="text-red-700">
//                   {mockProduct.offers} offers
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                 <span className="text-red-700">
//                   {mockProduct.freeSamples} free samples
//                 </span>
//               </div>
//               <button className="text-red-700 font-medium hover:underline ml-auto">
//                 View all
//               </button>
//             </div>
//           </div>

//           {/* Quantity */}
//           <div className="flex items-center gap-4">
//             <h3 className="text-sm font-medium text-gray-900 mb-3">QUANTITY</h3>
//             <div className="flex items-center border border-gray-300 rounded-md w-fit">
//               <button
//                 onClick={decrementQuantity}
//                 className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 <Minus className="w-4 h-4" />
//               </button>
//               <span className="text-base font-medium w-10 text-center border-l border-r border-gray-300 py-1">
//                 {quantity}
//               </span>
//               <button
//                 onClick={incrementQuantity}
//                 className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3">
//             <button className="flex-1 bg-[#773d4c] text-white py-3 px-6 rounded font-medium hover:bg-gray-900 transition-colors">
//               ADD TO BAG
//             </button>
//             <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
//               <Heart className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Delivery Options */}
//           <div>
//             <h3 className="text-sm font-medium text-gray-900 mb-3">
//               Delivery Options
//             </h3>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Enter Pincode"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
//               />
//               <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 transition-colors">
//                 CHECK
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductSinglePage;

"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";

interface ProductImage {
  id: string;
  url: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  regularPrice: number;
  salePrice: number;
  warranty?: string;
  category?: string;
  sku?: string;
  stockQuantity?: number;
  discountCode?: string;
  tags: string[];
  publicationStatus: string;
  featuredProduct: boolean;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
}

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const id = slug?.split("-")[0];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("120 ML");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");

  // 🔹 Fetch product by ID
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get<Product>(
        `http://localhost:8080/product/api/products/${id}`
      );
      return data;
    },
    enabled: !!id,
  });

  const sizes = ["120 ML", "250 ML", "500 ML", "1000 ML"];

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {(error as Error).message}
      </p>
    );
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={product.images[currentImageIndex]?.url || "/fallback.png"}
              alt={product.title}
              className="w-full h-96 object-cover"
            />

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Images */}
          {/* <div className="flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index
                    ? "border-gray-800"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div> */}

          <div className="flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:border-gray-400 ${
                  currentImageIndex === index
                    ? "border-gray-800"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          {/* Description */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Description</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
            <button className="text-blue-600 text-sm mt-2 hover:underline">
              Read More
            </button>
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="space-y-6">
          {/* Brand Tag */}
          <div className="text-sm text-gray-500 uppercase tracking-wide">
            {product.tags?.[0] ?? "GENERIC"}
          </div>

          {/* Product Title */}
          <h1 className="text-2xl font-medium text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Static Rating + Reviews since backend doesn't provide */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.5</span>
            </div>
            <span className="text-sm text-gray-500">23 Reviews</span>
          </div>

          {/* Size Selection (Static) */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">SIZE</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm border rounded transition-all ${
                    selectedSize === size
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.salePrice.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ₹{product.regularPrice.toLocaleString()}
              </span>
              <span className="text-sm text-green-600 font-medium">
                ({product.discountCode ?? "0"}% off)
              </span>
            </div>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          {/* Offers */}
          <div className="bg-[#f7ebe3] border border-red-100 rounded-lg p-3">
            <div className="flex items-center gap-4 text-sm ">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-700">2 offers</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-700">1 free sample</span>
              </div>
              <button className="text-red-700 font-medium hover:underline ml-auto">
                View all
              </button>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">QUANTITY</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-fit">
              <button
                onClick={decrementQuantity}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-base font-medium w-10 text-center border-l border-r border-gray-300 py-1">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-[#773d4c] text-white py-3 px-6 rounded font-medium hover:bg-gray-900 transition-colors">
              ADD TO BAG
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Delivery Options
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
              />
              <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 transition-colors">
                CHECK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
