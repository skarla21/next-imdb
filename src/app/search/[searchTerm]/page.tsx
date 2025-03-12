import Results from "@/components/Results";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ searchTerm: string }>;
}) {
  const { searchTerm } = await params;

  return (
    <div>
      <Results searchTerm={searchTerm} initialResults={[]} />
    </div>
  );
}
