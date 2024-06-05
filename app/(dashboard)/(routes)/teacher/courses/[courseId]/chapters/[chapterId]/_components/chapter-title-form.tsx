"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ChapterTitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const ChapterTitleForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter title updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-[#853bce] bg-[#181622] rounded-md p-4">
      <div className="text-white font-medium drop-shadow-lg">
        <div className="pb-4 text-white">Chapter Title</div>
        {!isEditing && (
          <p className="text-sm-2 text-[#b98ee4]">{initialData.title}</p>
        )}
        {isEditing && (
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
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. Introduction to course"
                        {...field}
                        className="border border-red-700 px-3 py-2 text-[#853bce]"
                      />
                    </FormControl>
                    <FormMessage className="text-[red-500] drop-shadow-sm" />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button
                  className="w-full bg-green-600 text-white hover:bg-green-500"
                  disabled={isSubmitting || !isValid}
                  type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
        <Button
          onClick={toggleEdit}
          variant="outline"
          className="mt-4 border hover:text-white border-[#853bce] bg-[#181622] hover:bg-[#853bce]">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pen className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChapterTitleForm;
