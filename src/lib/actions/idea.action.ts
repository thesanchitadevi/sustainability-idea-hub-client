"use server";

import { IFilter } from "@/types";

export const getAllIdeaAction = async (filters?: IFilter[]) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/idea`;
    const searchParams = new URLSearchParams();
    searchParams.append("isPublished", "true");
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        searchParams.append(filter.name, filter.value as string);
      });
    }
    url = `${url}?${searchParams.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      const error = await res.json();
      console.error("Error fetching Ideas:", error);
      throw new Error(error.message);
    }

    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error fetching Ideas:", data.error);
      throw new Error(data?.error || "Unknown error");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Ideas:", error);
    throw error;
  }
};
