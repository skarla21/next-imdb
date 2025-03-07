import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-3 max-w-6xl mx-auto gap-4">
      {/* Left Section - Logo */}
      <div className="flex items-center justify-between w-full md:w-auto order-1 md:order-none">
        <Link href={"/"} className="flex gap-1 items-center">
          <span className="text-2xl font-bold bg-amber-400 hover:bg-amber-500 transition-colors duration-200 py-1 px-2 rounded-lg">
            IMDb
          </span>
          <span className="text-xl">Clone</span>
        </Link>

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

      {/* Right Section - Navigation and Desktop Auth */}
      <div className="hidden md:flex items-center gap-8 order-2 md:order-none">
        {/* Desktop Navigation */}
        <div className="flex gap-4">
          <Link href={"/"} className="hover:text-amber-500">
            Home
          </Link>
          <Link href={"/about"} className="hover:text-amber-500">
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

      {/* Mobile Navigation */}
      <div className="flex md:hidden gap-4 order-4 w-full justify-center">
        <Link href={"/"} className="hover:text-amber-500">
          Home
        </Link>
        <Link href={"/about"} className="hover:text-amber-500">
          About
        </Link>
      </div>
    </div>
  );
}
