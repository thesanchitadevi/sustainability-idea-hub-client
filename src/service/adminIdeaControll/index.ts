"use server";


import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllMemberIdeas = async (  page?: string | number,
  limit?: string | number) => {
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
export const getAllPrimiumIdeas = async (  page?: string | number,
  limit?: string | number) => {
  // console.log(data)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/idea-for-admin?page=${page}&limit=${limit}&isPaid=true`,
      
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
export const getAllRejectedIdeas = async (  page?: string | number,
  limit?: string | number) => {
  // console.log(data)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/idea-for-admin?page=${page}&limit=${limit}&status=REJECT`,
      
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
export const updateApprovedRejectIdeaStatus = async (id: string, data: {status: string, rejectionFeedback?:string}) => {
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

export const deleteIdeaByIdAdmin = async (id: string): Promise<void> => {
  const accessToken = (await cookies()).get("accessToken")!.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/idea/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    // console.log("Delete response:", response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete idea");
    }

    revalidateTag('ALLIDEA')

    return;
  } catch (error) {
    console.error("Error deleting idea:", error);
    throw error;
  }
};