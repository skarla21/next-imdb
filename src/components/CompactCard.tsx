import Image from "next/image";
import { Result } from "@/lib/types/data";

export default function CompactCard({ result }: { result: Result }) {
  const imagePath = result.poster_path || result.backdrop_path;
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/w92/${imagePath}`
    : "/placeholder.jpg";

  const title = result.title || result.name || "Untitled";
  const date = result.release_date || result.first_air_date;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={result.title || "Movie image"}
          fill
          sizes="64px"
          className="rounded object-cover"
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate text-sm">{title}</h3>
        {date && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(date).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
}
