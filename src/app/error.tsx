"use client";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center mt-10 space-y-4">
      <h1 className="text-xl font-bold text-red-500">
        Oops! Something went wrong
      </h1>
      <p className="max-w-md mx-auto">{error.message}</p>
      <button
        className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 text-sm font-medium"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
