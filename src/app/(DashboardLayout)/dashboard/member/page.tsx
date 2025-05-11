"use client";
import React, { useEffect, useState } from "react";
import { Lightbulb, FileEdit, Clock, Check, X, ThumbsUp } from "lucide-react";
import { getCurrentUser } from "@/service/auth";
import { getAllIdeas } from "@/lib/api/ideas/action";
import { useRouter } from "next/navigation";
import { IIdea } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const MemberDashboard = () => {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const user = await getCurrentUser();

        console.log("user", user);

        if (!user) {
          router.push("/login");
          return;
        }

        const userIdeas = await getAllIdeas(user.id, {
          sortBy: "newest",
        });

        const filteredIdeas = userIdeas.filter((idea) => {
          return idea.user_id === user.id;
        });

        console.log("filteredIdeas", filteredIdeas);

        setIdeas(filteredIdeas);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, [router]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700"
            >
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {/* Total Ideas Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Ideas
              </p>
              <h3 className="text-2xl font-bold mt-1">{ideas.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Drafts Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Drafts
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas.filter((idea) => idea.status === "DRAFT").length}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50">
              <FileEdit className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        {/* Under Review Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Under Review
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas.filter((idea) => idea.status === "UNDER_REVIEW").length}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Approved Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Approved
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas.filter((idea) => idea.status === "APPROVED").length}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Rejected
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas.filter((idea) => idea.status === "REJECT").length}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50">
              <X className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Total Upvotes Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Upvotes
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas?.reduce(
                  (total, idea) => total + (Number(idea.votes) || 0),
                  0
                ) || 0}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <ThumbsUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
