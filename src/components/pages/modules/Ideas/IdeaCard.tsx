"use client";
import Link from "next/link";
import Image from "next/image";
import { VoteButton } from "./VoteButton";
import { IIdea } from "@/types";
import { CategoryBadge } from "./CategoryBadge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IdeaCardProps {
  idea: IIdea;
  className?: string;
  displayImageIndex?: number;
}

export function IdeaCard({
  idea,
  className = "",
  displayImageIndex = 0,
}: IdeaCardProps) {
  const router = useRouter();

  if (!idea.isPublished) return null;

  const displayImage =
    idea.images?.length > 0
      ? idea.images[Math.min(displayImageIndex, idea.images.length - 1)]
      : null;

  const handleViewIdea = (e: React.MouseEvent) => {
    if (idea.isPaid) {
      e.preventDefault();
      if (status !== "authenticated") {
        router.push(`/auth/signin?callbackUrl=/idea/${idea.id}`);
      } else {
        router.push(`/idea/${idea.id}/purchase`);
      }
    }
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md ${className}`}
      aria-labelledby={`idea-title-${idea.id}`}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {displayImage ? (
          <Image
            src={displayImage.imageUrl}
            alt={`${idea.title} featured image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={displayImageIndex === 0}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-lg font-medium text-gray-500">
              {idea.title}
            </span>
          </div>
        )}

        {/* Image counter badge */}
        {idea.images?.length > 1 && (
          <div className="absolute right-3 top-3 z-10 bg-black/80 text-white text-xs px-2 py-1 rounded-full">
            {displayImageIndex + 1}/{idea.images.length}
          </div>
        )}
      </div>

      {/* Category Badge */}
      <div className="absolute left-3 top-3 z-10">
        <CategoryBadge category={idea.category} />
      </div>

      {/* Premium Ribbon */}
      {idea.isPaid && (
        <div className="absolute right-0 top-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 transform translate-x-2 translate-y-2 rotate-45 origin-top-right">
          Premium
        </div>
      )}

      {/* Card Content */}
      <div className="p-5">
        <h3
          id={`idea-title-${idea.id}`}
          className="mb-2 line-clamp-2 font-medium text-gray-900"
        >
          {idea.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {idea.description}
        </p>

        {/* Hardcoded Price Display for Paid Ideas */}
        {idea.isPaid && (
          <div className="mb-4">
            <span className="text-lg font-bold text-green-600">200 TK</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VoteButton initialVotes={idea.votes} ideaId={idea.id} />
          </div>

          {idea.isPaid ? (
            <Button
              onClick={handleViewIdea}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              {status === "authenticated"
                ? "Purchase (200 TK)"
                : "Login to View"}
            </Button>
          ) : (
            <Link
              href={`/idea/${idea.id}`}
              className="text-sm font-medium text-green-600 hover:text-green-800 hover:underline"
              aria-label={`View details for ${idea.title}`}
            >
              View Idea →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
