"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IIdea } from "@/types";
import { CategoryBadge } from "./CategoryBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface IdeaCardProps {
  idea: IIdea;
  className?: string;
  displayImageIndex?: number;
  isAuthenticated?: boolean;
}

export function IdeaCard({
  idea,
  className = "",
  displayImageIndex = 0,
  isAuthenticated = false,
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
      if (!isAuthenticated) {
        router.push(`/login?callbackUrl=/idea/${idea.id}`);
      } else {
        router.push(`/idea/${idea.id}/purchase`);
      }
    }
  };

  // Separate upvotes and downvotes display
  const upvotes = idea.votes?.UP_VOTE || 0;
  const downvotes = idea.votes?.DOWN_VOTE || 0;

  return (
    <Card
      className={`group relative h-full flex flex-col overflow-hidden transition-shadow hover:shadow-md ${className}`}
      aria-labelledby={`idea-title-${idea.id}`}
    >
      {/* Image Section - No padding */}
      <div className="relative aspect-[4/3] w-full">
        {displayImage ? (
          <Image
            src={displayImage.imageUrl}
            alt={`${idea.title} featured image`}
            fill
            className="object-cover"
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
          <Badge className="absolute right-2 top-2 bg-black/80 text-white hover:bg-black/90 text-xs">
            {displayImageIndex + 1}/{idea.images.length}
          </Badge>
        )}

        {/* Category Badge */}
        <div className="absolute left-2 top-2">
          <CategoryBadge category={idea.category} />
        </div>

        {/* Premium Ribbon - Fixed positioning */}
        {idea.isPaid && (
          <div className="absolute right-0 top-0 bg-yellow-500 text-white text-xs font-bold px-8 py-0.5 transform translate-x-6 -translate-y-1 rotate-45 origin-top-right shadow-sm z-10">
            Premium
          </div>
        )}
      </div>

      {/* Content Section - Tight padding */}
      <CardHeader className="px-3 pt-3 pb-2">
        <CardTitle
          className="line-clamp-2 text-lg leading-tight"
          id={`idea-title-${idea.id}`}
        >
          {idea.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm mt-1">
          {idea.description}
        </CardDescription>
      </CardHeader>

      {/* Price Section - Only shown for paid ideas */}
      {idea.isPaid && (
        <CardContent className="px-3 py-0">
          <div className="flex items-center justify-between border-t pt-2">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-green-600">200 TK</span>
              <Badge variant="secondary" className="text-green-600">
                Premium Content
              </Badge>
            </div>
          </div>
        </CardContent>
      )}

      {/* Footer - Tight padding */}
      <CardFooter className="px-3 pb-3 pt-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <ThumbsUp size={16} className="text-blue-500" />
              <span className="text-sm font-medium">{upvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsDown size={16} className="text-red-500" />
              <span className="text-sm font-medium">{downvotes}</span>
            </div>
          </div>

          {idea.isPaid ? (
            <Button
              onClick={handleViewIdea}
              size="sm"
              className="h-8 px-3 bg-green-600 hover:bg-green-700"
            >
              {isAuthenticated ? "Purchase" : "Login"}
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="h-8 px-3">
              <Link
                href={`/idea/${idea.id}`}
                aria-label={`View details for ${idea.title}`}
              >
                View
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
