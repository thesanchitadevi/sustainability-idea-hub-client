"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/lib/actions/comment.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the comment schema with Zod
const CommentSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Comment must be at least 3 characters long" })
    .max(500, { message: "Comment must not exceed 500 characters" }),
});

// TypeScript type based on our schema
type CommentFormValues = z.infer<typeof CommentSchema>;

interface CommentFormProps {
  ideaId: string;
  parentId?: string; // Optional since it might be a top-level comment
  setShowReplyModal?: (show: boolean) => void; // Optional function to close the modal
}

export default function CommentForm({
  ideaId,
  parentId,
  setShowReplyModal,
}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: CommentFormValues) => {
    setIsSubmitting(true);

    try {
      console.log("Submitting comment:", { ideaId, ...values });
      const commentBody: {
        ideaId: string;
        comment: string;
        parentId?: string;
      } = {
        ideaId,
        comment: values.comment,
      };
      if (parentId) {
        commentBody.parentId = parentId; // Include parentId if provided
      }
      const res = await createComment(commentBody);
      console.log("Response from server:", res);
      if (res?.success) {
        toast("Comment posted successfully.");
        if (setShowReplyModal) {
          setShowReplyModal(false); // Close the modal if it exists
        }
        form.reset();
      } else {
        toast("Failed to post comment. Please try again.");

        return;
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast("Failed to post your comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
    </Form>
  );
}
