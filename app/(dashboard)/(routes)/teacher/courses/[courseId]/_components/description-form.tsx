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
import { Pen } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Course } from "@prisma/client";
interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .max(300, {
      message: "Must be 300 characters or less",
    }),
});

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const [isEditing, setIsediting] = useState(false);

  const toggleEdit = () => setIsediting((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-[#643d88] bg-[#181622] rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium flex items-center justify-between">
        Course Description
        <Button
          onClick={toggleEdit}
          variant="outline"
          className="bg-[#181622] border border-[#643d88] hover:bg-[#853bce] hover:text-white">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pen className="h-4 w-4 mr-2"></Pen>
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2 text-[#b98ee4]",
            !initialData.description && "text-[#b98ee4] italic"
          )}>
          {initialData.description || "No Description yet."}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Label htmlFor="label" className="text-gray-600">
                      Description
                      <Textarea
                        style={{ height: "150px" }}
                        rows={20}
                        disabled={isSubmitting}
                        placeholder="Add a description&nbsp;"
                        {...field}
                        className="border border-[#262046] px-3 py-4 text-[#853bce]"
                      />
                    </Label>
                  </FormControl>
                  <FormMessage className="text-red-500 drop-shadow-sm" />
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

export default DescriptionForm;
