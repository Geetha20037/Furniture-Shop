
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sun,
  Moon,
  User,
  X,
  GitCompare,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    cartCount,
    wishlist,
    darkMode,
    setDarkMode,
    compare,
  } = useStore();

  const navigate = useNavigate();

  const closeMobile = () => {
    setMobileOpen(false);
  };

  // Always go to the top of the page
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // HOME
  const goHome = () => {
    closeMobile();

    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 50);
    }
  };

  // SHOP
  const goShop = () => {
    closeMobile();
    navigate("/products");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  // CATEGORIES
  const goCategories = () => {
    closeMobile();
    navigate("/products");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  // ABOUT
  const goAbout = () => {
    closeMobile();

    if (window.location.pathname === "/") {
      const element = document.getElementById("about");

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/");

      setTimeout(() => {
        const element = document.getElementById("about");

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
    }
  };

  // CONTACT
  const goContact = () => {
    closeMobile();

    if (window.location.pathname === "/") {
      const element = document.getElementById("contact");

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/");

      setTimeout(() => {
        const element = document.getElementById("contact");

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    closeMobile();

    navigate(
      `/products?search=${encodeURIComponent(search.trim())}`
    );

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5dfd4] bg-[#f8f6f1]/95 backdrop-blur-xl dark:border-[#37332c] dark:bg-[#171614]/95">
      <div className="container-fluid">
        <div className="flex h-[76px] items-center justify-between gap-4">

          {/* LOGO */}
          <button
            type="button"
            onClick={goHome}
            className="shrink-0 !bg-transparent text-xl font-black tracking-[0.2em] !text-[#29251f] hover:!bg-transparent dark:!text-white"
          >
            WOODORA
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 lg:flex">

            <button
              type="button"
              onClick={goHome}
              className="!bg-transparent text-sm font-semibold !text-[#29251f] hover:!bg-transparent hover:!text-[#8b6f47] dark:!text-white dark:hover:!text-[#dbc19e]"
            >
              Home
            </button>

            <button
              type="button"
              onClick={goShop}
              className="!bg-transparent text-sm font-semibold !text-[#29251f] hover:!bg-transparent hover:!text-[#8b6f47] dark:!text-white dark:hover:!text-[#dbc19e]"
            >
              Shop
            </button>

            <button
              type="button"
              onClick={goCategories}
              className="!bg-transparent text-sm font-semibold !text-[#29251f] hover:!bg-transparent hover:!text-[#8b6f47] dark:!text-white dark:hover:!text-[#dbc19e]"
            >
              Categories
            </button>

            <button
              type="button"
              onClick={goAbout}
              className="!bg-transparent text-sm font-semibold !text-[#29251f] hover:!bg-transparent hover:!text-[#8b6f47] dark:!text-white dark:hover:!text-[#dbc19e]"
            >
              About
            </button>

            <button
              type="button"
              onClick={goContact}
              className="!bg-transparent text-sm font-semibold !text-[#29251f] hover:!bg-transparent hover:!text-[#8b6f47] dark:!text-white dark:hover:!text-[#dbc19e]"
            >
              Contact
            </button>

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-1">

            {/* SEARCH */}
            <form
              onSubmit={submitSearch}
              className="hidden items-center rounded-full border border-[#ded6ca] bg-white px-3 py-2 dark:border-[#37332c] dark:bg-[#211f1b] xl:flex"
            >
              <Search
                size={17}
                className="text-gray-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search furniture..."
                className="w-44 bg-transparent px-2 text-sm text-[#29251f] outline-none placeholder:text-gray-500 dark:text-white"
              />
            </form>

            {/* DARK MODE */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full p-2.5 !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white dark:hover:bg-[#2b2822]"
            >
              {darkMode ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>

            {/* COMPARE */}
            <Link
              to="/compare"
              onClick={scrollTop}
              className="relative hidden rounded-full p-2.5 !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white sm:block"
            >
              <GitCompare size={19} />

              {compare.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#8b6f47] text-[9px] !text-white">
                  {compare.length}
                </span>
              )}
            </Link>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              onClick={scrollTop}
              className="relative hidden rounded-full p-2.5 !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white sm:block"
            >
              <Heart size={19} />

              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#8b6f47] text-[9px] !text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* ACCOUNT */}
            <Link
              to="/login"
              onClick={scrollTop}
              className="hidden rounded-full p-2.5 !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white sm:block"
            >
              <User size={19} />
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              onClick={scrollTop}
              className="relative rounded-full p-2.5 !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#8b6f47] text-[9px] !text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full p-2.5 !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white dark:hover:bg-[#2b2822] lg:hidden"
            >
              {mobileOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileOpen && (
          <div className="border-t border-[#e5dfd4] py-4 dark:border-[#37332c] lg:hidden">

            <form
              onSubmit={submitSearch}
              className="mb-4 flex items-center rounded-xl border border-[#ded6ca] bg-white px-3 py-3 dark:border-[#37332c] dark:bg-[#211f1b]"
            >
              <Search size={18} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search furniture..."
                className="w-full bg-transparent px-2 text-[#29251f] outline-none dark:text-white"
              />
            </form>

            <div className="grid gap-1">

              <button
                type="button"
                onClick={goHome}
                className="rounded-lg px-3 py-3 text-left font-medium !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white dark:hover:bg-[#2b2822]"
              >
                Home
              </button>

              <button
                type="button"
                onClick={goShop}
                className="rounded-lg px-3 py-3 text-left font-medium !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white dark:hover:bg-[#2b2822]"
              >
                Shop
              </button>

              <button
                type="button"
                onClick={goCategories}
                className="rounded-lg px-3 py-3 text-left font-medium !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white dark:hover:bg-[#2b2822]"
              >
                Categories
              </button>

              <button
                type="button"
                onClick={goAbout}
                className="rounded-lg px-3 py-3 text-left font-medium !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white dark:hover:bg-[#2b2822]"
              >
                About
              </button>

              <button
                type="button"
                onClick={goContact}
                className="rounded-lg px-3 py-3 text-left font-medium !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white dark:hover:bg-[#2b2822]"
              >
                Contact
              </button>

              <Link
                onClick={() => {
                  closeMobile();
                  scrollTop();
                }}
                to="/wishlist"
                className="rounded-lg px-3 py-3 font-medium !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white"
              >
                Wishlist ({wishlist.length})
              </Link>

              <Link
                onClick={() => {
                  closeMobile();
                  scrollTop();
                }}
                to="/compare"
                className="rounded-lg px-3 py-3 font-medium !text-[#29251f] hover:bg-[#ebe5db] dark:!text-white"
              >
                Compare ({compare.length})
              </Link>

            </div>
          </div>
        )}
      </div>
    </header>
  );
}