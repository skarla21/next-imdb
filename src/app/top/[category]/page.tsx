import Results from "@/components/Results";

export default async function TopPages({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
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

  return (
    <div>
      <Results initialResults={[]} category={api_category} />
    </div>
  );
}
