import { IdeaCard } from "@/components/pages/modules/Ideas/IdeaCard";
import { getAllIdeas } from "@/lib/api/ideas/action";
import React from "react";

const IdeasPage = async () => {
  const ideas = await getAllIdeas();
  // Add this for debugging
  console.log("API Response:", ideas);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* No Ideas Message */}
        {ideas.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No ideas available at the moment.</p>
          </div>
        )}

        {/* Idea Cards Grid */}
        {ideas.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default IdeasPage;
