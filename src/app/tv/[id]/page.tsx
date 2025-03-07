import Link from "next/link";
import Image from "next/image";
import AddToFav from "@/components/AddToFav";
import { Result } from "@/lib/types/data";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: tvId } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=${process.env.API_KEY}`
  );
  const tv: Result = await res.json();

  const imagePath = tv.backdrop_path || tv.poster_path;
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/original/${imagePath}`
    : "/placeholder.jpg";

  if (!res.ok) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl my-5">
          Movie details are not available at the moment!
        </h1>
        <p>
          <Link href={"/"} className="hover:text-amber-600">
            Go Home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <div className="w-full aspect-video relative">
          <Image
            src={imageUrl}
            alt={"/placeholder.jpg"}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            className="sm:rounded-t-lg object-contain"
          />
        </div>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">{tv.title || tv.name}</h2>
          <p className="text-lg mb-3">{tv.overview}</p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Type:</span>
            TV Show
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {tv.release_date || tv.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {tv.vote_count}
          </p>
          <AddToFav
            id={tvId}
            title={tv.title || tv.name}
            media_type="tv"
            image={tv.backdrop_path || tv.poster_path}
            overview={tv.overview}
            releaseDate={tv.release_date || tv.first_air_date}
            voteCount={tv.vote_count}
          />
        </div>
      </div>
    </div>
  );
}
