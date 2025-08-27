"use client";
import { useQuery } from "@tanstack/react-query";

function useProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    enabled: !!productId,
  });
}

export default function ProductModal({ productId, onClose, onAddToCart }) {
  if (!productId) return null;
  const { data: product, isLoading, error } = useProduct(productId);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-3xl w-full rounded-2xl p-5 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 text-sm hover:opacity-80"
        >
          ✕
        </button>
        {isLoading ? (
          <div className="py-12 text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-600">
            Failed to load product
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-1/2">
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-white grid place-items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="sm:w-1/2">
              <h2 className="font-semibold text-xl">{product.title}</h2>
              <div className="mt-2 font-bold text-lg">${product.price}</div>
              <p className="text-gray-600 mt-3 leading-relaxed">
                {product.description}
              </p>
              {onAddToCart && (
                <div className="sticky bottom-0 pt-4">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="mt-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
