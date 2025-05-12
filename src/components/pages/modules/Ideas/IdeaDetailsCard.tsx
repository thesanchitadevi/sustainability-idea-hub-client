import { getVotes } from "@/lib/actions/vote.action";
import { IIdea } from "@/types";
import { format } from "date-fns";
import { User } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import CommentsSection from "./CommentsSection";
import { IdeaGallery } from "./IdeaGallery";
import { StatusBadge } from "./StatusBadge";
import VoteAction from "./VoteAction";

export async function IdeaDetailsCard({ idea }: { idea: IIdea }) {
  const {
    title,
    category,
    status,
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
          <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <div className="flex flex-wrap gap-2 mt-3 items-center">
              <CategoryBadge category={category} />
              <StatusBadge status={status} />
              {isPaid && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Premium Idea
                </span>
              )}
            </div>
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

      {/* Footer with Author Info */}
      <div className="bg-gray-50 p-6 border-t">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="font-medium text-gray-700">Submitted by</p>
            <p className="text-sm text-gray-600">{user?.name}</p>
          </div>
        </div>
      </div>
      <CommentsSection ideaId={idea?.id} />
    </div>
  );
}
