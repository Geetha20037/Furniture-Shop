
import { useMemo, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Products() {
  const { category: urlCategory } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const search = params.get("search") || "";

  // URL category is the source of truth
  const activeCategory = urlCategory || "";

  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  const perPage = 8;

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const matchesCategory =
        !activeCategory ||
        product.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesPrice =
        product.price <= maxPrice;

      const matchesRating =
        product.rating >= rating;

      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search.toLowerCase());

      return (
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesSearch
      );
    });

    if (sort === "low") {
      list = [...list].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "high") {
      list = [...list].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "rating") {
      list = [...list].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return list;
  }, [
    activeCategory,
    maxPrice,
    rating,
    sort,
    search
  ]);

  const pages = Math.max(
    1,
    Math.ceil(filtered.length / perPage)
  );

  const shown = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const selectCategory = (slug) => {
    setPage(1);

    if (slug) {
      navigate(`/category/${slug}`);
    } else {
      navigate("/products");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const reset = () => {
    setSort("featured");
    setMaxPrice(60000);
    setRating(0);
    setPage(1);

    navigate("/products");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const Sidebar = () => (
    <aside className="w-full rounded-2xl border border-[#e7e1d7] bg-white p-5 text-[#29251f] dark:border-[#37332c] dark:bg-[#211f1b] dark:text-[#f5f1e8] lg:w-64 lg:shrink-0">

      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          Filters
        </h3>

        <button
          type="button"
          onClick={reset}
          className="text-xs font-semibold text-[#8b6f47] hover:underline"
        >
          Reset
        </button>
      </div>

      {/* CATEGORY */}
      <div className="mt-6">

        <p className="text-sm font-bold">
          Category
        </p>

        <div className="mt-3 grid gap-2">

          <button
            type="button"
            onClick={() => selectCategory("")}
            className={`rounded-lg px-3 py-2 text-left text-sm ${
              !activeCategory
                ? "bg-[#29251f] text-white"
                : "hover:bg-[#f0eadf] dark:hover:bg-[#2b2822]"
            }`}
          >
            All Products
          </button>

          {categories.map((category) => (

            <button
              type="button"
              key={category.slug}
              onClick={() =>
                selectCategory(category.slug)
              }
              className={`rounded-lg px-3 py-2 text-left text-sm ${
                activeCategory === category.slug
                  ? "bg-[#29251f] text-white"
                  : "hover:bg-[#f0eadf] dark:hover:bg-[#2b2822]"
              }`}
            >
              {category.name}
            </button>

          ))}

        </div>
      </div>

      {/* PRICE */}
      <div className="mt-7">

        <p className="text-sm font-bold">
          Price up to
        </p>

        <input
          type="range"
          min="5000"
          max="60000"
          step="1000"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setPage(1);
          }}
          className="mt-4 w-full accent-[#8b6f47]"
        />

        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>₹5k</span>

          <span>
            ₹{maxPrice.toLocaleString("en-IN")}
          </span>
        </div>

      </div>

      {/* RATING */}
      <div className="mt-7">

        <p className="text-sm font-bold">
          Rating
        </p>

        <div className="mt-3 grid gap-2">

          {[4.5, 4, 3].map((value) => (

            <button
              type="button"
              key={value}
              onClick={() => {
                setRating(
                  rating === value ? 0 : value
                );
                setPage(1);
              }}
              className={`rounded-lg px-3 py-2 text-left text-sm ${
                rating === value
                  ? "bg-[#29251f] text-white"
                  : "hover:bg-[#f0eadf] dark:hover:bg-[#2b2822]"
              }`}
            >
              ★ {value}+ rating
            </button>

          ))}

        </div>
      </div>

    </aside>
  );

  const title = activeCategory
    ? activeCategory.charAt(0).toUpperCase() +
      activeCategory.slice(1)
    : "All furniture";

  return (
    <div className="container-fluid py-10">

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-sm font-bold uppercase tracking-[.2em] text-[#8b6f47]">
          Collection
        </p>

        <h1 className="mt-2 text-4xl font-black">
          {title}
        </h1>

        <p className="mt-2 text-gray-500">
          {filtered.length} pieces
          {search && <> for “{search}”</>}
        </p>

      </div>

      {/* MOBILE FILTER */}
      <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">

        <button
          type="button"
          onClick={() => setMobileFilters(true)}
          className="flex items-center gap-2 rounded-xl border border-[#ddd5c9] px-4 py-2.5 text-sm font-semibold"
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-[#ddd5c9] bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="featured">
            Featured
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>

          <option value="rating">
            Top Rated
          </option>
        </select>

      </div>

      {/* MAIN */}
      <div className="flex items-start gap-7">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* PRODUCTS */}
        <div className="min-w-0 flex-1">

          {/* DESKTOP SORT */}
          <div className="mb-5 hidden justify-end lg:flex">

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-[#ddd5c9] bg-transparent px-4 py-2.5 text-sm"
            >
              <option value="featured">
                Featured
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="rating">
                Top Rated
              </option>

            </select>

          </div>

          {/* PRODUCT GRID */}
          {shown.length > 0 ? (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

              {shown.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed p-14 text-center">

              <h3 className="text-xl font-bold">
                No products found
              </h3>

              <button
                type="button"
                onClick={reset}
                className="mt-4 rounded-full bg-[#29251f] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Clear filters
              </button>

            </div>

          )}

          {/* PAGINATION */}
          {pages > 1 && (

            <div className="mt-9 flex justify-center gap-2">

              {Array.from({ length: pages }).map(
                (_, index) => {

                  const pageNumber = index + 1;

                  return (
                    <button
                      type="button"
                      key={pageNumber}
                      onClick={() => {
                        setPage(pageNumber);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth"
                        });
                      }}
                      className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${
                        page === pageNumber
                          ? "bg-[#29251f] text-white"
                          : "hover:bg-[#e9e2d7]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
              )}

            </div>

          )}

        </div>

      </div>

      {/* MOBILE FILTER PANEL */}
      {mobileFilters && (

        <div className="fixed inset-0 z-[80] bg-black/50 lg:hidden">

          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-3xl bg-[#f8f6f1] p-5 dark:bg-[#171614]">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Filters
              </h2>

              <button
                type="button"
                onClick={() =>
                  setMobileFilters(false)
                }
              >
                <X />
              </button>

            </div>

            <Sidebar />

            <button
              type="button"
              onClick={() =>
                setMobileFilters(false)
              }
              className="mt-4 w-full rounded-xl bg-[#29251f] py-3 font-semibold text-white"
            >
              Apply filters
            </button>

          </div>

        </div>

      )}

    </div>
  );
}