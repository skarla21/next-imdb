"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { Favorite } from "@/lib/types/user";

export default function AddToFav({
  id,
  title,
  mediaType,
  image,
  overview,
  releaseDate,
  voteAverage,
}: Favorite) {
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkFavStatus = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          // always fetch fresh data from API
          const res = await fetch("/api/user/getFav");
          if (res.ok) {
            const { favs } = await res.json();
            setIsFav(favs.some((fav: { id: number }) => fav.id === Number(id)));
          }
        } catch (error) {
          console.error("Error checking favorites:", error);
        }
      }
    };
    checkFavStatus();
  }, [id, isLoaded, isSignedIn, user]);

  const handleFavClick = async () => {
    setIsLoading(true);
    if (!isSignedIn) {
      setIsLoading(false);
      router.push("/sign-in");
      return;
    }
    try {
      const res = await fetch("/api/user/fav", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          mediaType,
          overview,
          releaseDate,
          voteAverage,
          image,
        }),
      });

      if (res.ok) {
        await user?.reload(); // state will update automatically through useEffect
      } else {
        console.error("Failed to update favorites");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleFavClick}
        className={`p-2 rounded transition duration-200 transform ${
          isFav
            ? "bg-red-300 dark:bg-red-600 hover:bg-red-400 dark:hover:bg-red-700"
            : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700"
        } ${!isLoading && "hover:scale-105 hover:shadow-lg"}`}
        disabled={isLoading}
      >
        {isLoading
          ? "Loading..."
          : isFav
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </button>
    </div>
  );
}
