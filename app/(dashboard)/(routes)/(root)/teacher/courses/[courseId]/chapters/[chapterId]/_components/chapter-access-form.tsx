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
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Preview } from "@/components/preview";

import { Checkbox } from "@/components/ui/checkbox";
interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsediting] = useState(false);

  const toggleEdit = () => setIsediting((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(initialData.isFree),
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      if (values.isFree) {
        toast.success("Chapter is now free");
      } else {
        toast.success("Chapter is not Free anymore");
      }

      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-red-500 rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium flex items-center justify-between">
        Chapter Visibility
        <Button
          onClick={toggleEdit}
          variant="outline"
          className="bg-red-500 hover:bg-red-300 ml-6">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pen className="h-4 w-4 mr-2"></Pen>
              Edit Visibility
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.isFree && "text-white italic"
          )}>
          {initialData.isFree ? (
            <>This Chapter is visible for preview</>
          ) : (
            <>This Chapter is not free</>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}></Checkbox>
                  </FormControl>
                  <div className="space-y-1 leadning-non">
                    <FormDescription className="text-white">
                      Tick this box if you want this chapter visible
                    </FormDescription>{" "}
                  </div>
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
    </div>
  );
};

export default ChapterAccessForm;
