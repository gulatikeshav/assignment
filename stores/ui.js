import { create } from "zustand";

export const useUiStore = create((set) => ({
  search: "",
  category: "all",
  setSearch: (searchQuery) => set({ search: searchQuery }),
  setCategory: (categoryName) => set({ category: categoryName }),
  activeProductId: null,
  setActiveProductId: (productId) => set({ activeProductId: productId }),
}));
