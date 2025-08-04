import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Image1 from "../../../../public/assets/Applegreensmith.png";
import Image2 from "../../../../public/assets/Avocado.jpg";
import Image3 from "../../../../public/assets/Orange.jpg";
import Image4 from "../../../../public/assets/Watermelon.jpg";
import Image5 from "../../../../public/assets/Strawberry.jpg";
// Product Interface
import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  imageUrl: string | StaticImageData;
  secondaryImageUrl: string | StaticImageData;
  tags: string[];
  title: string;
  description: string;
  size: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
}

// Product State
interface ProductState {
  products: Product[];
}

// Initial State with 5 mock products
const initialState: ProductState = {
  products: [
    {
      id: "1",
      imageUrl: Image1,
      secondaryImageUrl: Image1,
      tags: ["Bestseller", "Face Serum"],
      title:
        "Beauty of Joseon Matte Sun Stick Mugwort + Camelia With SPF 50 PA++++",
      description: "Skin 1004",
      size: "120 ml",
      price: 1370,
      originalPrice: 2150,
      discountPercentage: 45,
    },
    {
      id: "2",
      imageUrl: Image2,
      secondaryImageUrl: Image2,
      tags: ["Trending"],
      title: "Some Other Product",
      description: "Skin 2000",
      size: "100 ml",
      price: 1200,
      originalPrice: 1800,
      discountPercentage: 33,
    },
    {
      id: "3",
      imageUrl: Image3,
      secondaryImageUrl: Image3,
      tags: ["New Arrival"],
      title: "Another Product",
      description: "Skin 3000",
      size: "150 ml",
      price: 1600,
      originalPrice: 2000,
      discountPercentage: 20,
    },
    {
      id: "4",
      imageUrl: Image4,
      secondaryImageUrl: Image4,
      tags: ["Limited Edition"],
      title: "Luxury Skin Serum",
      description: "Premium Quality",
      size: "200 ml",
      price: 2500,
      originalPrice: 3200,
      discountPercentage: 22,
    },
    {
      id: "5",
      imageUrl: Image5,
      secondaryImageUrl: Image5,
      tags: ["Hot Deal"],
      title: "Glow Moisturizer",
      description: "Hydration Boost",
      size: "80 ml",
      price: 900,
      originalPrice: 1500,
      discountPercentage: 40,
    },
  ],
};

// Create Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

// Export Actions & Reducer
export const { setProducts, addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
