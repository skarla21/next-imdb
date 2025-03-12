import { Result } from "@/lib/types/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get("type");
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const page = searchParams.get("page");

  try {
    let url = "https://api.themoviedb.org/3";

    if (type === "search") {
      url += `/search/multi?query=${query}&`;
    } else if (type === "top") {
      url += `${category}?`;
    } else if (type === "home") {
      url += "/movie/now_playing?";
    } else {
      throw new Error("Unknown request type");
    }

    url += `api_key=${
      process.env.API_KEY
    }&language=en-US&include_adult=false&page=${page || 1}`;

    const res = await fetch(url);
    const data = await res.json();
    const { total_pages } = data;
    let { results } = data;

    if (type === "search") {
      results = results.filter(
        (result: Result) =>
          result.media_type === "movie" || result.media_type === "tv" // '/search/multi' api endpoint returns the media_type property but not only movies + shows so we filter out the rest
      );
    }

    if (type === "top" && category) {
      results = results.map((result: Result) => ({
        ...result,
        media_type: category.includes("movie") ? "movie" : "tv", // forcefully inject 'media_type' in each result in case it doesn't exist
      }));
    }

    if (type === "home") {
      results = results.map((result: Result) => ({
        ...result,
        media_type: "movie", // home page will show now playing movies
      }));
    }

    return NextResponse.json({
      results,
      total_pages,
    });
  } catch (error) {
    return NextResponse.json(
      { "Failed to fetch data: ": error },
      { status: 500 }
    );
  }
}
