import Results from "@/components/Results";
import { Result } from "@/lib/types/data";

export default async function Home() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  let results = data.results;
  results = results.map((result: Result) => ({
    ...result,
    media_type: "movie", // home page will show now playing movies
  }));

  return (
    <div>
      <Results results={results} />
    </div>
  );
}
