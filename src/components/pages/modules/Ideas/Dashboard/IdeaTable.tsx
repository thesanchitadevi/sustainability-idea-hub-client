/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IIdea, IdeaStatus } from "@/types";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { deleteIdeaById, ideaSubmitReview } from "@/lib/api/ideas/action";
import { DeleteConfirmationModal } from "./DeleteModal";

interface IdeaTableProps {
  data: IIdea[];
  onView: (idea: IIdea) => void;
}

export function IdeaTable({ data: initialData, onView }: IdeaTableProps) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState<string | null>(null);
  const [data, setData] = useState<IIdea[]>(initialData);
  const [submittingIdeaId, setSubmittingIdeaId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleDeleteClick = (ideaId: string) => {
    setIdeaToDelete(ideaId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!ideaToDelete) return;

    try {
      await deleteIdeaById(ideaToDelete);
      setData((prevData) =>
        prevData.filter((idea) => idea.id !== ideaToDelete)
      );
      toast.success("Idea deleted successfully");
    } catch (error) {
      toast.error("Failed to delete idea");
    } finally {
      setDeleteModalOpen(false);
      setIdeaToDelete(null);
    }
  };

  const handleSubmitForReview = async (ideaId: string) => {
    if (submittingIdeaId === ideaId) return;

    const idea = data.find((item) => item.id === ideaId);
    if (!idea || idea.status !== IdeaStatus.DRAFT) return;

    setSubmittingIdeaId(ideaId);

    try {
      const response = await ideaSubmitReview(ideaId);

      if (response && response.data) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === ideaId ? { ...item, ...response.data } : item
          )
        );
        toast.success("Idea submitted for review successfully");
        router.refresh();
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error submitting idea:", error);
      toast.error("Failed to submit idea for review");
    } finally {
      setSubmittingIdeaId(null);
    }
  };

  // Define columns based on screen size
  const getColumns = (): ColumnDef<IIdea>[] => {
    const baseColumns: ColumnDef<IIdea>[] = [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("title")}</div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const idea = row.original;
          const status = idea.status as IdeaStatus;

          const statusMap = {
            [IdeaStatus.DRAFT]: {
              bg: "bg-amber-100",
              text: "text-amber-800",
              label: "DRAFT",
            },
            [IdeaStatus.UNDER_REVIEW]: {
              bg: "bg-blue-100",
              text: "text-blue-800",
              label: "PENDING",
            },
            [IdeaStatus.APPROVED]: {
              bg: "bg-green-100",
              text: "text-green-800",
              label: "APPROVED",
            },
            [IdeaStatus.REJECT]: {
              bg: "bg-red-100",
              text: "text-red-800",
              label: "REJECTED",
            },
          };

          const currentStatus =
            statusMap[status] || statusMap[IdeaStatus.DRAFT];

          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus.bg} ${currentStatus.text}`}
            >
              {currentStatus.label}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const idea = row.original;
          return (
            <div className="flex space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(idea)}
                className="h-8 w-8 p-0 text-green-500 hover:text-green-600 cursor-pointer"
                title="View"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {idea.status === "DRAFT" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    router.push(`/dashboard/member/my-ideas/${idea.id}`)
                  }
                  className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 cursor-pointer"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {idea.status === "DRAFT" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(row.original.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        },
      },
    ];

    // If not mobile, add additional columns
    if (!isMobile) {
      return [
        ...baseColumns.slice(0, 2),
        {
          accessorKey: "isPublished",
          header: "Published",
          cell: ({ row }) => (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                row.getValue("isPublished")
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {row.getValue("isPublished") ? "Yes" : "No"}
            </span>
          ),
        },
        {
          accessorKey: "price",
          header: "Price",
          cell: () => "৳ 200",
        },
        {
          accessorKey: "category",
          header: "Category",
        },
        {
          accessorKey: "createdAt",
          header: "Date",
          cell: ({ row }) => (
            <div className="text-sm text-gray-600">
              {new Date(row.getValue("createdAt")).toLocaleDateString()}
            </div>
          ),
        },
        {
          id: "submit",
          header: "Submit",
          cell: ({ row }) => {
            const idea = row.original;
            const isSubmitting = submittingIdeaId === idea.id;

            if (idea.status !== IdeaStatus.DRAFT) {
              return (
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="h-8 opacity-50 cursor-not-allowed text-xs sm:text-sm"
                >
                  Submitted
                </Button>
              );
            }

            return (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSubmitForReview(idea.id)}
                disabled={isSubmitting}
                className="h-8 text-xs sm:text-sm"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4"
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
                    <span className="hidden sm:inline">Submitting...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Submit for Review</span>
                    <span className="sm:hidden">Submit</span>
                  </>
                )}
              </Button>
            );
          },
        },
        baseColumns[2],
      ];
    }

    return baseColumns;
  };

  const columns = getColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className="rounded-md border overflow-hidden flex flex-col"
      style={{
        height: isMobile ? "auto" : "calc(100vh - 200px)",
        maxHeight: isMobile ? "70vh" : "calc(100vh - 200px)",
      }}
    >
      <div className="overflow-x-auto overflow-y-auto flex-1">
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-gray-50 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-gray-50 whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No ideas submitted yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
