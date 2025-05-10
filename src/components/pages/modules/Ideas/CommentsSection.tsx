import { getIdeaComments } from "@/lib/api/ideas/action";

const CommentsSection = async ({ ideaId }: { ideaId: string }) => {
  const comments = await getIdeaComments(ideaId);
  console.log("comments", comments);
  return (
    <div>
      <h1>This is CommentsSection </h1>
    </div>
  );
};

export default CommentsSection;
