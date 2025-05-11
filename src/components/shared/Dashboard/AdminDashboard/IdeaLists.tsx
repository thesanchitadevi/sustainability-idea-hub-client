"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IdeaHubTable } from "@/components/Common/IdeaHubTable";
import Pagination from "@/components/Common/Pagination";
import { IdeaDetails } from "@/types";
import { EyeIcon, Trash2 } from "lucide-react";
import { deleteIdeaByIdAdmin, updateApprovedRejectIdeaStatus } from "@/service/adminIdeaControll";
import { useState } from "react";


const IdeaLists = ({
  userData,
  page,
}: {
  userData: IdeaDetails[];
  page: number;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDlelteModal, setShowDeleteModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejectFeedback, setRejectFeedback] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<IdeaDetails | null>(null);
  const [deleteIdeaId, setDeleteIdeaId] = useState<string | null> (null);

  const handleApprovedIdea = async (id: string) => {
    // console.log(id, isBlock)
    try {
      const statusData = {
        status: "APPROVED",
      };
      const res = await updateApprovedRejectIdeaStatus(id, statusData);
      setShowModal(false);

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  const handleDeleteIdea = async (id: string) => {
    // console.log(id, isBlock)
    setLoading(true);
   
    try {
      
      await deleteIdeaByIdAdmin(id);
      
      setShowDeleteModal(false);
      setLoading(false);

      
    toast.success("Idea deleted Successfully");
    
      
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleRejectIdea = async (id: string) => {
    try {
      setLoading(true);
      const statusData = {
        status: "REJECT",
        rejectionFeedback: rejectFeedback,
      };
      // console.log(statusData)
      const res = await updateApprovedRejectIdeaStatus(id, statusData);
      setLoading(false);
      setShowRejectModal(false);
      setRejectFeedback("");

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

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
    

    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <div className="space-x-2">
          <Button
            disabled={
              row.original.status === "APPROVED" ||
              row.original.status === "REJECT"
            }
            // onClick={() => handleApprovedIdea(row.original.id)}
            onClick={() => {
              setSelectedId(row.original.id);
              setShowModal(true);
            }}
            className="cursor-pointer h-7 bg-green-500 font-semibold text-white"
            variant={"outline"}
          >
            Approved
          </Button>

          <Button
            disabled={
              row.original.status === "APPROVED" ||
              row.original.status === "REJECT"
            }
            onClick={() => {
              setSelectedId(row.original.id);
              setShowRejectModal(true);
            }}
            className="cursor-pointer h-7 bg-red-500 font-semibold text-white"
            variant={"outline"}
          >
            Reject
          </Button>
        </div>
      ),
    },

    {
      accessorKey: "delete",
      header: () => <div>Delete Idea</div>,
      cell: ({ row }) => (
        <div className=" text-center w-16">
          <Button
              disabled={row.original.status === 'APPROVED'}
              variant="ghost"
              size="sm"
              onClick={()=> {
                setDeleteIdeaId(row.original.id);
                setShowDeleteModal(true)
              }}
              // onClick={() => handleDeleteClick(row.original.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <IdeaHubTable columns={columns} data={userData || []}></IdeaHubTable>

      <Pagination totalPage={page}></Pagination>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black opacity-50" />

          {/* Modal */}
          <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-green-600">
              Are you sure?
            </h2>
            <p className="mb-6">Do you want to approve this idea?</p>
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-gray-200 text-black hover:bg-gray-300 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                No
              </Button>
              <Button
                className="bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                onClick={() => selectedId && handleApprovedIdea(selectedId)}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal with Feedback */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-red-600">
              Reject Feedback
            </h2>
            <textarea
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              placeholder="Enter reason for rejection..."
              rows={4}
            />
            <div className="flex justify-end space-x-2 cursor-pointer">
              <Button
                onClick={() => setShowRejectModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-black"
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                onClick={() => selectedId && handleRejectIdea(selectedId)}
              >
                {loading ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </div>
        </div>
      )}


      {/* Confirmation delete Modal */}
      {showDlelteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black opacity-50" />

          {/* Modal */}
          <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-red-600">
              Are you sure?
            </h2>
            <p className="mb-6">Do you want to delete this idea?</p>
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-gray-200 text-black hover:bg-gray-300 cursor-pointer"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                onClick={() => handleDeleteIdea(deleteIdeaId)}
                // onClick={() => selectedId && handleApprovedIdea(selectedId)}
              >
                {loading ? 'Deleting...' : 'Yes'}
              </Button>
            </div>
          </div>
        </div>
      )}

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

export default IdeaLists;
