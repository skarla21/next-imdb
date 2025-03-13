"use client";
import { useRouter } from "next/navigation";

export default function EmptyPage({
  primaryText,
  secondaryText,
}: {
  primaryText: string;
  secondaryText: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center mt-32 h-[calc(100vh-160px)] text-center">
      <div className="max-w-md space-y-4">
        <div className="text-6xl">🎬</div>
        <h1 className="text-2xl font-bold">{primaryText}</h1>
        <p className="text-gray-600 dark:text-gray-400">{secondaryText}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200"
        >
          Explore Titles
        </button>
      </div>
    </div>
  );
}
