import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingBag, Minus, Plus, GitCompare, Check, Star } from "lucide-react";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [qty,setQty] = useState(1);
  const { addToCart, wishlist, toggleWishlist, compare, toggleCompare, addRecent } = useStore();
  useEffect(()=>{ if(product) addRecent(product); },[product?.id]);
  if(!product) return <div className="container-fluid py-24 text-center"><h1 className="text-3xl font-bold">Product not found</h1><Link to="/products" className="mt-4 inline-block text-[#8b6f47]">Back to shop</Link></div>;
  const liked = wishlist.some(p=>p.id===product.id), compared=compare.some(p=>p.id===product.id);
  return <div className="container-fluid py-10">
    <div className="mb-6 text-sm text-gray-500"><Link to="/">Home</Link> / <Link to="/products">Shop</Link> / {product.name}</div>
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl bg-[#eee8de]"><img src={product.image} alt={product.name} className="h-full max-h-[650px] w-full object-cover"/></div>
      <div className="flex flex-col justify-center py-3">
        <span className="text-sm font-bold uppercase tracking-[.2em] text-[#8b6f47]">{product.category} · {product.badge}</span>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">{product.name}</h1>
        <div className="mt-4 flex items-center gap-3"><span className="font-bold">★ {product.rating}</span><span className="text-sm text-gray-500">{product.reviews} reviews</span></div>
        <div className="mt-6 text-3xl font-black">₹{product.price.toLocaleString("en-IN")} <del className="ml-2 text-base font-normal text-gray-400">₹{product.oldPrice.toLocaleString("en-IN")}</del></div>
        <p className="mt-6 leading-8 text-gray-600 dark:text-gray-300">{product.description}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-[#f0eadf] p-4 text-sm dark:bg-[#211f1b]"><div><span className="text-gray-500">Material</span><p className="mt-1 font-semibold">{product.material}</p></div><div><span className="text-gray-500">Dimensions</span><p className="mt-1 font-semibold">{product.dimensions}</p></div></div>
        <div className="mt-7 flex flex-wrap gap-3">
          <div className="flex items-center rounded-xl border border-[#d9d1c5]"><button onClick={()=>setQty(Math.max(1,qty-1))} className="p-3"><Minus size={17}/></button><span className="w-8 text-center text-sm font-bold">{qty}</span><button onClick={()=>setQty(qty+1)} className="p-3"><Plus size={17}/></button></div>
          <button onClick={()=>addToCart(product,qty)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#29251f] px-6 py-3.5 font-bold text-white"><ShoppingBag size={18}/> Add to cart</button>
          <button onClick={()=>toggleWishlist(product)} className="rounded-xl border border-[#d9d1c5] px-4"><Heart fill={liked?"#8b6f47":"none"} /></button>
          <button onClick={()=>toggleCompare(product)} className="rounded-xl border border-[#d9d1c5] px-4">{compared?<Check/>:<GitCompare/>}</button>
        </div>
      </div>
    </div>
    <section className="mt-20"><h2 className="text-3xl font-black">You may also like</h2><div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  </div>;
}