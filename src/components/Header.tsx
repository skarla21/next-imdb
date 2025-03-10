"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeSwitch from "./DarkModeSwitch";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchBox from "./SearchBox";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative">
      <div className="flex flex-col md:flex-row items-center justify-between p-3 max-w-6xl mx-auto gap-4">
        {/* Left Section - Mobile Menu Button & Logo */}
        <div className="flex items-center justify-between w-full md:w-auto order-1 md:order-none">
          <div className="flex items-center">
            {/* Mobile Menu Button: only visible on small screens */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="block md:hidden mr-2 text-2xl focus:outline-none"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            <Link href={"/"} className="flex gap-1 items-center">
              <span className="text-2xl font-bold bg-amber-400 hover:bg-amber-500 transition-colors duration-200 py-1 px-2 rounded-lg">
                IMDb
              </span>
              <span className="text-xl">Clone</span>
            </Link>
          </div>

          {/* Mobile Auth Section */}
          <div className="flex md:hidden items-center gap-4">
            <DarkModeSwitch />
            <div className="flex items-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link href={"/sign-in"} className="hover:text-amber-500">
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>

        {/* Center Section - Search Box */}
        <div className="w-full md:max-w-xl order-3 md:order-none">
          <SearchBox />
        </div>

        {/* Right Section - Desktop Navigation & Auth */}
        <div className="hidden md:flex items-center gap-8 order-2 md:order-none">
          {/* Desktop Navigation */}
          <div className="flex gap-4 lg:mr-6 2xl:ml-6 2xl:mr-12">
            <Link
              href={"/"}
              className={`${
                pathname === "/" ? "text-amber-400" : "hover:text-amber-500"
              }`}
            >
              Home
            </Link>
            <Link
              href={"/favorites"}
              className={`${
                pathname === "/favorites"
                  ? "text-amber-400"
                  : "hover:text-amber-500"
              }`}
            >
              Favorites
            </Link>
            <Link
              href={"/about"}
              className={`${
                pathname === "/about"
                  ? "text-amber-400"
                  : "hover:text-amber-500"
              }`}
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="flex items-center gap-4">
            <DarkModeSwitch />
            <div className="flex items-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link href={"/sign-in"} className="hover:text-amber-500">
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (if needed) for Home/About links */}
        <div className="flex md:hidden gap-2 order-4 w-full justify-center p-2 bg-amber-100 dark:bg-gray-800 rounded-lg mx-4 mb-2">
          <Link
            href="/"
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              pathname === "/"
                ? "bg-amber-400 dark:bg-gray-600 text-white font-semibold"
                : "hover:bg-amber-200 dark:hover:bg-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              pathname === "/favorites"
                ? "bg-amber-400 dark:bg-gray-600 text-white font-semibold"
                : "hover:bg-amber-200 dark:hover:bg-gray-700"
            }`}
          >
            Favorites
          </Link>
          <Link
            href="/about"
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              pathname === "/about"
                ? "bg-amber-400 dark:bg-gray-600 text-white font-semibold"
                : "hover:bg-amber-200 dark:hover:bg-gray-700"
            }`}
          >
            About
          </Link>
        </div>
      </div>

      {/* Mobile Menu Popup for Navbar Items */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-amber-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-500 p-4 md:hidden z-20 shadow-lg rounded-b-lg">
          {/* These are the mobile menu items (your Navbar items) */}
          <Link
            href={"/top/trending_movies"}
            className="block py-2 hover:text-amber-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Trending Movies
          </Link>
          <Link
            href={"/top/trending_shows"}
            className="block py-2 hover:text-amber-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Trending Shows
          </Link>
          <Link
            href={"/top/rated_movies"}
            className="block py-2 hover:text-amber-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Top Rated Movies
          </Link>
          <Link
            href={"/top/rated_shows"}
            className="block py-2 hover:text-amber-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Top Rated Shows
          </Link>
        </div>
      )}
    </header>
  );
}
