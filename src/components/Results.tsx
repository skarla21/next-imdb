import Card from "./Card";
import type { ResultsProps } from "@/lib/types/props";

export default function Results({ results }: ResultsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center max-w-screen-2xl mx-auto py-4 px-4 gap-4">
      {results.map((result) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  );
}
