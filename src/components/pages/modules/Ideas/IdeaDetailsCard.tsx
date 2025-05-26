import { getVotes } from "@/lib/actions/vote.action";
import { IIdea } from "@/types";
import { format } from "date-fns";
import { User, Star, ThumbsUp, Eye } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import CommentsSection from "./CommentsSection";
import { IdeaGallery } from "./IdeaGallery";
import VoteAction from "./VoteAction";
import { getAllIdeas } from "@/lib/api/ideas/action";
import SimilarIdeasComponent from "./SimilarIdeasComponent";

// Rating Component
function RatingSection() {
  // This would typically come from your database
  const averageRating = 4.2;
  const totalRatings = 23;

  return (
    <div className="p-6 border-b bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Rate this Idea
      </h3>

      {/* Current Rating Display */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(averageRating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {averageRating.toFixed(1)} ({totalRatings} ratings)
        </span>
      </div>

      {/* Interactive Rating */}
      <div className="space-y-3">
        <p className="text-sm text-gray-700">Rate this idea:</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Similar Ideas Component
async function SimilarIdeasSection({
  currentIdeaId,
  category,
}: {
  currentIdeaId: string;
  category: string;
}) {
  // Fetch similar ideas from the database based on category
  const allSimilarIdeas = await getAllIdeas(undefined, {
    category: category,
    isPublished: true,
    sortBy: "newest",
    limit: 6, // Get more than needed to filter out current idea
  });

  // Filter out the current idea and limit to 3 suggestions
  const similarIdeas = allSimilarIdeas
    .filter((idea) => idea.id !== currentIdeaId && idea.category === category)
    .slice(0, 3)
    .map((idea) => ({
      id: idea.id,
      title: idea.title,
      category: idea.category,
      rating: 4.2, // You can add rating field to your IIdea interface or calculate from votes
      votes: 0, // You can calculate this from your votes data
      views: 0, // Add views field to your database if needed
      isPaid: idea.isPaid,
      price: idea.price,
    }));

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Similar Ideas in {category}
      </h3>

      {similarIdeas.length > 0 ? (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            {similarIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  {/* Title and Category */}
                  <div>
                    <h4 className="font-medium text-gray-800 line-clamp-2 mb-2">
                      {idea.title}
                    </h4>
                    <CategoryBadge category={idea.category} />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{idea.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{idea.votes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{idea.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex justify-between items-center">
                    {idea.isPaid ? (
                      <span className="text-sm font-medium text-purple-600">
                        ৳{idea.price || 200}
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-green-600">
                        Free
                      </span>
                    )}
                    <SimilarIdeasComponent ideaId={idea.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button - Only show if there are similar ideas */}
          <div className="text-center mt-6">
            <SimilarIdeasComponent type="viewMore" category={category} />
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            No similar ideas found in {category} category
          </p>
          <SimilarIdeasComponent type="viewMore" />
        </div>
      )}
    </div>
  );
}

export async function IdeaDetailsCard({ idea }: { idea: IIdea }) {
  const {
    title,
    category,
    isPaid,
    images,
    price = 200,
    problem_statement,
    proposed_solution,
    createdAt,
    updatedAt,
    isPublished,
    user,
  } = idea || {};

  const votes = await getVotes(idea?.id);

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

            {/* Author Info */}
            <div className="flex items-center gap-3 mt-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  by{" "}
                  <span className="font-medium text-gray-700">
                    {user?.name}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Badges in top right */}
          <div className="flex flex-wrap gap-2 items-center">
            <CategoryBadge category={category} />
            {isPaid ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-medium font-medium bg-purple-100 text-purple-800">
                Premium
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-medium font-medium bg-green-100 text-green-800">
                Free
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Gallery and Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 p-6">
        <div className="w-full">
          <IdeaGallery images={images} />
        </div>

        <div className="space-y-6">
          {/* Price Section */}
          {isPaid && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-800">Price:</span>
                <span className="text-xl font-bold text-blue-900">
                  ৳{price || 200}
                </span>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                This is a premium idea with detailed implementation guidance
              </p>
            </div>
          )}

          {/* Problem & Solution */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Problem Statement
              </h3>
              <p className="text-gray-700 mt-2 leading-relaxed">
                {problem_statement || "No problem statement provided"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Proposed Solution
              </h3>
              <p className="text-gray-700 mt-2 leading-relaxed">
                {proposed_solution || "No solution details provided"}
              </p>
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-xs">Created</p>
              <p className="font-medium">
                {format(new Date(createdAt), "MMM d, yyyy")}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-xs">Updated</p>
              <p className="font-medium">
                {format(new Date(updatedAt), "MMM d, yyyy")}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-xs">Type</p>
              <p className="font-medium">{isPaid ? "Premium" : "Free"}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-xs">Visibility</p>
              <p className="font-medium">
                {isPublished ? "Public" : "Private"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <VoteAction ideaId={idea.id} votes={votes} />
      </div>

      {/* Rating Section - Added before comments */}
      <RatingSection />

      <CommentsSection ideaId={idea?.id} />

      {/* Similar Ideas Section - Added after comments */}
      <SimilarIdeasSection currentIdeaId={idea.id} category={category} />
    </div>
  );
}
