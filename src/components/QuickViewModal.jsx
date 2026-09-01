import { X, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const liked = wishlist.some(p => p.id === product.id);
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4" onMouseDown={onClose}>
      <div onMouseDown={e => e.stopPropagation()} className="surface grid max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-[#f8f6f1] md:grid-cols-2">
        <div className="relative min-h-72"><img src={product.image} alt={product.name} className="h-full w-full object-cover"/></div>
        <div className="relative p-7">
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 hover:bg-black/5"><X/></button>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8b6f47]">{product.category}</span>
          <h2 className="mt-3 text-2xl font-bold">{product.name}</h2>
          <div className="mt-3 text-lg font-bold">₹{product.price.toLocaleString("en-IN")}</div>
          <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-300">{product.description}</p>
          <div className="mt-7 flex gap-3">
            <button onClick={() => addToCart(product)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#29251f] py-3.5 font-semibold text-white"><ShoppingBag size={18}/> Add to cart</button>
            <button onClick={() => toggleWishlist(product)} className="rounded-xl border border-[#d8d0c4] px-4"><Heart fill={liked ? "#8b6f47" : "none"}/></button>
          </div>
          <Link onClick={onClose} to={`/product/${product.id}`} className="mt-3 block text-center text-sm font-semibold text-[#8b6f47]">View full details →</Link>
        </div>
      </div>
    </div>
  );
}