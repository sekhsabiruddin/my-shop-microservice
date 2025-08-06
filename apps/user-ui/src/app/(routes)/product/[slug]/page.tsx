// "use client";

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   Star,
//   Plus,
//   Minus,
// } from "lucide-react";
// import Image from "next/image";

// import CustomerReviews from "./components/CustomerReviews";
// import { mockReviews, mockReviewStats } from "./data/mockData";

// interface ProductImage {
//   id: string;
//   url: string;
// }

// interface Product {
//   id: string;
//   title: string;
//   slug: string;
//   description: string;
//   regularPrice: number;
//   salePrice: number;
//   warranty?: string;
//   category?: string;
//   sku?: string;
//   stockQuantity?: number;
//   discountCode?: string;
//   tags: string[];
//   publicationStatus: string;
//   featuredProduct: boolean;
//   createdAt: string;
//   updatedAt: string;
//   images: ProductImage[];
// }

// const Page = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const id = slug?.split("-")[0];
//   const [isReviewSidebarOpen, setIsReviewSidebarOpen] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState("120 ML");
//   const [quantity, setQuantity] = useState(1);
//   const [pincode, setPincode] = useState("");

//   // 🔹 Fetch product by ID
//   const {
//     data: product,
//     isLoading,
//     isError,
//     error,
//   } = useQuery<Product>({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const { data } = await axios.get<Product>(
//         `http://localhost:8080/product/api/products/${id}`
//       );
//       return data;
//     },
//     enabled: !!id,
//   });
//   const fetchReviewsForProductStats = async (productId: string) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/product/api/products/${productId}/reviews?limit=1`
//       );
//       return response.data.data.statistics;
//     } catch (error) {
//       // Return default stats if reviews API fails
//       return {
//         averageRating: 0,
//         totalReviews: 0,
//       };
//     }
//   };
//   const sizes = ["120 ML", "250 ML", "500 ML", "1000 ML"];

//   const nextImage = () => {
//     if (product) {
//       setCurrentImageIndex((prev) =>
//         prev === product.images.length - 1 ? 0 : prev + 1
//       );
//     }
//   };

//   const prevImage = () => {
//     if (product) {
//       setCurrentImageIndex((prev) =>
//         prev === 0 ? product.images.length - 1 : prev - 1
//       );
//     }
//   };

//   const incrementQuantity = () => setQuantity((prev) => prev + 1);
//   const decrementQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   if (isLoading) {
//     return <p className="text-center mt-10">Loading product...</p>;
//   }

//   if (isError) {
//     return (
//       <p className="text-center mt-10 text-red-500">
//         Error: {(error as Error).message}
//       </p>
//     );
//   }

//   if (!product) {
//     return <p className="text-center mt-10">Product not found.</p>;
//   }

//   return (
//     <div>
//       <div className="max-w-7xl mx-auto p-6 bg-white">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Side - Product Images */}
//           <div className="space-y-4">
//             {/* Main Image */}
//             <div className="relative bg-gray-50 rounded-lg overflow-hidden">
//               <img
//                 src={product.images[currentImageIndex]?.url || "/fallback.png"}
//                 alt={product.title}
//                 className="w-full h-96 object-cover"
//               />

//               {/* Navigation Arrows */}
//               {product.images.length > 1 && (
//                 <>
//                   <button
//                     onClick={prevImage}
//                     className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
//                   >
//                     <ChevronLeft className="w-5 h-5 text-gray-600" />
//                   </button>
//                   <button
//                     onClick={nextImage}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
//                   >
//                     <ChevronRight className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Thumbnail Images */}
//             {/* <div className="flex gap-2">
//             {product.images.map((image, index) => (
//               <button
//                 key={image.id}
//                 onClick={() => setCurrentImageIndex(index)}
//                 className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                   currentImageIndex === index
//                     ? "border-gray-800"
//                     : "border-gray-200"
//                 }`}
//               >
//                 <img
//                   src={image.url}
//                   alt={`Product ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//             ))}
//           </div> */}

//             <div className="flex gap-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={image.id}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:border-gray-400 ${
//                     currentImageIndex === index
//                       ? "border-gray-800"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <Image
//                     src={image.url}
//                     alt={`Product ${index + 1}`}
//                     width={64}
//                     height={64}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//             {/* Description */}
//             <div className="mt-6">
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-sm font-medium">Description</span>
//                 <div className="h-px bg-gray-300 flex-1"></div>
//               </div>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {product.description}
//               </p>
//               <button className="text-blue-600 text-sm mt-2 hover:underline">
//                 Read More
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Product Details */}
//           <div className="space-y-6">
//             {/* Brand Tag */}
//             <div className="text-sm text-gray-500 uppercase tracking-wide">
//               {product.tags?.[0] ?? "GENERIC"}
//             </div>

//             {/* Product Title */}
//             <h1 className="text-2xl font-medium text-gray-900 leading-tight">
//               {product.title}
//             </h1>

//             {/* Static Rating + Reviews since backend doesn't provide */}
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-1">
//                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 <span className="text-sm font-medium">4.5</span>
//               </div>
//               <span className="text-sm text-gray-500">23 Reviews</span>
//             </div>

