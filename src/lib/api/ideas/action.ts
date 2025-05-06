import { IIdea } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export async function getFeaturedIdeas(): Promise<IIdea[]> {
  try {
    const response = await fetch(`${BASE_URL}/idea`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as IIdea[];

    // Filter for published ideas that are not completed and return limited number
    return data
      .filter((idea) => idea.isPublished === true && idea.status !== "APPROVED")
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch next project ideas:", error);
    return [];
  }
}
