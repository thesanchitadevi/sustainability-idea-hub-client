import { getIdeaComments } from "@/lib/api/ideas/action";
import Image from "next/image";
import CommentForm from "./CommentForm";

const CommentsSection = async ({ ideaId }: { ideaId: string }) => {
  const comments = await getIdeaComments(ideaId);
  console.log("comments", comments);
  return (
    <div className="p-4">
      <h1>Comments </h1>
      <CommentForm />

      {comments?.length === 0 && (
        <p className="text-gray-300">No comments yet</p>
      )}
      {comments?.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Image
              src={comment.user?.profilePicture || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold">{comment.user?.name}</h2>
              <p className="text-sm text-gray-500">{comment.createdAt}</p>
            </div>
          </div>
          <p className="mt-2">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
