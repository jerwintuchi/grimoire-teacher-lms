"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ListPlus, Pen } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Chapter Title is required",
  }),
});

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-red-500 rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium flex items-center justify-between">
        Course Chapters
        <Button
          onClick={toggleCreating}
          variant="outline"
          className="bg-red-500 hover:bg-red-300">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <ListPlus className="h-4 w-4 mr-2"></ListPlus>
              Add
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Label htmlFor="label" className="text-gray-600">
                      Chapter Description
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. Chapter 1 Introduction&nbsp;"
                        {...field}
                        className="border border-red-700 px-3 py-4 text-red-700"
                      />
                    </Label>
                  </FormControl>
                  <FormMessage className="text-red-500 drop-shadow-sm" />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-green-600 text-white hover:bg-green-500"
              disabled={isSubmitting || !isValid}
              type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-white italic opacity-65"
          )}>
          {!initialData.chapters.length && "No chapters yet"}
          {/* IMPLEMENT THE ADDING A LIST OF CHAPTERS */}
        </div>
      )}
      {!isCreating && (
        <p className="text-white text-muted-foreground mt-4 opacity-60">
          Drag to arrange chapters
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;
