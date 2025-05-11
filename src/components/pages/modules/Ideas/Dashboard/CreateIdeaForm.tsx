"use client";

import { createIdea } from "@/lib/api/ideas/action";
import { IdeaCategory, IdeaStatus } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "./ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  problemStatement: z.string().min(1, "Problem statement is required"),
  proposedSolution: z.string().min(1, "Proposed solution is required"),
  description: z.string().optional(),
  status: z.enum(["DRAFT", "APPROVED", "REJECT", "UNDER_REVIEW"]),
  category: z.enum(["ENERGY", "WASTE", "TRANSPORTATION"]),
  isPaid: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const CreateIdeaForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      problemStatement: "",
      proposedSolution: "",
      description: "",
      status: "DRAFT" as IdeaStatus,
      category: "ENERGY" as IdeaCategory,
      isPaid: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const formPayload = new FormData();
      console.log({ formPayload });
      formPayload.append("data", JSON.stringify(values));
      images.forEach((image) => formPayload.append("files", image));

      await createIdea(formPayload);
      toast.success("Idea saved successfully!");
      router.push("/dashboard/member/my-ideas");
    } catch (err) {
      toast.error("Failed to save draft. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-semibold">Create New Idea</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter idea title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(IdeaCategory).map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1 flex items-end">
                  <FormField
                    control={form.control}
                    name="isPaid"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-md w-full h-full">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Premium idea (requires payment)</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="problemStatement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Statement*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What problem does this idea solve?"
                        rows={3}
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
                    <FormLabel>Proposed Solution*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How does your idea solve this problem?"
                        rows={3}
                        {...field}
                      />
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
                        placeholder="Additional details about your idea"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ImageUploader onImagesChange={setImages} />
            </div>

            <div className="flex justify-end pt-4">
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
                    Saving...
                  </>
                ) : (
                  "Save Draft"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateIdeaForm;
