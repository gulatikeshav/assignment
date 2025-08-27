"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Controls from "@/components/Controls";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import AddProductForm from "@/components/AddProductForm";
import CartFab from "@/components/CartFab";
import { useUiStore } from "@/stores/ui";
import { useCartStore } from "@/stores/cart";

async function fetchCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) throw new Error("Failed categories");
  return res.json();
}

export default function Home() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const activeProductId = useUiStore((uiState) => uiState.activeProductId);
  const setActiveProductId = useUiStore(
    (uiState) => uiState.setActiveProductId
  );
  const addItem = useCartStore((cartState) => cartState.addItem);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          FakeStore
        </h1>
      </header>

      <div className="bg-white/70 backdrop-blur rounded-2xl border border-gray-200 p-3 sm:p-4 mb-5">
        <Controls categories={categories} />
      </div>

      <ProductGrid />

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Add Product (Mock)</h2>
        <AddProductForm />
      </section>

      <ProductModal
        productId={activeProductId}
        onClose={() => setActiveProductId(null)}
        onAddToCart={(product) => addItem(product)}
      />

      <CartFab />
    </div>
  );
}
