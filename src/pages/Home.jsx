
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Headphones,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export default function Home() {
  const { recent } = useStore();

  return (
    <div>
      <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#e8e0d3]">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=85"
          alt="Modern furniture interior"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#29251f]/80 via-[#29251f]/40 to-transparent" />

        <div className="container-fluid relative flex min-h-[calc(100vh-76px)] items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-white"
          >
            <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[.25em]">
              <Sparkles size={17} />
              New season collection
            </div>

            <h1 className="text-5xl font-black leading-[1.02] sm:text-6xl lg:text-8xl">
              Make your space{" "}
              <span className="text-[#dbc19e]">beautiful.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Discover beautifully crafted furniture designed to bring comfort,
              warmth, and timeless style into your home.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#29251f] transition hover:-translate-y-0.5"
              >
                Shop collection{" "}
                <ArrowRight className="ml-2 inline" size={17} />
              </Link>

              <a
                href="#categories"
                className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10"
              >
                Explore categories
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FIXED TEXT VISIBILITY */}
      <section className="border-b border-[#e7e1d7] bg-white text-[#29251f] dark:bg-[#211f1b] dark:text-white">
        <div className="container-fluid grid grid-cols-2 divide-x divide-[#e7e1d7] py-5 md:grid-cols-4">
          {[
            [Truck, "Free delivery", "On orders above ₹10,000"],
            [ShieldCheck, "Secure payments", "100% protected checkout"],
            [RefreshCcw, "Easy returns", "30-day return policy"],
            [Headphones, "Expert support", "Here when you need us"],
          ].map(([Icon, title, text]) => (
            <div
              key={title}
              className="flex items-center gap-3 px-3 py-3 first:pl-0 md:px-6"
            >
              <Icon
                size={23}
                className="shrink-0 text-[#8b6f47]"
              />

              <div>
                <div className="text-sm font-bold text-[#29251f] dark:text-white">
                  {title}
                </div>

                <div className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
                  {text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="container-fluid py-20">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-[#8b6f47]">
              Shop by room
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Find your perfect piece
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden text-sm font-bold sm:block"
          >
            View all{" "}
            <ArrowRight className="ml-1 inline" size={16} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="group relative aspect-[.82] overflow-hidden rounded-2xl"
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

              <span className="absolute bottom-4 left-4 text-lg font-bold text-white">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-fluid bg-[#f0eadf] py-20 dark:bg-[#211f1b]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-[#8b6f47]">
              Curated for you
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Featured furniture
            </h2>
          </div>

          <Link to="/products" className="text-sm font-bold">
            Shop all{" "}
            <ArrowRight className="ml-1 inline" size={16} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container-fluid py-20">
        <div className="grid overflow-hidden rounded-3xl bg-[#29251f] text-white lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-[#dbc19e]">
              Limited time
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Up to 30% off selected pieces.
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-white/65">
              Refresh your home with considered pieces at special prices.
              Offer available while stocks last.
            </p>

            <Link
              to="/products"
              className="mt-8 w-fit rounded-full bg-[#dbc19e] px-7 py-3.5 text-sm font-bold text-[#29251f]"
            >
              Shop offers
            </Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            alt="Furniture offer"
            className="min-h-80 w-full object-cover"
          />
        </div>
      </section>

      {recent.length > 0 && (
        <section className="container-fluid pb-20">
          <h2 className="text-3xl font-black">
            Recently viewed
          </h2>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recent.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section id="about" className="container-fluid pb-20">
        <div className="rounded-3xl border border-[#e7e1d7] bg-white p-8 text-center dark:bg-[#211f1b] sm:p-14">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-[#8b6f47]">
            Our philosophy
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black sm:text-4xl">
            Good furniture should feel good for years.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
            We combine honest materials, thoughtful proportions, and everyday
            comfort to create pieces that belong in real homes.
          </p>
        </div>
      </section>
    </div>
  );
}