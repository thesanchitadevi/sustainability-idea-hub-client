import { IIdea } from "@/types";
import { IdeaGallery } from "./IdeaGallery";
import { format } from "date-fns";
import { ArrowBigUp, User } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { StatusBadge } from "./StatusBadge";

export function IdeaDetailsCard({ idea }: { idea: IIdea }) {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{idea.title}</h1>
            <div className="flex gap-2 mt-2">
              <CategoryBadge category={idea.category} />
              <StatusBadge status={idea.status} />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <ArrowBigUp className="h-4 w-4 text-green-600" />
            <span className="font-medium">{idea.votes} votes</span>
          </div>
        </div>
      </div>

      {/* Gallery and Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 p-6">
        <div>
          <IdeaGallery images={idea.images} />
        </div>

        <div className="space-y-6">
          {/* Problem & Solution */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Problem Statement</h3>
              <p className="text-gray-700 mt-1">{idea.problem_statement}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Proposed Solution</h3>
              <p className="text-gray-700 mt-1">{idea.proposed_solution}</p>
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Created</p>
              <p>{format(new Date(idea.createdAt), "MMM d, yyyy")}</p>
            </div>
            <div>
              <p className="text-gray-500">Updated</p>
              <p>{format(new Date(idea.updatedAt), "MMM d, yyyy")}</p>
            </div>
            <div>
              <p className="text-gray-500">Type</p>
              <p>{idea.isPaid ? "Premium" : "Free"}</p>
            </div>
            <div>
              <p className="text-gray-500">Visibility</p>
              <p>{idea.isPublished ? "Public" : "Private"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Author Info */}
      <div className="bg-gray-50 p-6 border-t">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="font-medium">Submitted by</p>
            <p className="text-sm text-gray-600">
              {idea.user_id.slice(0, 8)}... (Community Member)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
