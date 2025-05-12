"use client";
import { getAllIdeas } from "@/lib/api/ideas/action";
import { IIdea } from "@/types";
import { ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";
import { CardSkeletonGrid } from "../../Ideas/Skeleton";

export function Testimonials() {
  const [topIdeas, setTopIdeas] = useState<IIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopIdeas = async () => {
      try {
        setIsLoading(true);
        const ideas = await getAllIdeas("public", {
          isPublished: true,
          sortBy: "newest",
        });

        // Get top 3 most voted ideas from all published ideas
        const topVoted = [...ideas]
          .sort((a, b) => (b.votes?.UP_VOTE || 0) - (a.votes?.UP_VOTE || 0))
          .slice(0, 3);

        setTopIdeas(topVoted);
      } catch (err) {
        console.error("Failed to fetch ideas:", err);
        setError("Failed to load testimonials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopIdeas();
  }, []);

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Community Testimonials
          </h2>

          {/* Description */}
          <p className="mb-6 text-gray-500 font-normal">
            Our community members share their experiences and insights on the
            most impactful ideas.
          </p>
        </div>

        {/* Loading State */}

        {isLoading ? (
          <CardSkeletonGrid count={4} />
        ) : topIdeas.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {topIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ArrowBigUp className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium">
                    {idea?.votes?.UP_VOTE || 0} votes
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{idea.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {idea.description}
                </p>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {idea.user_id?.slice(0, 2).toUpperCase() || "CM"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Community Member
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No testimonials available</p>
          </div>
        )}
      </div>
    </section>
  );
}
