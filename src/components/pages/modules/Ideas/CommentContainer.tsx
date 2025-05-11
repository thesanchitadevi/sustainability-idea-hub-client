import { User } from "lucide-react";
import CommentCard from "./CommentCard";

interface User {
  id: string;
  name: string;
  email: string;
  profile_image: string;
  role: string;
}

export interface IComment {
  id: string;
  idea_id: string;
  parent_id: string | null;
  user_id: string;
  user: User;
  comment: string;
  createdAt: string;
  updatedAt: string;
  replies: IComment[];
}

const CommentContainer = ({ comments }: { comments: IComment[] }) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentContainer;
