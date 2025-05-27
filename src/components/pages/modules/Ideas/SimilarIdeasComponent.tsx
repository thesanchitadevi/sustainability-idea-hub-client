"use client";

import { useRouter } from "next/navigation";

interface SimilarIdeasComponentProps {
  ideaId?: string;
  type?: "viewDetails" | "viewMore";
  category?: string;
}

export default function SimilarIdeasComponent({
  ideaId,
}: SimilarIdeasComponentProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    if (ideaId) {
      router.push(`/idea/${ideaId}`);
    }
  };

  return (
    <button
      onClick={handleViewDetails}
      className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
    >
      View Details →
    </button>
  );
}
