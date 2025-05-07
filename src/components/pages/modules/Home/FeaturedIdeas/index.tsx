import { Button } from "@/components/ui/button";
import { IdeaCard } from "../../Ideas/IdeaCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedIdeas } from "@/lib/api/ideas/action";

export async function FeaturedIdeas() {
  const ideas = await getFeaturedIdeas();
  console.log("Featured Ideas API Response:", ideas);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with View All button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-green-900">Featured Ideas</h2>

          <Button
            asChild
            variant="link"
            className="group text-green-600 hover:text-green-800"
          >
            <Link href="/ideas">
              View All
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Description */}
        <p className="mb-6 text-gray-500 font-normal">
          These featured ideas have been selected for their potential impact and
          creativity. Join the conversation and vote for your favorites!
        </p>

        {/* No Ideas Message */}
        {ideas.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No featured ideas available at the moment.</p>
          </div>
        )}

        {/* Idea Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </section>
  );
}
