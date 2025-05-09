"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IdeaStatus, IIdea } from "@/types";
import { getCurrentUser } from "@/service/auth";
import { getAllIdeas } from "@/lib/api/ideas/action";
import { Edit, EyeIcon, Trash } from "lucide-react";
import ViewModal from "@/components/pages/modules/Ideas/ViewModal";

export default function MemberIdeasPage() {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState<IIdea | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
        console.log("user", user);

        if (!user) {
          router.push("/login");
          return;
        }

        // Only get ideas for this specific user
        const userIdeas = await getAllIdeas(user.id, {
          sortBy: "newest",
        });

        // Additional client-side filtering as a safeguard
        const filteredIdeas = userIdeas.filter((idea) => {
          console.log("idea.user_id", idea.user_id, "user.id", user.id);

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
      <div className="container mx-auto p-4">
        <div className="animate-pulse mb-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border text-left">Title</th>
                <th className="py-3 px-4 border text-left">Status</th>
                <th className="py-3 px-4 border text-left">Category</th>
                <th className="py-3 px-4 border text-left">Date</th>
                <th className="py-3 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="py-4 px-4 border">
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                  </td>
                  <td className="py-4 px-4 border">
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                  </td>
                  <td className="py-4 px-4 border">
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="py-4 px-4 border">
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="py-4 px-4 border">
                    <div className="flex space-x-2">
                      <div className="h-5 bg-gray-200 rounded w-12"></div>
                      <div className="h-5 bg-gray-200 rounded w-12"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Submitted Ideas</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Published</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ideas.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 px-4 border text-center">
                  No ideas submitted yet
                </td>
              </tr>
            ) : (
              ideas.map((idea) => (
                <tr key={idea.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{idea.title}</td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        idea.status === IdeaStatus.APPROVED
                          ? "bg-green-100 text-green-800"
                          : idea.status === "DRAFT"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {idea.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        idea.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {idea.isPublished ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">৳ 200</td>
                  <td className="py-2 px-4 border">{idea.category}</td>
                  <td className="py-2 px-4 border">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => router.push(`/idea/${idea.id}`)}
                      className="text-blue-600 hover:underline mr-2 cursor-pointer"
                    >
                      <EyeIcon className="w-4 h-4 inline-block mr-1" />
                    </button>
                    {idea.status === "DRAFT" && (
                      <button
                        onClick={() => router.push(`/idea/edit/${idea.id}`)}
                        className="text-green-600 hover:underline mr-2 cursor-pointer"
                      >
                        <Edit className="w-4 h-4 inline-block mr-1" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        // Handle delete action here
                      }}
                      className="text-blue-600 hover:underline mr-2 cursor-pointer"
                    >
                      <Trash className="w-4 h-4 inline-block mr-1" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Use the ViewModal component */}
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
