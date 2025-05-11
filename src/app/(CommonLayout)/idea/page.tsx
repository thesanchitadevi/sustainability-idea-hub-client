import { IdeaCard } from "@/components/pages/modules/Ideas/IdeaCard";
import { getAllIdeas } from "@/lib/api/ideas/action";
import { getCurrentUser } from "@/service/auth";
import React from "react";

const IdeasPage = async () => {
  const user = await getCurrentUser();
  const ideas = await getAllIdeas(user?.id);

  console.log(ideas);

  return (
    <section>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Ideas</h1>
          <p className="text-xl  max-w-4xl mx-auto">
            Explore the innovative ideas and solutions proposed by our
            community. Each idea represents a unique perspective and potential
            for positive change.
          </p>
        </div>
      </section>
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
              <IdeaCard
                key={idea.id}
                idea={idea}
                isAuthenticated={user !== null}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default IdeasPage;
