"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { Result } from "@/lib/types/data";
import Card from "./Card";
import EmptyPage from "./EmptyPage";

export default function Results({
  initialResults,
  type,
  searchTerm,
  category,
}: {
  initialResults: Result[];
  type?: string; //if type is favorites, they are imported from initialResults, no further loading
  searchTerm?: string;
  category?: string;
}) {
  const [results, setResults] = useState<Result[]>(initialResults);
  const page = useRef<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(
    type === "favorites" ? false : true
  );
  const { ref, inView } = useInView();

  const loadMoreResults = useCallback(async () => {
    try {
      const nextPage = page.current + 1;
      let apiUrl = "";

      if (searchTerm) {
        apiUrl = `/api/tmdb?type=search&query=${encodeURIComponent(
          searchTerm
        )}&page=${nextPage}`;
      } else if (category) {
        apiUrl = `/api/tmdb?type=top&category=${category}&page=${nextPage}`;
      } else {
        apiUrl = `/api/tmdb?type=home&page=${nextPage}`; //home page
      }

      setIsLoading(true);
      const response = await fetch(apiUrl);
      const { results: newResults, total_pages } = await response.json();

      if (newResults) {
        setResults((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const filteredResults = newResults.filter(
            (r: { id: number }) => !existingIds.has(r.id)
          );
          return [...prev, ...filteredResults];
        });
        setHasMore(nextPage < total_pages);
        page.current = nextPage;
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more results: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [category, page, searchTerm]);

  useEffect(() => {
    async function fetchData() {
      if (inView && hasMore && (!type || type !== "favorites")) {
        await loadMoreResults();
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loadMoreResults, type, searchTerm]);

  return (
    <>
      {!isLoading && results.length === 0 ? (
        <EmptyPage
          primaryText="Oh no..."
          secondaryText="No results found matching your search :("
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center max-w-screen-2xl mx-auto py-4 px-4 gap-4">
          {results.map((result) => (
            <Card key={result.id} result={result} />
          ))}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400" />
        </div>
      )}

      {/* Loading trigger for infinite scroll */}
      {(!type || type !== "favorites") && hasMore && (
        <div ref={ref} className="w-full flex justify-center py-8" />
      )}
    </>
  );
}
