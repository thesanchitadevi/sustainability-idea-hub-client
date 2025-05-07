/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { ArrowBigUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type VoteButtonProps = {
  initialVotes: number;
  ideaId: string;
};

export function VoteButton({ initialVotes, ideaId }: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    try {
      // Optimistic UI update
      setVotes((prev) => (hasVoted ? prev - 1 : prev + 1));
      setHasVoted(!hasVoted);

      // API call
      const response = await fetch(`/api/idea/${ideaId}/vote`, {
        method: "POST",
        body: JSON.stringify({ action: hasVoted ? "unvote" : "vote" }),
      });

      if (!response.ok) {
        throw new Error("Voting failed");
      }
    } catch (error) {
      // Revert on error
      setVotes(initialVotes);
      setHasVoted(false);
      toast.error("Failed to register vote");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleVote}
      className={`gap-1 ${
        hasVoted ? "text-green-600" : "text-muted-foreground"
      }`}
    >
      <ArrowBigUp className={`h-4 w-4 ${hasVoted ? "fill-green-600" : ""}`} />
      {votes}
    </Button>
  );
}
