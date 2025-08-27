"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cart";

export default function NavBar() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const totalQty = items.reduce((sum, i) => sum + (i.qty || 1), 0);
  const linkClasses = (href) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === href
        ? "bg-black/80 text-white"
        : "text-gray-100 hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-40 bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex gap-1">
              <Link href="/" className={linkClasses("/")}>
                Home
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="/cart" className={linkClasses("/cart") + " relative"}>
                Cart
                {totalQty > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-600 text-white text-xs px-2 py-0.5">
                    {totalQty}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
