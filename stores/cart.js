import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(
      (cartItem) => cartItem.id === product.id
    );
    if (existingItem) {
      set({
        items: currentItems.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, qty: (cartItem.qty || 1) + 1 }
            : cartItem
        ),
      });
    } else {
      set({ items: [...currentItems, { ...product, qty: 1 }] });
    }
  },
  decrementItem: (productId) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(
      (cartItem) => cartItem.id === productId
    );
    if (!existingItem) return;
    if ((existingItem.qty || 1) <= 1) {
      set({
        items: currentItems.filter((cartItem) => cartItem.id !== productId),
      });
    } else {
      set({
        items: currentItems.map((cartItem) =>
          cartItem.id === productId
            ? { ...cartItem, qty: (cartItem.qty || 1) - 1 }
            : cartItem
        ),
      });
    }
  },
  removeItem: (productId) =>
    set({ items: get().items.filter((cartItem) => cartItem.id !== productId) }),
  clear: () => set({ items: [] }),
}));
