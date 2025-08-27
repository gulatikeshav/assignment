"use client";
import { useQuery } from "@tanstack/react-query";
import { useUiStore } from "@/stores/ui";

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function ProductGrid() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const searchQuery = useUiStore((uiState) => uiState.search);
  const selectedCategory = useUiStore((uiState) => uiState.category);
  const setActiveProductId = useUiStore(
    (uiState) => uiState.setActiveProductId
  );

  if (isLoading)
    return (
      <div className="py-16 text-center text-gray-600">Loading products...</div>
    );
  if (error)
    return (
      <div className="py-16 text-center text-red-600">
        Failed to load products.
      </div>
    );

  const filteredProducts = (products || [])
    .filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {filteredProducts.map((product) => (
        <button
          key={product.id}
          onClick={() => setActiveProductId(product.id)}
          className="group text-left rounded-2xl border border-gray-200 p-4 transition hover:shadow-xl hover:-translate-y-0.5 bg-white/90 backdrop-blur-sm"
        >
          <div className="aspect-[4/3] w-full mb-3 overflow-hidden rounded-lg bg-white grid place-items-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </div>
          <h3 className="text-sm font-semibold line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h3>
          <p className="text-lg font-bold mt-2">${product.price}</p>
          <p className="text-xs text-gray-600 line-clamp-2 mt-1">
            {product.description}
          </p>
        </button>
      ))}
    </div>
  );
}
