"use client";
import { useEffect } from "react";
import { useUiStore } from "@/stores/ui";

export default function Controls({ categories }) {
  const searchQuery = useUiStore((uiState) => uiState.search);
  const setSearchQuery = useUiStore((uiState) => uiState.setSearch);
  const selectedCategory = useUiStore((uiState) => uiState.category);
  const setSelectedCategory = useUiStore((uiState) => uiState.setCategory);

  useEffect(() => {
    if (!categories || categories.length === 0) return;
  }, [categories]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="relative sm:col-span-2">
        <label htmlFor="search" className="sr-only">
          Search products
        </label>
        <input
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black/50 bg-white"
        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔎
        </span>
      </div>
      <div>
        <label htmlFor="category" className="sr-only">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black/50"
        >
          <option value="all">All</option>
          {categories?.map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
