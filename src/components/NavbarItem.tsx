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
        className={`hover:text-amber-600 font-semibold ${
          category === param
            ? "underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg"
            : ""
        }`}
        href={`/top/${param}`}
      >
        {title}
      </Link>
    </div>
  );
}
