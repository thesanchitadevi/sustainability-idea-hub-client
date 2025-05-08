"use client";
import { Button } from "@/components/ui/button";
import { IdeaCard } from "../../Ideas/IdeaCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedIdeas } from "@/lib/api/ideas/action";
import { useEffect, useState } from "react";
import { IIdea } from "@/types";

export function FeaturedIdeas() {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedIdeas = async () => {
      try {
        setIsLoading(true);
        const data = await getFeaturedIdeas();
        setIdeas(data);
      } catch (err) {
        console.error("Failed to fetch featured ideas:", err);
        setError("Failed to load featured ideas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedIdeas();
  }, []);

  if (error) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with View All button */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-green-900">
              Featured Ideas
            </h2>
            <Button
              asChild
              variant="link"
              className="group text-green-600 hover:text-green-800"
            >
              <Link href="/idea">
                View All
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Description */}
          <p className="mb-6 text-gray-500 font-normal">
            These featured ideas have been selected for their potential impact
            and creativity. Join the conversation and vote for your favorites!
          </p>
        </div>

        {/* Idea Cards Grid */}

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="animate-pulse space-y-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No featured ideas available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
