/* eslint-disable @next/next/no-img-element */
"use client";
import { IIdea } from "@/types";
import { IdeaStatus } from "@/types";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import React, { useState } from "react";

interface ViewModalProps {
  idea: IIdea;
  isOpen: boolean;
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ idea, isOpen, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen) return null;

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? (idea.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === (idea.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{idea.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(idea.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Images Section */}
          <div className="mb-6 bg-gray-50 rounded-lg overflow-hidden">
            {idea.images && idea.images.length > 0 ? (
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                  <img
                    src={idea.images[activeImageIndex].imageUrl}
                    alt={`${idea.title} - ${activeImageIndex + 1}`}
                    className="w-full h-full object-contain max-h-[400px]"
                  />

                  {/* Navigation Arrows */}
                  {idea.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                        aria-label="Previous image"
                      >
                        <ArrowLeft />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                        aria-label="Next image"
                      >
                        <ArrowRight />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {idea.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {idea.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                          activeImageIndex === index
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image.imageUrl}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                <div className="text-center p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2">No images available</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">
                Description
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {idea.description || "No description provided"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">
                Problem Statement
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {idea.problem_statement || "No description provided"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">
                Proposed Solution
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {idea.proposed_solution || "No description provided"}
              </p>
            </div>

            {/* Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">
                Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      idea.status === IdeaStatus.APPROVED
                        ? "bg-green-100 text-green-800"
                        : idea.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {idea.status}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Published:</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      idea.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {idea.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Category:</span>
                  <span className="text-gray-800 font-medium">
                    {idea.category || "Uncategorized"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Price:</span>
                  <span className="text-gray-800 font-medium">৳ 200</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">
                    Last Updated:
                  </span>
                  <span className="text-gray-800">
                    {new Date(
                      idea.updatedAt || idea.createdAt
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Edit Idea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
