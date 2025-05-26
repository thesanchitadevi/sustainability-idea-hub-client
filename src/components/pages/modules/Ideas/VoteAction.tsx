"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { postVote } from "@/lib/actions/vote.action";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IVoteAction {
  ideaId: string;
  votes: IVote[];
}

export interface IVote {
  id: string;
  idea_id: string;
  user_id: string;
  vote_type: "UP_VOTE" | "DOWN_VOTE";
  createdAt: string;
}

const VoteAction = ({ ideaId, votes }: IVoteAction) => {
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);
  const [userVote, setUserVote] = useState<IVote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setUpVoteCount(
      votes?.filter((vote) => vote.vote_type === "UP_VOTE").length || 0
    );
    setDownVoteCount(
      votes?.filter((vote) => vote.vote_type === "DOWN_VOTE").length || 0
    );
    const userVoteTemp = votes?.find((vote) => vote.user_id === userId);
    setUserVote(userVoteTemp || null);
  }, [votes]);

  console.log("votes", votes);

  const { user } = useUser();
  const { userId } = user || {};
  const handleUpVote = async () => {
    if (!userId) {
      toast.error("Please login to vote");
      return;
    }
    try {
      setIsLoading(true);
      const res = await postVote(ideaId, "UP_VOTE");
      if (res?.status === "success") {
        toast.success("vote updated successfully");
      }
    } catch (error) {
      console.log("Error in upvoting:", error);
      toast.error((error as any)?.message || "Error in upvoting");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownVote = async () => {
    if (!userId) {
      toast.error("Please login to vote");
      return;
    }
    try {
      setIsLoading(true);
      const res = await postVote(ideaId, "DOWN_VOTE");
      console.log("res", res);
      if (res?.status === "success") {
        toast.success("vote updated successfully");
      }
    } catch (error) {
      console.log("Error in upvoting:", error);
      toast.error((error as Error)?.message || "Error in downvoting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 rounded-md bg-green-50 m-4 p-4">
      <div className="flex items-center ">
        <Button disabled={isLoading} variant="ghost" onClick={handleUpVote}>
          {userVote && userVote.vote_type === "UP_VOTE" ? (
            <ThumbsUp size={5} fill="green" className="size-5 text-green-700" />
          ) : (
            <ThumbsUp className="size-5 text-green-700" />
          )}
        </Button>
        <span className="text-xl font-medium">{upVoteCount}</span>
      </div>

      <div className="flex items-center ">
        <Button disabled={isLoading} variant="ghost" onClick={handleDownVote}>
          {userVote && userVote.vote_type === "DOWN_VOTE" ? (
            <ThumbsDown size={5} fill="red" className="size-5 text-red-700" />
          ) : (
            <ThumbsDown className="size-5 text-red-700" />
          )}
        </Button>
        <span className="text-xl font-medium">{downVoteCount}</span>
      </div>
    </div>
  );
};

export default VoteAction;
