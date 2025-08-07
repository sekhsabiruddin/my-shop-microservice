import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    addToCart(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ productId: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    increaseQty(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  toggleCart,
  openCart,
  closeCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
