"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

interface IComment {
  ideaId: string;
  comment: string;
  parentId?: string; // Optional since it might be a top-level comment
}

export const createComment = async (commentBody: IComment) => {
  try {
    // Get access token directly
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${BASE_URL}/comment/create`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentBody),
      credentials: "include",
    });

    const data = await response.json();
    revalidatePath(`/idea/${commentBody.ideaId}`);

    return data;
  } catch (error) {
    console.error("Error in posting comment:", error);
    throw error;
  }
};

export const getIdeaComments = async (ideaId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/${ideaId}`
    );
    const result = await res.json();
    if (result?.success) {
      return result?.data || [];
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${BASE_URL}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    revalidatePath(`/idea/${data.ideaId}`);

    return data;
  } catch (error) {
    console.error("Error in deleting comment:", error);
    throw error;
  }
};
