import { getCurrentUser } from "@/lib/actions/auth.action";
import { getIdeaComments } from "@/lib/actions/comment.action";
import CommentContainer from "./CommentContainer";
import CommentForm from "./CommentForm";

const CommentsSection = async ({ ideaId }: { ideaId: string }) => {
  const comments = await getIdeaComments(ideaId);
  const user = await getCurrentUser();
  console.log("comments", comments);
  return (
    <div className="p-4">
      <h1>Comments </h1>
      {user && user?.role === "MEMBERS" && <CommentForm ideaId={ideaId} />}

      {comments?.length === 0 && (
        <p className="text-gray-300">No comments yet</p>
      )}
      <CommentContainer comments={comments} />
    </div>
  );
};

export default CommentsSection;
