"use client";
import Results from "@/components/Results";
import EmptyPage from "@/components/EmptyPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Favorite } from "@/lib/types/user";

export default function Favorites() {
  const [favs, setFavs] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (isMounted) setIsLoading(true);

        const res = await fetch("/api/user/getFav");
        if (res.ok && isMounted) {
          const data = await res.json();
          setFavs(data.favs);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!isLoaded) return; //wait for Clerk to load
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen p-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <>
          {favs.length === 0 ? (
            <EmptyPage
              primaryText={"No Favorites Yet"}
              secondaryText={
                "It looks like you haven't added any movies or shows to your favorites yet. Start exploring and add some titles you love!"
              }
            />
          ) : (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">
                Your Favorites ({favs.length})
              </h1>
              <Results
                initialResults={favs.map((fav) => ({
                  ...fav,
                  media_type: fav.mediaType, //ensure consistent naming
                  backdrop_path: fav.image,
                  release_date: fav.releaseDate,
                  vote_average: fav.voteAverage,
                }))}
                type="favorites"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
