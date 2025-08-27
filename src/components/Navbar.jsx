"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, LogIn, X, Search } from "lucide-react"; // added Search
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setCartOpen } = useProducts();
  const { user, openLogin, logOut } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="w-full bg-white border-b border-gray-200 z-40">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        {/* Left Menu (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-800 font-medium hover:text-blue-500"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-800 font-medium hover:text-blue-500"
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className="text-gray-800 font-medium hover:text-blue-500"
          >
            FAQs
          </Link>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/assets/refilly.png"
            alt="Refilly Logo"
            className="h-10 w-auto md:h-10"
          />
          <span className="text-2xl md:text-3xl font-extrabold text-gray-600">
            Refilly
          </span>
        </Link>

        {/* Right Menu (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* Search Icon (Desktop) */}
          <button
            onClick={() => alert("Search feature coming soon!")}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">
                👋 {user.displayName || user.email}
              </span>
              <button
                onClick={logOut}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={openLogin}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              aria-label="Login"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </button>
          )}
        </div>

        {/* Right Side (Mobile Only) */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* Search Icon (Mobile) */}
          <button
            onClick={() => alert("Search feature coming soon!")}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-800"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col">
            {/* Close Button */}
            <button
              className="mb-6 p-2 rounded-lg hover:bg-gray-100 self-end"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            {/* Links */}
            <nav className="flex flex-col gap-4 text-gray-800 font-medium">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500"
              >
                Contact
              </Link>
              <Link
                href="/returns"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500"
              >
                Return Policy
              </Link>
              <Link
                href="/shipping"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500"
              >
                Shipping Info.
              </Link>
              <Link
                href="/faq"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500"
              >
                FAQs
              </Link>

              {/* Auth Buttons (inside menu) */}
              {user ? (
                <button
                  onClick={() => {
                    logOut();
                    setIsOpen(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    openLogin();
                    setIsOpen(false);
                  }}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
