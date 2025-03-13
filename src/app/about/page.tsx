export default function About() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-2xl mx-auto p-2 text-center mt-8">
        <div>
          <h1 className="text-3xl font-semibold text-center my-3">
            About IMDB Clone
          </h1>
          <div className="text-md flex flex-col gap-6">
            <p>
              Welcome to IMDB Clone! This app is designed to provide users with
              a comprehensive database of movies, TV shows, and entertainment
              content. Our goal is to offer a seamless and enjoyable experience
              for movie enthusiasts and casual viewers alike.
            </p>

            <p>
              On IMDB Clone, you&apos;ll find detailed information about your
              favorite movies and TV shows, including plot summaries, user
              reviews, and ratings. We strive to keep our database up-to-date
              with the latest releases and trending content.
            </p>

            <p>
              This website is created using{" "}
              <a
                href="https://nextjs.org/"
                target="_blank"
                className="text-teal-500 hover:underline"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                href="https://go.clerk.com/fgJHKlt"
                target="_blank"
                className="text-teal-500 hover:underline"
              >
                Clerk
              </a>
              .
            </p>

            <p>
              We encourage you to browse the movies and shows you watch. Add
              them to your favorites and join us in celebrating the world of
              entertainment!
            </p>
            <p>
              Made by{" "}
              <a
                href="https://github.com/skarla21"
                target="_blank"
                className="text-lime-500 hover:underline"
              >
                Antonios Skarlatos
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
