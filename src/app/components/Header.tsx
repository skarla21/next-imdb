import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-3 max-w-6xl mx-auto gap-4 flex-wrap">
      {/* Left Section - Logo */}
      <Link href={"/"} className="flex gap-1 items-center order-first">
        <span className="text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg">
          IMDb
        </span>
        <span className="text-xl">Clone</span>
      </Link>

      {/* Center Section - Navigation Links */}
      <div className="flex flex-grow justify-center order-2 sm:order-none">
        <ul className="flex gap-4 justify-center">
          <li>
            <Link href={"/"} className="hover:text-amber-500">
              Home
            </Link>
          </li>
          <li>
            <Link href={"/about"} className="hover:text-amber-500">
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section - Dark Mode and Auth */}
      <div className="flex items-center gap-4 order-last">
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
  );
}
