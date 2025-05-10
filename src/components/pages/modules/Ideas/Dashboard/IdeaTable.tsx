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
import { useState } from "react";
import { toast } from "sonner";
import { deleteIdeaById } from "@/lib/api/ideas/action";
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

  const columns: ColumnDef<IIdea>[] = [
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
        const status = row.getValue("status") as IdeaStatus;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === IdeaStatus.APPROVED
                ? "bg-green-100 text-green-800"
                : status === "DRAFT"
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {status}
          </span>
        );
      },
    },
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
      cell: () => "৳ 200", // Static value as per your original code
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
      id: "actions",
      cell: ({ row }) => {
        const idea = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(idea)}
              className="h-8 w-8 p-0 text-green-500 hover:text-green-600 cursor-pointer"
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
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteClick(row.original.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-gray-50">
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
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No ideas submitted yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
