
import { Link, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Cart() {
  const {
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useStore();

  const navigate = useNavigate();

  const delivery =
    cartTotal >= 10000 || cartTotal === 0 ? 0 : 499;

  const total = cartTotal + delivery;

  if (!cart.length) {
    return (
      <div className="container-fluid py-24 text-center text-[#29251f] dark:text-white">
        <ShoppingBag
          size={48}
          className="mx-auto text-[#8b6f47]"
        />

        <h1 className="mt-5 text-3xl font-black">
          Your cart is empty
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Add something beautiful to your home.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-block rounded-full bg-[#29251f] px-7 py-3.5 text-sm font-bold text-white"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid py-10 text-[#29251f] dark:text-white">
      <h1 className="text-4xl font-black">
        Your cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-[#e7e1d7] bg-white p-4 dark:border-[#37332c] dark:bg-[#211f1b]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-28 w-28 rounded-xl object-cover sm:h-36 sm:w-36"
              />

              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link
                      to={`/product/${item.id}`}
                      className="font-bold hover:text-[#8b6f47]"
                    >
                      {item.name}
                    </Link>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.color}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-[#d9d1c5] dark:border-[#4a453c]">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      className="p-2 hover:bg-[#f0eadf] dark:hover:bg-[#2b2822]"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="w-7 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      className="p-2 hover:bg-[#f0eadf] dark:hover:bg-[#2b2822]"
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <span className="font-bold">
                    ₹
                    {(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl bg-[#29251f] p-6 text-white dark:bg-[#29251f]">
          <h2 className="text-xl font-bold text-white">
            Order summary
          </h2>

          <div className="mt-6 space-y-3 text-sm text-white/80">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span className="font-medium text-white">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>

              <span className="font-medium text-white">
                {delivery ? "₹499" : "Free"}
              </span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-lg font-black text-white">
                <span>Total</span>

                <span>
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-bold text-[#29251f] transition hover:bg-[#f0eadf]"
          >
            Checkout
            <ArrowRight size={17} />
          </button>

          <Link
            to="/products"
            className="mt-4 block text-center text-sm font-semibold text-white hover:text-[#dbc19e]"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}