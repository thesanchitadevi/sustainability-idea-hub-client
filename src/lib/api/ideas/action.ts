"use server";
import { IIdea } from "@/types";

interface ApiResponse {
  success: boolean;
  data: IIdea[];
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export async function getFeaturedIdeas(): Promise<IIdea[]> {
  try {
    const response = await fetch(`${BASE_URL}/idea`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    // Access the nested data array from the response
    const ideas = result?.data?.data || [];

    // Filter for published ideas (with less restrictive status check)
    const featured = ideas
      .filter((idea) => {
        const isFeatured = idea.isPublished === true; // && idea.status !== "APPROVED"
        return isFeatured;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);

    return featured;
  } catch (error) {
    console.error("Failed to fetch featured ideas:", error);
    return [];
  }
}

export async function getAllIdeas(options?: {
  status?: string;
  isPublished?: boolean;
  sortBy?: "newest" | "oldest";
  limit?: number;
}): Promise<IIdea[]> {
  try {
    // Construct query parameters based on options
    const queryParams = new URLSearchParams();

    if (options?.status) {
      queryParams.append("status", options.status);
    }

    if (options?.isPublished !== undefined) {
      queryParams.append("isPublished", options.isPublished.toString());
    }

    const url = `${BASE_URL}/idea?${queryParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    // console.log("Result:", result);

    return result?.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch ideas:", error);
    return [];
  }
}

export async function getIdeaById(id: string): Promise<IIdea | null> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/idea/${id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    const ideaData = result?.data || null;

    return ideaData as IIdea;
  } catch (error) {
    console.error("Failed to fetch idea:", error);
    return null;
  }
}
