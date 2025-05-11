"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { getMe } from "@/lib/actions/user.action";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLongDate } from "@/lib/date-utils";
import Link from "next/link";
import { ListCheckIcon } from "lucide-react";

interface UserData {
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
}

export default function MyProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar Skeleton */}
          <div className="w-full md:w-1/3 lg:w-1/4 space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>

          {/* Main Content Skeleton */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">No user data found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar - Profile Summary */}
        <div className="w-full md:w-1/3 lg:w-1/4 space-y-6">
          <div className=" rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-center">
                {userData.data.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {userData.data.email}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {userData?.data?.role}
              </p>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Member since {formatLongDate(userData.data.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow p-6">
            {userData.data.role === "ADMIN" ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  As an admin, you have access to manage users and content.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard/admin/users"
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    <ListCheckIcon className="w-5 h-5 mr-2" />
                    Manage Users
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Member Panel</h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    As a member, you can create and manage your ideas.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You can also view and vote on other members ideas.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard/member/my-ideas"
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    <ListCheckIcon className="w-5 h-5 mr-2" />
                    My Ideas
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Profile Details */}
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {userData.data.name}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {userData.data.email}
                </span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Account Settings</h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>New Password</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 6 characters
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Password</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
