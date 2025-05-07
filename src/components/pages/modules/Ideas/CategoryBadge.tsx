import { IdeaCategory } from "@/types";

const categoryColors = {
  [IdeaCategory.ENERGY]: "bg-blue-100 text-blue-800",
  [IdeaCategory.WASTE]: "bg-green-100 text-green-800",
  [IdeaCategory.TRANSPORTATION]: "bg-purple-100 text-purple-800",
};

export function CategoryBadge({ category }: { category: IdeaCategory }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[category]}`}
    >
      {category}
    </span>
  );
}
