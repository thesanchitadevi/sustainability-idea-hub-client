"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { deleteComment } from "@/lib/actions/comment.action";
import { useState } from "react";
import { toast } from "sonner";
import CommentForm from "./CommentForm";

const CommentAction = ({
  ideaId,
  parentId,
  commentId,
}: {
  ideaId: string;
  parentId: string;
  commentId: string;
}) => {
  const [showReplyModal, setShowReplyModal] = useState(false);
  const { user } = useUser();
  const { role } = user || { role: "" };
  console.log("role", role);
  const deleteCommentHandler = async () => {
    try {
      const res = await deleteComment(commentId);
      if (res?.success) {
        toast.success("Comment deleted successfully");
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment");
    }
  };
  return (
    <div className="w-full">
      <div>
        {role === "ADMIN" && (
          <Button
            variant="link"
            className="text-sm text-red-500"
            onClick={deleteCommentHandler}
          >
            Delete
          </Button>
        )}
        {role === "MEMBERS" && (
          <Button
            variant="link"
            className="text-sm"
            onClick={() => setShowReplyModal((prev) => !prev)}
          >
            Reply
          </Button>
        )}
      </div>
      {showReplyModal && (
        <CommentForm
          ideaId={ideaId}
          parentId={parentId}
          setShowReplyModal={setShowReplyModal}
        />
      )}
    </div>
  );
};

export default CommentAction;
