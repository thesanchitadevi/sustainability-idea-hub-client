"use server";


import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllMemberIdeas = async (  page: string | number,
  limit: string | number) => {
  // console.log(data)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/idea-for-admin?page=${page}&limit=${limit}`,
      {
        next: {
          tags:['ALLIDEA']
        },
        
        headers: {
        //   "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        
      }
    );
    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateApprovedRejectIdeaStatus = async (id: string, data: {status: string}) => {
  // console.log(data)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/idea/${id}/status`,
      {
        method: 'PATCH',
        
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(data)
        
      }
    );
    revalidateTag('ALLIDEA')
    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};