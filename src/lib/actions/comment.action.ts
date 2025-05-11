"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "../api/ideas/action";

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

    const response = await fetch(`${BASE_URL}/idea`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentBody),
      credentials: "include",
    });

    const data = await response.json();
    console.log({ data });

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
