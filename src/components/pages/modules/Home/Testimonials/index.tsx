"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllIdeas } from "@/lib/api/ideas/action";
import { IIdea } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Quote, ThumbsUp, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardSkeletonGrid } from "../../Ideas/Skeleton";

export function Testimonials() {
  const [topIdeas, setTopIdeas] = useState<IIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [activeTab, setActiveTab] = useState("mostVoted");

  useEffect(() => {
    const fetchTopIdeas = async () => {
      try {
        setIsLoading(true);
        const ideas = await getAllIdeas("public", {
          isPublished: true,
          sortBy: "newest",
        });

        // Get top 3 most voted ideas
        const topVoted = [...ideas]
          .sort(
            (a, b) =>
              b.votes?.filter((vote) => vote.vote_type === "UP_VOTE").length -
              a.votes?.filter((vote) => vote.vote_type === "UP_VOTE").length
          )
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

  // Helper function to get initials from user ID
  const getInitials = (userId: string) => {
    return userId?.slice(0, 2).toUpperCase() || "CM";
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Helper function to get random testimonial text based on idea
  const getTestimonialText = (idea: IIdea) => {
    const testimonials = [
      `This idea could truly transform how we approach sustainability in Bangladesh. ${truncateText(
        idea.description,
        80
      )}`,
      `I strongly support this initiative as it addresses critical environmental challenges we face today. ${truncateText(
        idea.description,
        60
      )}`,
      `As a community member, I'm impressed by the innovative thinking behind this idea. ${truncateText(
        idea.description,
        70
      )}`,
    ];

    // Use a deterministic selection based on idea ID
    const index = idea.id.charCodeAt(0) % testimonials.length;
    return testimonials[index];
  };

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center p-8 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-600 flex items-center">
              <span className="i-lucide-alert-circle mr-2" />
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-3 bg-green-50 border-green-200 text-green-700 px-3 py-1"
          >
            Community Voices
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Community Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our community members about the most impactful ideas
            shaping a sustainable future
          </p>
        </div>

        {isLoading ? (
          <CardSkeletonGrid count={3} />
        ) : topIdeas.length > 0 ? (
          <Tabs defaultValue="mostVoted" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100">
                <TabsTrigger
                  value="mostVoted"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Most Voted Ideas
                </TabsTrigger>
                <TabsTrigger
                  value="testimonials"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Testimonials
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="mostVoted" className="mt-0">
              <div className="grid gap-8 md:grid-cols-3">
                {topIdeas.map((idea) => (
                  <Card
                    key={idea.id}
                    className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-gray-100"
                  >
                    <CardHeader className="bg-green-50 border-b border-green-100 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="outline"
                          className="bg-white border-green-200 text-green-700 flex items-center gap-1"
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>
                            {idea.votes?.filter(
                              (vote) => vote.vote_type === "UP_VOTE"
                            ).length || 0}{" "}
                            votes
                          </span>
                        </Badge>
                        {idea.category && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 border-none"
                          >
                            {idea.category}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2 text-xl font-bold text-green-900">
                        {idea.title}
                      </CardTitle>
                      <CardDescription className="flex items-center text-xs text-gray-500 mt-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        {idea.createdAt
                          ? formatDistanceToNow(new Date(idea.createdAt), {
                              addSuffix: true,
                            })
                          : "Recently"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-600 line-clamp-3">
                        {idea.description}
                      </p>

                      {/* {idea.tags && idea.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {idea.tags.slice(0, 3).map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-gray-50"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )} */}
                    </CardContent>
                    <CardFooter className="border-t border-gray-100 pt-4 pb-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-green-100 text-green-800">
                          <AvatarFallback>
                            {getInitials(idea.user_id || "")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">
                          Community Member
                        </span>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/idea/${idea.id}`}>View Idea</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="mt-0">
              <div className="grid gap-8 md:grid-cols-3">
                {topIdeas.map((idea) => (
                  <Card
                    key={idea.id}
                    className="overflow-hidden transition-all hover:shadow-lg border-2 border-gray-100"
                  >
                    <CardHeader className="pb-2 relative">
                      <Quote className="absolute top-4 left-4 h-12 w-12 text-green-100 opacity-60" />
                      <div className="ml-10">
                        <CardTitle className="text-lg font-semibold text-green-900">
                          {truncateText(idea.title, 50)}
                        </CardTitle>
                        <CardDescription className="flex items-center text-xs text-gray-500 mt-1">
                          <User className="h-3 w-3 mr-1" />
                          Community Testimonial
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-600 italic">
                        {getTestimonialText(idea)}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t border-gray-100 pt-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-green-100 text-green-800">
                          <AvatarFallback>
                            {getInitials(idea.user_id || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            Community Member
                          </span>
                          <span className="text-xs text-gray-500">
                            Sustainability Enthusiast
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-green-50 text-green-700 border-green-200 flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {idea.votes?.filter(
                          (vote) => vote.vote_type === "UP_VOTE"
                        ).length || 0}
                      </Badge>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center p-10 bg-gray-50 rounded-xl border border-gray-200">
            <Quote className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No testimonials yet
            </h3>
            <p className="text-gray-500">
              Be the first to contribute an idea and share your experience with
              our community
            </p>
            <Button className="mt-6 bg-green-600 hover:bg-green-700">
              <Link href="/ideas/submit">Submit an Idea</Link>
            </Button>
          </div>
        )}

        {!isLoading && topIdeas.length > 0 && (
          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Link href="/idea">
                Browse All Ideas
                <span className="i-lucide-arrow-right ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
