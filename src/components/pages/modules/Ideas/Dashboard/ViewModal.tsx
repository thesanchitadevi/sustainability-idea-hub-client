/* eslint-disable @next/next/no-img-element */
"use client";
import { IIdea } from "@/types";
import { IdeaStatus } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Clock,
  Tag,
  DollarSign,
  CheckCircle,
  FileText,
  AlertCircle,
  Pen,
  CheckIcon,
  Vote,
} from "lucide-react";
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-200 py-4 px-6 flex justify-between items-start bg-gradient-to-r from-blue-50/20 to-indigo-50/20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{idea.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  idea.status === IdeaStatus.APPROVED
                    ? "bg-green-100 text-green-800"
                    : idea.status === "DRAFT"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {idea.status}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(idea.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Images Section */}
          <div className="p-6">
            {idea.images && idea.images.length > 0 ? (
              <div className="relative group">
                {/* Main Image */}
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">
                  <img
                    src={idea.images[activeImageIndex].imageUrl}
                    alt={`${idea.title} - ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Arrows */}
                  {idea.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {idea.images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {idea.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border transition-all ${
                          activeImageIndex === index
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-blue-300"
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
              <div className="aspect-video bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-400">
                <FileText className="w-12 h-12 mb-3" />
                <p>No images available</p>
              </div>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6">
            {/* Description */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Description
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {idea.description || (
                  <span className="text-gray-400 italic">
                    No description provided
                  </span>
                )}
              </p>
            </div>

            {/* Problem Statement */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Problem Statement
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {idea.problem_statement || (
                  <span className="text-gray-400 italic">
                    No problem statement provided
                  </span>
                )}
              </p>
            </div>

            {/* Proposed Solution */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Proposed Solution
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {idea.proposed_solution || (
                  <span className="text-gray-400 italic">
                    No solution provided
                  </span>
                )}
              </p>
            </div>

            {/* Feedback */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-green-500" />
                Feedback
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {idea.rejectionFeedback || (
                  <span className="text-gray-400 italic">
                    No feedback provided
                  </span>
                )}
              </p>
            </div>
            {/* User Info */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 flex items-center gap-2">
                <Pen className="w-5 h-5 text-blue-500" />
                Published By
              </h3>
              <div className="flex justify-start items-center gap-4">
                <img
                  src={idea.user?.imageUrl || "/src/assets/user.jpg"}
                  alt={idea.user?.name || "User"}
                  className="w-12 h-12 rounded-full mb-3"
                />
                <div>
                  <p className="text-gray-700 whitespace-pre-line">
                    {idea.user.name || (
                      <span className="text-gray-400 italic">No user info</span>
                    )}
                  </p>
                  <p className="text-gray-700 whitespace-pre-line">
                    {idea.user.email || (
                      <span className="text-gray-400 italic">No user info</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">
                      {idea.category || "Uncategorized"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">
                      {new Date(
                        idea.updatedAt || idea.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">৳ 200</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                    <Vote className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Votes</p>
                    <p className="font-medium">
                      {idea.votes || 0}{" "}
                      <span className="text-gray-400 text-xs">(upvotes)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-50 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{idea.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
