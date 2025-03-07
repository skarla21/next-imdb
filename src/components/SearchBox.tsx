"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      router.push(`/search/${search}`);
    }
  };

  return (
    <form
      className="flex justify-center px-4 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search movies and shows..."
          className="w-full h-12 pl-6 pr-14 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:ring-2 
                focus:ring-amber-200 focus:ring-opacity-50 transition-all duration-200 outline-none shadow-sm hover:shadow-md focus:shadow-lg 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          disabled={!search}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-400 rounded-full hover:bg-amber-500 disabled:bg-gray-300
                    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
