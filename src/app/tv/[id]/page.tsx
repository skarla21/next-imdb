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
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        {/* Image Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl aspect-video relative group">
            <Image
              src={imageUrl}
              alt="placeholder.jpg"
              fill
              sizes="(max-width: 640px) 100vw, 80vw"
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
              className="rounded-lg object-cover shadow-xl ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-2xl"
            />
          </div>
        </div>

        {/* Details Container */}
        <div className="px-4 md:px-6 py-4 space-y-6 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            {tv.title || tv.name}
          </h1>

          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {tv.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-2">
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  Type:{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    TV Show
                  </span>
                </p>
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  Released:{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    {tv.release_date || tv.first_air_date}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  Rating:{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    {tv.vote_count} votes
                  </span>
                </p>
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  Score:{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    {tv.vote_average?.toFixed(1)}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
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
      </div>
    </div>
  );
}
