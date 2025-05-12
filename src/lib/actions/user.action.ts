"use server";

import { cookies } from "next/headers";
import { loginUser } from "./auth.action";

export const registerUser = async (userData: FormData) => {
  try {
    const res = await fetch(
      "https://sustainability-idea-hub-server.vercel.app/api/user/create-user",
      {
        method: "POST",
        body: userData,
      }
    );

    const result = await res.json();
    if (result?.success) {
      // login the user
      const data = JSON.parse(userData.get("data") as string);
      const email = data.user.email;
      const password = data.password;

      const loginRes = await loginUser({ email, password });
      return loginRes;
    } else {
      throw new Error(result?.message || "User registration failed");
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getMe = async () => {
  const accessToken = (await cookies()).get("accessToken")!.value;
  const res = await fetch(
    "https://sustainability-idea-hub-server.vercel.app/api/user/me",
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );

  const result = await res.json();
  return result;
};
