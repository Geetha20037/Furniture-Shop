import { Link } from "react-router-dom";
import { Eye, Heart, ShoppingBag, GitCompare, Check } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";
import QuickViewModal from "./QuickViewModal";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, compare, toggleCompare } = useStore();
  const [quick, setQuick] = useState(false);
  const liked = wishlist.some(p => p.id === product.id);
  const compared = compare.some(p => p.id === product.id);

  return (
    <>
      <article className="group surface overflow-hidden rounded-2xl border border-[#e7e1d7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[#211f1b]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#eee8de]">
          <Link to={`/product/${product.id}`}><img loading="lazy" src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></Link>
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#514b42]">{product.badge}</span>
          <button onClick={() => toggleWishlist(product)} className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 shadow-sm hover:scale-105" aria-label="Wishlist">
            <Heart size={17} fill={liked ? "#8b6f47" : "none"} className={liked ? "text-[#8b6f47]" : ""}/>
          </button>
          <div className="absolute bottom-3 left-3 right-3 flex translate-y-14 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button onClick={() => setQuick(true)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/95 py-3 text-sm font-semibold shadow"><Eye size={16}/> Quick view</button>
            <button onClick={() => addToCart(product)} className="grid place-items-center rounded-xl bg-[#29251f] px-4 text-white shadow"><ShoppingBag size={17}/></button>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-1 flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wider text-[#8b6f47]">{product.category}</span>
            <span className="text-xs font-semibold">★ {product.rating}</span>
          </div>
          <Link to={`/product/${product.id}`} className="block text-base font-bold text-main hover:text-[#8b6f47]">{product.name}</Link>
          <div className="mt-2 flex items-center justify-between">
            <div><span className="font-bold">₹{product.price.toLocaleString("en-IN")}</span> <del className="ml-1 text-xs text-gray-400">₹{product.oldPrice.toLocaleString("en-IN")}</del></div>
            <button onClick={() => toggleCompare(product)} className="text-gray-500 hover:text-[#8b6f47]" title="Compare">{compared ? <Check size={17}/> : <GitCompare size={17}/>}</button>
          </div>
        </div>
      </article>
      {quick && <QuickViewModal product={product} onClose={() => setQuick(false)} />}
    </>
  );
}