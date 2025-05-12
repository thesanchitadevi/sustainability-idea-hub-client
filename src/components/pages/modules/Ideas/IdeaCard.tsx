/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IIdea } from "@/types";
import { CategoryBadge } from "./CategoryBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Crown } from "lucide-react";

import { useEffect, useState } from "react";
import { getCurrentUser, getPaidInfo, givePayment } from "@/service/auth";
import { IUser } from "@/context/userContext";

interface IdeaCardProps {
  idea: IIdea;
  className?: string;
  displayImageIndex?: number;
  isAuthenticated?: boolean;
}

export function IdeaCard({
  idea,
  className = "",
  displayImageIndex = 0,
  isAuthenticated = false,
}: IdeaCardProps) {
  const router = useRouter();

  console.log(idea);

  const [isPaid, setIsPaid] = useState("");
  
  const [user, setUserINof] = useState<IUser | null>(null);

  const [isParchesing, setIsParchesing] = useState(false);

  useEffect(() => {
    const getPayinfo = async () => {
      try {
        const [userData, res] = await Promise.all([
          getCurrentUser(),
          getPaidInfo(idea.id),
        ]);
        const userInfo: IUser = {
        userId: userData?.id || "",
        email: userData?.email || "",
        role: userData?.role || "MEMBERS",
        
      };
        setUserINof(userInfo);
        const paymentInfo = res?.data;
        setIsPaid(paymentInfo?.status);
        
      } catch (error) {
        console.error("Error fetching payment or user info:", error);
      }
    };
    getPayinfo();
  }, [idea.id]);
  const hasPaid = user && isPaid === "PAID";
  isAuthenticated = !!user;

  if (!idea.isPublished) return null;

  const displayImage =
    idea.images?.length > 0
      ? idea.images[Math.min(displayImageIndex, idea.images.length - 1)]
      : null;

  const handleViewIdea = async (e: React.MouseEvent) => {
    if (idea.isPaid) {
      e.preventDefault();
      if (!isAuthenticated) {
        router.push(`/login?callbackUrl=/idea/${idea.id}`);
      } else {
        setIsParchesing(true);
        const paymentData = await givePayment(idea.id);
        setIsParchesing(false);
        router.push(paymentData?.data?.paymentUrl);
      }
    }
  };

  const upvotes = idea.votes?.UP_VOTE || 0;
  const downvotes = idea.votes?.DOWN_VOTE || 0;

  return (
    <Card
      className={`group relative h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg ${className}`}
      aria-labelledby={`idea-title-${idea.id}`}
    >
      {/* Image Section - No padding */}
      <div className="relative aspect-[4/3] w-full">
        {displayImage ? (
          <Image
            src={displayImage.imageUrl}
            alt={`${idea.title} featured image`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={displayImageIndex === 0}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-lg font-medium text-gray-500">
              {idea.title}
            </span>
          </div>
        )}

        {/* Image counter badge */}
        {idea.images?.length > 1 && (
          <Badge className="absolute right-2 top-2 bg-black/50 text-white hover:bg-black/90 text-xs rounded-4xl">
            {displayImageIndex + 1}/{idea.images.length}
          </Badge>
        )}

        {/* Category and Premium Badge */}
        <div className="absolute left-2 top-2 flex items-center gap-1">
          <CategoryBadge category={idea.category} />
          {idea.isPaid && (
            <span className="flex items-center justify-center w-7 h-7 bg-yellow-50 rounded-full">
              <Crown className="h-4 w-4 text-yellow-500 font-bold" />
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-3">
        <CardHeader className="p-0 mb-2">
          <CardTitle
            className="line-clamp-2 text-lg font-semibold leading-tight"
            id={`idea-title-${idea.id}`}
          >
            {idea.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm text-gray-600 mt-1">
            {idea.description}
          </CardDescription>
        </CardHeader>

        {/* Price Section */}
        {idea.isPaid && (
          <CardContent className="p-0 mb-2">
            <div className="flex items-center justify-between border-t pt-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-green-600">
                  200 TK
                </span>
                <Badge variant="secondary" className="text-green-600">
                  Premium Content
                </Badge>
              </div>
            </div>
          </CardContent>
        )}

        {/* Footer */}
        <CardFooter className="p-0 mt-auto">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm">
                <ThumbsUp size={16} className="text-blue-500" />
                <span>{upvotes}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <ThumbsDown size={16} className="text-red-500" />
                <span>{downvotes}</span>
              </div>
            </div>

            {user?.role === "ADMIN" ? (
              <Button asChild variant="outline" size="sm" className="h-8 px-3">
                <Link href={`/idea/${idea.id}`}>View</Link>
              </Button>
            ) : !idea.isPaid ? (
              <Button asChild variant="outline" size="sm" className="h-8 px-3">
                <Link href={`/idea/${idea.id}`}>View</Link>
              </Button>
            ) : isAuthenticated && hasPaid ? (
              <Button asChild variant="outline" size="sm" className="h-8 px-3">
                <Link href={`/idea/${idea.id}`}>View</Link>
              </Button>
            ) : (
              <Button
                onClick={handleViewIdea}
                size="sm"
                disabled={isParchesing}
                className="h-8 px-3 bg-green-600 hover:bg-green-700"
              >
                {isAuthenticated
                  ? isParchesing
                    ? "Purchasing..."
                    : "Purchase"
                  : "Login"}
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