//             {/* Size Selection (Static) */}
//             <div>
//               <h3 className="text-sm font-medium text-gray-900 mb-3">SIZE</h3>
//               <div className="flex gap-2">
//                 {sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-4 py-2 text-sm border rounded transition-all ${
//                       selectedSize === size
//                         ? "bg-gray-800 text-white border-gray-800"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Price */}
//             <div className="space-y-1">
//               <div className="flex items-baseline gap-3">
//                 <span className="text-3xl font-bold text-gray-900">
//                   ₹{product.salePrice.toLocaleString()}
//                 </span>
//                 <span className="text-lg text-gray-500 line-through">
//                   ₹{product.regularPrice.toLocaleString()}
//                 </span>
//                 <span className="text-sm text-green-600 font-medium">
//                   ({product.discountCode ?? "0"}% off)
//                 </span>
//               </div>
//               <p className="text-sm text-gray-500">Inclusive of all taxes</p>
//             </div>

//             {/* Offers */}
//             <div className="bg-[#f7ebe3] border border-red-100 rounded-lg p-3">
//               <div className="flex items-center gap-4 text-sm ">
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                   <span className="text-red-700">2 offers</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                   <span className="text-red-700">1 free sample</span>
//                 </div>
//                 <button className="text-red-700 font-medium hover:underline ml-auto">
//                   View all
//                 </button>
//               </div>
//             </div>

//             {/* Quantity */}
//             <div className="flex items-center gap-4">
//               <h3 className="text-sm font-medium text-gray-900 mb-3">
//                 QUANTITY
//               </h3>
//               <div className="flex items-center border border-gray-300 rounded-md w-fit">
//                 <button
//                   onClick={decrementQuantity}
//                   className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="text-base font-medium w-10 text-center border-l border-r border-gray-300 py-1">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={incrementQuantity}
//                   className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <button className="flex-1 bg-[#773d4c] text-white py-3 px-6 rounded font-medium hover:bg-gray-900 transition-colors">
//                 ADD TO BAG
//               </button>
//               <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
//                 <Heart className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Delivery Options */}
//             <div>
//               <h3 className="text-sm font-medium text-gray-900 mb-3">
//                 Delivery Options
//               </h3>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter Pincode"
//                   value={pincode}
//                   onChange={(e) => setPincode(e.target.value)}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
//                 />
//                 <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 transition-colors">
//                   CHECK
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <CustomerReviews stats={mockReviewStats} reviews={mockReviews} id={id} />
//     </div>
//   );
// };

// export default Page;

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
import CustomerReviews from "./components/CustomerReviews";
import { ReviewData, ReviewStats } from "./types/review";
import axiosInstance from "../../../utils/axiosinstance";

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

// API function to fetch product
const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await axios.get<Product>(
    `http://localhost:8080/product/api/products/${id}`
  );
  return data;
};

// API function to fetch reviews stats (for product rating display)
const fetchReviews = async (productId: string) => {
  const res = await axios.get(
    `http://localhost:8080/product/api/products/${productId}/reviews`,
    {
      params: { page: 1, limit: 10 }, // pagination
    }
  );
  return res.data.data;
};

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const id = slug?.split("-")[0];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("120 ML");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");

  // Fetch product by ID
  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
    error: productErrorMessage,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  // Fetch review stats for product rating display
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviews(id),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Failed to load reviews.</p>;

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

  // Calculate discount percentage
  const discountPercentage = product
    ? Math.round(
        ((product.regularPrice - product.salePrice) / product.regularPrice) *
          100
      )
    : 0;

  if (productLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-3 text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Product
          </h1>
          <p className="text-gray-600 mb-4">
            {(productErrorMessage as Error).message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-600 mb-2">
          Product Not Found
        </h1>
        <p className="text-gray-500">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div>
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
            <div className="flex gap-2 overflow-x-auto">
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

            {/* Rating + Reviews from API */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {/* {reviewStatsLoading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    reviewStats?.averageRating?.toFixed(1) || "No ratings"
                  )} */}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {/* {reviewStatsLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  `${reviewStats?.totalReviews || 0} Reviews`
                )} */}
              </span>
            </div>

            {/* Size Selection */}
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
                {product.regularPrice > product.salePrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.regularPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      ({discountPercentage}% off)
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* Stock Status */}
            <div>
              {product.stockQuantity && product.stockQuantity > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">
                    In Stock ({product.stockQuantity} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-600">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Offers */}
            <div className="bg-[#f7ebe3] border border-red-100 rounded-lg p-3">
              <div className="flex items-center gap-4 text-sm">
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
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                QUANTITY
              </h3>
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
              <button
                className={`flex-1 py-3 px-6 rounded font-medium transition-colors ${
                  product.stockQuantity && product.stockQuantity > 0
                    ? "bg-[#773d4c] text-white hover:bg-[#5f2e38]"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
                disabled={!product.stockQuantity || product.stockQuantity === 0}
              >
                {product.stockQuantity && product.stockQuantity > 0
                  ? "ADD TO BAG"
                  : "OUT OF STOCK"}
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

            {/* Additional Product Info */}
            <div className="border-t pt-4 space-y-2 text-sm">
              {product.sku && (
                <div className="flex justify-between">
                  <span className="text-gray-500">SKU:</span>
                  <span className="text-gray-900">{product.sku}</span>
                </div>
              )}
              {product.category && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-900">{product.category}</span>
                </div>
              )}
              {product.warranty && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Warranty:</span>
                  <span className="text-gray-900">{product.warranty}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Section - Using Real API */}
      //{" "}
      <CustomerReviews stats={data.statistics} reviews={data.reviews} id={id} />
    </div>
  );
};

export default Page;
