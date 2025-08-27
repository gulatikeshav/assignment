"use client";
import { useCartStore } from "@/stores/cart";

export default function CartFab() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + (i.qty || 0), 0);

  return (
    <button className="fixed bottom-6 right-6 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center relative shadow-lg hover:bg-black/90">
      🛒
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 shadow">
          {count}
        </span>
      )}
    </button>
  );
}
