"use server";
import { IIdea } from "@/types";
import { cookies } from "next/headers";

interface ApiResponse {
  data: {
    data: IIdea[];
  };
}
const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export const createIdea = async (formData: FormData) => {
  try {
    // Get access token directly
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${BASE_URL}/idea`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
      body: formData,
      credentials: "include",
    });

    const data = await response.json();
    console.log({ data });

    return data;
  } catch (error) {
    console.error("Error in createIdea:", error);
    throw error;
  }
};

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

export async function getAllIdeas(
  userId: string,
  options?: {
    status?: string;
    isPublished?: boolean;
    sortBy?: "newest" | "oldest";
    searchTerm?: string;
    category?: string;
    isPaid?: string;
    limit?: number;
  }
): Promise<IIdea[]> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("userId", userId);

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

export const updateIdeaById = async (id: string, data: Partial<IIdea>) => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${BASE_URL}/idea/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    credentials: "include",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const updatedIdea = await res.json();
  console.log("Updated Idea:", updatedIdea);
  return updatedIdea;
};

export const deleteIdeaById = async (id: string): Promise<void> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  try {
    const response = await fetch(`${BASE_URL}/idea/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    console.log("Delete response:", response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete idea");
    }

    return;
  } catch (error) {
    console.error("Error deleting idea:", error);
    throw error;
  }
};

export const ideaSubmitReview = async (id: string) => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${BASE_URL}/idea/${id}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    credentials: "include",
  });

  const submittedIdea = await res.json();
  console.log("Updated Idea:", submittedIdea);
  return submittedIdea;
};
