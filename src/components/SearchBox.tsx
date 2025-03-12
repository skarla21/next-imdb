"use client";
import Link from "next/link";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import CompactCard from "@/components/CompactCard";
import { Result } from "@/lib/types/data";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  //debounce fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!search) {
        setSuggestions([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `/api/search-suggestions?query=${encodeURIComponent(search)}`
        );
        const data = await res.json();

        if (res.ok) {
          setSuggestions(data.results);
        } else {
          throw new Error(data.error || "Failed to fetch");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch");
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  //click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      router.push(`/search/${search}`);
      setIsFocused(false);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      {isFocused && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />
      )}

      <form
        ref={formRef}
        className="flex justify-center px-4 max-w-2xl mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full z-50">
          <input
            type="text"
            placeholder="Search movies and shows..."
            className="w-full h-12 pl-6 pr-14 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:ring-2 
                      focus:ring-amber-200 focus:ring-opacity-50 transition-all duration-200 outline-none shadow-sm hover:shadow-md focus:shadow-lg 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
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

          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : error ? (
                <div className="p-4 text-red-500 text-sm">{error}</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((result) => (
                  <Link
                    key={result.id}
                    href={`/${result.media_type}/${result.id}`}
                    className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b dark:border-gray-700 last:border-b-0"
                    onClick={() => {
                      setIsFocused(false);
                      setSearch("");
                    }}
                  >
                    <CompactCard result={result} />
                  </Link>
                ))
              ) : (
                search && (
                  <div className="p-4 text-gray-500 text-sm">
                    No suggestions found
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
