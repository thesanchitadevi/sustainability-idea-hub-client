import Link from "next/link";
import Image from "next/image";
import { VoteButton } from "./VoteButton";
import { IIdea } from "@/types";
import { CategoryBadge } from "./CategoryBadge";

interface IdeaCardProps {
  idea: IIdea;
  className?: string;
  displayImageIndex?: number;
}

export function IdeaCard({
  idea,
  className = "",
  displayImageIndex = 0, // Default to first image
}: IdeaCardProps) {
  // Skip rendering if idea isn't published
  if (!idea.isPublished) return null;

  // Get the specific image to display
  const displayImage =
    idea.images?.length > 0
      ? idea.images[Math.min(displayImageIndex, idea.images.length - 1)]
      : null;

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
            sizes="(max-width: 768px) 100vw, 50vw" // Responsive image sizing
            priority={displayImageIndex === 0}
          />
        ) : (
          // Fallback when no images exist
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

      {/* Category Badge - Positioned over image */}
      <div className="absolute left-3 top-3 z-10">
        <CategoryBadge category={idea.category} />
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <h3
          id={`idea-title-${idea.id}`}
          className="mb-2 line-clamp-2 font-medium text-gray-900"
        >
          {idea.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {idea.description}
        </p>

        {/* Footer with voting and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Premium badge */}
            {idea.isPaid && (
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                Premium
              </span>
            )}
            {/* Voting component */}
            <VoteButton initialVotes={idea.votes} ideaId={idea.id} />
          </div>

          {/* View Details Link */}
          <Link
            href={`/ideas/${idea.id}`}
            className="text-sm font-medium text-green-600 hover:text-green-800 hover:underline"
            aria-label={`View details for ${idea.title}`}
          >
            View Idea →
          </Link>
        </div>
      </div>
    </article>
  );
}
