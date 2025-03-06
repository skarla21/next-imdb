import Results from "@/components/Results";

export default async function TopPages({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const { category } = resolvedParams;
  let api_category: string;
  switch (category) {
    case "rated_movies":
      api_category = "/movie/top_rated";
      break;
    case "rated_shows":
      api_category = "/tv/top_rated";
      break;
    case "trending_movies":
      api_category = "/trending/movie/week";
      break;
    case "trending_shows":
      api_category = "/trending/tv/week";
      break;
    default:
      throw new Error(`Invalid category: ${category}`);
  }

  const res = await fetch(
    `https://api.themoviedb.org/3${api_category}?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  );
}
