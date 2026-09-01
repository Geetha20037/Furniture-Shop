import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const {wishlist}=useStore();
  return <div className="container-fluid py-10"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#8b6f47]">Saved for later</p><h1 className="mt-2 text-4xl font-black">Wishlist</h1>{wishlist.length?<div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{wishlist.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="py-24 text-center"><Heart size={48} className="mx-auto text-[#8b6f47]"/><h2 className="mt-4 text-2xl font-bold">Your wishlist is empty</h2><Link to="/products" className="mt-6 inline-block rounded-full bg-[#29251f] px-6 py-3 text-sm font-bold text-white">Explore products</Link></div>}</div>;
}