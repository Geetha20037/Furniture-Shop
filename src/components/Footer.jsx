
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  ArrowUp,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleContact = (e) => {
    e.preventDefault();

    setSent(true);
    e.target.reset();

    setTimeout(() => {
      setSent(false);
    }, 5000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    setSubscribed(true);
    e.currentTarget.reset();

    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer
      id="contact"
      className="relative z-10 mt-20 bg-[#29251f] text-white"
    >
      <div className="container-fluid py-14">

        {/* CONTACT SECTION */}
        <div className="mb-14 rounded-3xl bg-[#f0eadf] p-6 text-[#29251f] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2">

            {/* CONTACT DETAILS */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-[#8b6f47]">
                Contact us
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                We'd love to hear from you.
              </h2>

              <p className="mt-4 max-w-lg leading-7 text-gray-600">
                Have a question about our furniture, delivery, returns,
                or your order? Get in touch with the WOODORA team.
              </p>

              <div className="mt-7 grid gap-4">

                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-4 rounded-xl bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#29251f] text-white">
                    <Phone size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Call us
                    </p>

                    <p className="mt-1 font-bold">
                      +91 98765 43210
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:hello@woodora.com"
                  className="flex items-center gap-4 rounded-xl bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#29251f] text-white">
                    <Mail size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email us
                    </p>

                    <p className="mt-1 font-bold">
                      hello@woodora.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-xl bg-white p-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#29251f] text-white">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Visit us
                    </p>

                    <p className="mt-1 font-bold">
                      Bengaluru, Karnataka, India
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black">
                Send us a message
              </h3>

              <form
                onSubmit={handleContact}
                className="mt-5 grid gap-4"
              >

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-xl border border-[#ddd5c9] px-4 py-3 text-sm text-[#29251f] outline-none transition focus:border-[#8b6f47]"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  className="rounded-xl border border-[#ddd5c9] px-4 py-3 text-sm text-[#29251f] outline-none transition focus:border-[#8b6f47]"
                />

                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject"
                  className="rounded-xl border border-[#ddd5c9] px-4 py-3 text-sm text-[#29251f] outline-none transition focus:border-[#8b6f47]"
                />

                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Your message"
                  className="resize-none rounded-xl border border-[#ddd5c9] px-4 py-3 text-sm text-[#29251f] outline-none transition focus:border-[#8b6f47]"
                />

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#29251f] py-3.5 text-sm font-bold text-white transition hover:bg-[#8b6f47]"
                >
                  Send Message
                  <Send size={17} />
                </button>

              </form>

              {/* SUCCESS MESSAGE */}
              {sent && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                  <CheckCircle
                    size={22}
                    className="shrink-0"
                  />

                  <div>
                    <p className="font-bold">
                      Thank you!
                    </p>

                    <p className="text-sm">
                      Your message has been sent successfully.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* FOOTER GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              onClick={goTop}
              className="inline-block text-2xl font-black tracking-[0.2em]"
            >
              WOODORA
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
              Timeless furniture, thoughtfully designed for modern homes.
            </p>

            <div className="mt-6 flex gap-2">

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 p-2.5 hover:bg-white/10"
              >
                <Instagram size={17} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 p-2.5 hover:bg-white/10"
              >
                <Facebook size={17} />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 p-2.5 hover:bg-white/10"
              >
                <Twitter size={17} />
              </a>

            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-semibold">
              Shop
            </h3>

            <div className="mt-4 grid gap-3 text-sm">

              <Link
                to="/products"
                onClick={goTop}
                className="w-fit text-white/65 hover:text-white"
              >
                All Products
              </Link>

              <Link
                to="/category/sofas"
                onClick={goTop}
                className="w-fit text-white/65 hover:text-white"
              >
                Sofas
              </Link>

              <Link
                to="/category/beds"
                onClick={goTop}
                className="w-fit text-white/65 hover:text-white"
              >
                Beds
              </Link>

              <Link
                to="/category/tables"
                onClick={goTop}
                className="w-fit text-white/65 hover:text-white"
              >
                Tables
              </Link>

            </div>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h3 className="font-semibold">
              Customer Care
            </h3>

            <div className="mt-4 grid gap-3 text-sm">

              <Link
                to="/cart"
                onClick={goTop}
                className="w-fit text-white/65 hover:text-white"
              >
                Cart
              </Link>

              <Link
                to="/wishlist"
                onClick={goTop}
                className="w-fit text-white/65 hover:text-white"
              >
                Wishlist
              </Link>

              <Link
                to="/compare"
                onClick={goTop}
                className="w-fit text-white/65 hover:text-white"
              >
                Compare
              </Link>

              <Link
                to="/checkout"
                onClick={goTop}
                className="w-fit text-white/65 hover:text-white"
              >
                Checkout
              </Link>

            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold">
              Stay in the loop
            </h3>

            <p className="mt-4 text-sm leading-6 text-white/65">
              Get new collection updates and exclusive offers.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex rounded-xl bg-white p-1"
            >
              <Mail
                className="m-2 shrink-0 text-[#29251f]"
                size={18}
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="min-w-0 flex-1 px-2 text-sm text-[#29251f] outline-none"
              />

              <button
                type="submit"
                className="rounded-lg bg-[#8b6f47] px-4 text-sm font-semibold text-white hover:bg-[#725a3a]"
              >
                Join
              </button>
            </form>

            {subscribed && (
              <div className="mt-3 flex items-center gap-2 text-sm text-green-300">
                <CheckCircle size={17} />
                <span>Thank you for subscribing!</span>
              </div>
            )}

          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">

          <span>
            © 2026 WOODORA. All rights reserved.
          </span>

          <button
            type="button"
            onClick={goTop}
            className="flex items-center gap-2 hover:text-white"
          >
            Back to top
            <ArrowUp size={14} />
          </button>

        </div>
      </div>
    </footer>
  );
}