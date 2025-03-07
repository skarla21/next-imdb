interface PageProps {
  movieId: number;
  title: string | undefined;
  image: string | undefined;
  overview: string;
  releaseDate: string | undefined;
  voteCount: number | undefined;
}

export default function AddToFav({
  movieId,
  title,
  image,
  overview,
  releaseDate,
  voteCount,
}: PageProps) {
  return (
    <div>
      AddToFav: {movieId} {title} {overview} {image} {releaseDate} {voteCount}
    </div>
  );
}
