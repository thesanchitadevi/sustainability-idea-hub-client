"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser } from "@/service/auth";
import { getAllIdeas } from "@/lib/api/ideas/action";
import ViewModal from "@/components/pages/modules/Ideas/Dashboard/ViewModal";
import { Skeleton } from "@/components/ui/skeleton";
import { IIdea } from "@/types";
import { IdeaTable } from "@/components/pages/modules/Ideas/Dashboard/IdeaTable";
import Pagination from "@/components/Common/Pagination";

export default function MemberIdeasPage() {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState<IIdea | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const openModal = (idea: IIdea) => {
    setSelectedIdea(idea);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIdea(null);
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const user = await getCurrentUser();

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
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">My Submitted Ideas</h1>

      <IdeaTable data={ideas} onView={openModal} />
      <Pagination totalPage={currentPage} />

      {selectedIdea && (
        <ViewModal
          idea={selectedIdea}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
