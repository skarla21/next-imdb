import Link from "next/link";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import type { Result } from "@/lib/types/data";

export default function Card({ result }: { result: Result }) {
  const imagePath = result.backdrop_path || result.poster_path;
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/original/${imagePath}`
    : "/placeholder.jpg";

  const dateToFormat = result.release_date || result.first_air_date;
  const formattedDate = dateToFormat
    ? new Date(dateToFormat).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="group cursor-pointer w-full max-w-[400px] sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 transition-shadow duration-200 mx-2">
      <Link href={`/${result.media_type}/${result.id}`}>
        <div className="w-full aspect-[16/9] relative">
          <Image
            src={imageUrl}
            alt={result.title || "Movie image"}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            className="sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300 object-cover"
          />
        </div>
        <div className="p-2">
          <h2 className="font-bold truncate mb-2 text-sm">
            {result.title || result.name}
          </h2>
          <p className="line-clamp-3 text-sm mb-2">{result.overview}</p>
          <p className="flex items-center text-xs">
            {formattedDate}
            <AiFillStar className="h-5 mr-1 ml-3 text-yellow-500" />
            {result.vote_average?.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
}
