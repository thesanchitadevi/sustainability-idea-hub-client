import { getCurrentUser } from "@/lib/actions/auth.action";
import { User } from "lucide-react";
import Image from "next/image";
import CommentAction from "./CommentAction";
import CommentContainer, { IComment } from "./CommentContainer";

const CommentCard = async ({ comment }: { comment: IComment }) => {
  const user = await getCurrentUser();
  return (
    <div key={comment.id} className=" p-4 rounded-lg mb-4 shadow-sm">
      <div className="flex items-start gap-2">
        {comment.user?.profile_image !== "" ? (
          <Image
            src={comment.user?.profile_image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <User />
        )}
        <div>
          <h2 className="text-sm font-normal text-gray-600">
            {comment.user?.name} -{" "}
            {new Date(comment?.createdAt).toLocaleString()}
          </h2>
          <p className="text-md">{comment.comment}</p>
          {user && (
            <CommentAction
              ideaId={comment?.idea_id}
              parentId={comment?.parent_id || comment?.id}
              commentId={comment?.id}
            />
          )}
        </div>
      </div>
      {comment?.replies?.length > 0 && (
        <div className="pl-2">
          <CommentContainer comments={comment.replies} />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
