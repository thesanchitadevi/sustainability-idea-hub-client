"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getIdeaById, updateIdeaById } from "@/lib/api/ideas/action";
import { IIdea } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  problemStatement: z.string().min(1, "Problem statement is required"),
  proposedSolution: z.string().min(1, "Proposed solution is required"),
});

export default function EditIdeaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [idea, setIdea] = useState<IIdea | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      problemStatement: "",
      proposedSolution: "",
    },
  });

  // Fetch the idea once the component mounts
  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const fetchedIdea = await getIdeaById(id as string);
        setIdea(fetchedIdea);
        form.reset({
          title: fetchedIdea?.title,
          description: fetchedIdea?.description,
          problemStatement: fetchedIdea?.problem_statement,
          proposedSolution: fetchedIdea?.proposed_solution,
        });
      } catch (error) {
        console.error("Error fetching idea:", error);
        toast.error("Failed to load idea");
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Transform formData to match the API's expected format (snake_case)
      const apiFormData = {
        title: values.title,
        description: values.description,
        problem_statement: values.problemStatement,
        proposed_solution: values.proposedSolution,
      };

      const updatedIdea = await updateIdeaById(id as string, apiFormData);
      setIdea(updatedIdea);
      toast.success("Idea updated successfully!");
      router.push("/dashboard/member/my-ideas");
    } catch (error) {
      console.error("Error updating idea:", error);
      toast.error("Failed to update idea");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-destructive/15 border-l-4 border-destructive p-4">
          <div className="flex items-center gap-2 text-destructive">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p>Idea not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-semibold">Edit Idea</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter idea title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your idea"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="problemStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Statement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What problem does this idea solve?"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proposedSolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposed Solution</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How does your idea solve this problem?"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/member/my-ideas")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Idea"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
