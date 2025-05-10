import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/lib/types/types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId && item.variantId === action.payload.variantId,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      console.log(action.payload);
      state.items = state.items.filter(
        (item) => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId),
      );
    },
    updateQuantity(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId && item.variantId === action.payload.variantId,
      );
      console.log(item);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    loadCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const CartActions = cartSlice.actions;

export const CartReducer = cartSlice.reducer;
