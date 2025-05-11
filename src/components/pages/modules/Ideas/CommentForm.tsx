import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CommentForm = () => {
  return (
    <form>
      <div className="flex  gap-2 items-center">
        <Input
          type="text"
          placeholder="Add a comment..."
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <Button
          type="submit"
          className=" bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
