import Results from "@/components/Results";
import { Result } from "@/lib/types/data";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ searchTerm: string }>;
}) {
  const { searchTerm } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );
  const data = await res.json();
  let results: Result[] = data.results;
  results = results.filter(
    (result) => result.media_type === "movie" || result.media_type === "tv" // '/search/multi' api endpoint returns the media_type property but not only movies + shows so we filter out the rest
  );

  return (
    <div>
      {(!results || results.length === 0) && (
        <h1 className="text-center pt-6">No results found</h1>
      )}
      {results && results.length !== 0 && <Results results={results} />}
    </div>
  );
}
