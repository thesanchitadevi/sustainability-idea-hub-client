"use client";
import { createIdea } from "@/lib/api/ideas/action";
import { IdeaCategory, IdeaStatus } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "./ImageUploader";

type FormData = {
  title: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  status: IdeaStatus;
  category: IdeaCategory;
};

const CreateIdeaForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    problemStatement: "",
    proposedSolution: "",
    description: "",
    status: "DRAFT" as IdeaStatus,
    category: "ENERGY" as IdeaCategory,
  });

  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, String(value));
      });
      images.forEach((image) => formPayload.append("images", image));

      await createIdea(formPayload);
      toast.success("Idea saved successfully!");
      router.push("/idea");
    } catch (err) {
      toast.error("Failed to save draft. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-semibold">Create New Idea</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Compact Form Sections */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                {Object.values(IdeaCategory).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Problem Statement*
              </label>
              <textarea
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proposed Solution*
              </label>
              <textarea
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <ImageUploader onImagesChange={setImages} />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Draft"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIdeaForm;
