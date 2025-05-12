import { IdeaStatus } from "@/types";

const statusColors = {
  [IdeaStatus.UNDER_REVIEW]: "bg-yellow-100 text-yellow-800",
  [IdeaStatus.APPROVED]: "bg-green-100 text-green-800",
  [IdeaStatus.REJECT]: "bg-red-100 text-red-800",
  [IdeaStatus.DRAFT]: "bg-gray-100 text-gray-800",
};

export function StatusBadge({ status }: { status: IdeaStatus }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
