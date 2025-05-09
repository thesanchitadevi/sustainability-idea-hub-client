"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"


export const getCurrentUser = async() => {

    const accessToken = (await cookies()).get('accessToken',)?.value;
    let decoded = null;
    if(accessToken) {
        decoded = await jwtDecode(accessToken);
    }
    return decoded
}