"use server"

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"


export const getCurrentUser = async() => {

    const accessToken = (await cookies()).get('accessToken',)?.value;
    let decoded = null;
    if(accessToken) {
        decoded = await jwtDecode(accessToken);
    }
    return decoded
}

export const getAllUsers = async(page:string|number, limit:string|number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user?page=${page}&limit=${limit}`, {
            next: {
                tags:["USERS"]
            },
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            
        });
        
        const result = await res.json();
        
        // console.log(result)
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}

export const blockUnblockUser = async(id:string, isBlock:string) => {
    // console.log(isBlock)
    const statusData = {
        status: isBlock
    }
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}/status`, {
            method:"PATCH",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(statusData)
            
        });
        revalidateTag("USERS");
        const result = await res.json();
        
        // console.log(result)
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}

export const changeUserRole = async(id:string, data : {role:string}) => {
    // console.log(data)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}/role`, {
            method:"PATCH",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body:JSON.stringify(data)
            
            
        });
        revalidateTag("USERS");
        const result = await res.json();
        
        // console.log(result)
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}