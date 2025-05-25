"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export const getVotes = async (ideaId: string) => {
  try {
    const accessToken = (await cookies()).get("accessToken")!.value;

    const res = await fetch(`${BASE_URL}/vote/${ideaId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      credentials: "include",
    });

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching votes:", error);
    return [];
  }
};

export const postVote = async (
  ideaId: string,
  voteType: "UP_VOTE" | "DOWN_VOTE"
) => {
  try {
    const accessToken = (await cookies()).get("accessToken")!.value;

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const voteBody = {
      voteType,
    };

    const response = await fetch(`${BASE_URL}/vote/${ideaId}`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voteBody),
      credentials: "include",
    });

    const data = await response.json();

    revalidatePath(`/idea/${ideaId}`);

    return data;
  } catch (error) {
    console.error("Error in posting vote:", error);
    throw error;
  }
};
