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
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        {/* Image Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl aspect-video relative group flex justify-center">
            <Image
              src={imageUrl}
              alt="placeholder.jpg"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              blurDataURL="/placeholder.jpg"
              className="rounded-lg object-contain"
              quality={100}
              priority
            />
          </div>
        </div>

        {/* Details Container */}
        <div className="px-4 md:px-6 py-4 space-y-6 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            {movie.title || movie.name}
          </h1>

          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {movie.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-2">
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  Type:{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    Movie
                  </span>
                </p>
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  Released:{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    {movie.release_date || movie.first_air_date}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  Rating:{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    {movie.vote_count} votes
                  </span>
                </p>
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  Score:{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <AddToFav
                id={movieId}
                title={movie.title || movie.name}
                mediaType="movie"
                image={movie.backdrop_path || movie.poster_path}
                overview={movie.overview}
                releaseDate={movie.release_date || movie.first_air_date}
                voteAverage={movie.vote_average}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
