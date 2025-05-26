

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { IdeaHubTable } from "@/components/Common/IdeaHubTable";
import Pagination from "@/components/Common/Pagination";
import { IdeaDetails } from "@/types";
import { EyeIcon } from "lucide-react";

import { useState } from "react";


const RejectedIdeas = ({
  userData,
  page,
}: {
  userData: IdeaDetails[];
  page: number;
}) => {
 
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<IdeaDetails | null>(null);


 
  const columns: ColumnDef<IdeaDetails>[] = [
    {
      accessorKey: "title",
      header: () => <div>Title</div>,
      cell: ({ row }) => <div className="">{row.original.title}</div>,
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => <div className="">{row.original.status}</div>,
    },
    {
      accessorKey: "reject",
      header: () => <div>Reason</div>,
      cell: ({ row }) => <div className="">{row.original.rejectionFeedback}</div>,
    },
    {
      accessorKey: "category",
      header: () => <div>Category</div>,
      cell: ({ row }) => <div className="">{row.original.category}</div>,
    },
    {
      accessorKey: "details",
      header: () => <div>Details</div>,
      cell: ({ row }) => (
        <div className=" text-center w-16">
          <EyeIcon
            className="w-4 h-4 inline-block mr-1 hover:text-green-500 cursor-pointer"
            onClick={() => {
              setSelectedIdea(row.original);
              setShowDetailsModal(true);
            }}
          />
        </div>
      ),
    },
    
   
  ];

  return (
    <div>
      <IdeaHubTable columns={columns} data={userData || []}></IdeaHubTable>

      <Pagination totalPage={page}></Pagination>


      
      {showDetailsModal && selectedIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal */}
          <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full border border-green-200 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              {selectedIdea.title}
            </h2>

            <div className="space-y-4 text-sm text-gray-800">
              <div>
                <p className="font-semibold text-green-600">
                  Problem Statement
                </p>
                <p className="text-gray-700 mt-1">
                  {selectedIdea.problem_statement || "N/A"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-green-600">
                  Proposed Solution
                </p>
                <p className="text-gray-700 mt-1">
                  {selectedIdea.proposed_solution || "N/A"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-green-600">Description</p>
                <p className="text-gray-700 mt-1">
                  {selectedIdea.description || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-semibold text-green-600">Status</p>
                  <p className="text-gray-700">{selectedIdea.status}</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600">Category</p>
                  <p className="text-gray-700">{selectedIdea.category}</p>
                </div>

                <div>
                  <p className="font-semibold text-green-600">Published</p>
                  <p className="text-gray-700">
                    {selectedIdea.isPublished ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setShowDetailsModal(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RejectedIdeas;
