"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { Toggle } from "@/components/ui/toggle";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface ChapterVisibilityProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterVisibility = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVisibilityProps) => {
  const [isFree, setIsFree] = useState(initialData.isFree);
  const [fadeKey, setFadeKey] = useState(0);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(initialData.isFree),
    },
  });

  useEffect(() => {
    setFadeKey((prevKey) => prevKey + 1); // Update the key to trigger fade effect
  }, [isFree]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      setIsFree(values.isFree);
      toast.success(
        values.isFree ? "Chapter is now free" : "Chapter is not free anymore"
      );
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormControl>
                  <Toggle
                    className="rounded-full data-[state=on]:bg-[#b98ee4] hover:bg-gray-500/30"
                    type="submit"
                    pressed={field.value}
                    onPressedChange={field.onChange}>
                    {field.value ? (
                      <Eye className="text-[#291839]" />
                    ) : (
                      <EyeOff className="text-gray-500" />
                    )}
                  </Toggle>
                </FormControl>
                <div
                  key={fadeKey}
                  className="text-sm mt-2 transition-opacity duration-500 ease-in-out opacity-100">
                  {field.value ? (
                    <div className="text-[#b98ee4]">
                      This Chapter is visible for preview
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      This Chapter is not visible for preview
                    </div>
                  )}
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChapterVisibility;
