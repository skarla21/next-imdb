import Link from "next/link";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import type { CardProps } from "@/lib/types/props";

export default function Card({ result }: CardProps) {
  const imagePath = result.backdrop_path || result.poster_path;
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/original/${imagePath}`
    : "/placeholder.jpg";

  return (
    <div className="group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200">
      <Link href={`/${result.media_type}/${result.id}`}>
        <div className="w-full h-24 sm:h-36 relative">
          <Image
            src={imageUrl}
            alt={"/placeholder.jpg"}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
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
            {result.release_date || result.first_air_date}
            <FiThumbsUp className="h-5 mr-1 ml-3" />
            {result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  );
}
