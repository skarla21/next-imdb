import { AddToFavProps } from "@/lib/types/props";

export default function AddToFav({
  id,
  title,
  media_type,
  image,
  overview,
  releaseDate,
  voteCount,
}: AddToFavProps) {
  return (
    <div>
      AddToFav: {id} {title} {media_type} {overview} {image} {releaseDate}{" "}
      {voteCount}
    </div>
  );
}
