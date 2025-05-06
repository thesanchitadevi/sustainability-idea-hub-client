import { IIdea } from "@/types";
import { ArrowBigUp } from "lucide-react";

export function Testimonials({ ideas }: { ideas: IIdea[] }) {
  // Get top 3 most voted ideas
  const topIdeas = [...ideas].sort((a, b) => b.votes - a.votes).slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Community Testimonials
        </h2>

        {/* Description */}
        <p className="mb-6 text-gray-500 font-normal">
          Our community members share their experiences and insights on the most
          impactful ideas.
        </p>

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
                <span className="font-medium">{idea.votes} votes</span>
              </div>

              <h3 className="text-xl font-semibold mb-3">{idea.title}</h3>
              <p className="text-gray-600 mb-4">{idea.description}</p>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {idea.user_id.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-500">Community Member</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
