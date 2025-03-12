import { Result } from "@/lib/types/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("query");

  if (!search) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${search}&language=en-US&page=1&include_adult=false`
    );
    const data = await res.json();
    let results: Result[] = data.results;
    results = results.filter(
      (result) => result.media_type === "movie" || result.media_type === "tv" // '/search/multi' api endpoint returns the media_type property but not only movies + shows so we filter out the rest
    );

    return NextResponse.json({ results: results });
  } catch (error) {
    return NextResponse.json({ "Failed to fetch: ": error }, { status: 500 });
  }
}
