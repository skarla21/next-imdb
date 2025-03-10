"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarItem({
  title,
  param,
}: {
  title: string;
  param: string;
}) {
  const category = usePathname().split("/")[2];
  return (
    <div>
      <Link
        href={`/top/${param}`}
        className={`m-1 p-2 sm:p-3 rounded-lg text-sm sm:text-base dark:text-white text-gray-800 
        hover:bg-amber-50 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105 hover:shadow-lg 
        bg-white dark:bg-gray-700 shadow-sm border border-amber-100 dark:border-gray-600 
        active:scale-95 active:shadow-sm
        ${
          category === param ? "!bg-amber-300 dark:!bg-gray-400 shadow-md" : ""
        }`}
        aria-current={category === param ? "page" : undefined}
      >
        {title}
      </Link>
    </div>
  );
}
