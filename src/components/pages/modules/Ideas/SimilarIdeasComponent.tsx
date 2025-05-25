"use client";

import { useRouter } from "next/navigation";

interface SimilarIdeasComponentProps {
  ideaId?: string;
  type?: "viewDetails" | "viewMore";
  category?: string;
}

export default function SimilarIdeasComponent({
  ideaId,
  type = "viewDetails",
  category,
}: SimilarIdeasComponentProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    if (ideaId) {
      router.push(`/idea/${ideaId}`);
    }
  };

  const handleViewMore = () => {
    const params = new URLSearchParams();
    if (category) {
      params.append("category", category);
    }
    router.push(`/idea?${params.toString()}`);
  };

  if (type === "viewMore") {
    return (
      <button
        onClick={handleViewMore}
        className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        View More Similar Ideas
      </button>
    );
  }

  return (
    <button
      onClick={handleViewDetails}
      className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
    >
      View Details →
    </button>
  );
}
