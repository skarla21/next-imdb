"use client";
import Results from "@/components/Results";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Favorite } from "@/lib/types/user";

export default function Favorites() {
  const [favs, setFavs] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/user/getFav", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setFavs(data.favs);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded && isSignedIn && user) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <>
          {favs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] text-center">
              <div className="max-w-md space-y-4">
                <div className="text-6xl">🎬</div>
                <h1 className="text-2xl font-bold">No Favorites Yet</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  It looks like you haven&apos;t added any movies or shows to
                  your favorites yet. Start exploring and add some titles you
                  love!
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200"
                >
                  Explore Titles
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">
                Your Favorites ({favs.length})
              </h1>
              <Results
                results={favs.map((fav) => ({
                  id: fav.id,
                  title: fav.title,
                  media_type: fav.mediaType,
                  backdrop_path: fav.image,
                  overview: fav.overview,
                  first_air_date: fav.releaseDate,
                  vote_average: fav.voteAverage,
                }))}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
