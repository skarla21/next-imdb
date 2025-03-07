import Link from "next/link";
import Image from "next/image";
import AddToFav from "@/components/AddToFav";
import { Result } from "@/lib/types/data";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: movieId } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  const movie: Result = await res.json();

  const imagePath = movie.backdrop_path || movie.poster_path;
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
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="text-lg mb-3">{movie.overview}</p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_count}
          </p>
          <AddToFav
            movieId={movieId}
            title={movie.title || movie.name}
            image={movie.backdrop_path || movie.poster_path}
            overview={movie.overview}
            releaseDate={movie.release_date || movie.first_air_date}
            voteCount={movie.vote_count}
          />
        </div>
      </div>
    </div>
  );
}
