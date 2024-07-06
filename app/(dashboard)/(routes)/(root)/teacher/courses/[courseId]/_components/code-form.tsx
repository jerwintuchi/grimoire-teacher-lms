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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface CodeFormProps {
  initialData: {
    code: string;
  };
  courseId: string;
}

const formSchema = z.object({
  code: z
    .string()
    .min(3, {
      message: "Course Code is required",
    })
    .max(10, {
      message: "Course code must be 10 characters long",
    }),
});

export const CodeForm = ({ initialData, courseId }: CodeFormProps) => {
  const [isEditing, setIsediting] = useState(false);

  const toggleEdit = () => setIsediting((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course code updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-[#643d88] bg-[#181622] rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium flex items-center justify-between">
        Course Code
        <Button
          onClick={toggleEdit}
          variant="outline"
          className="bg-[#181622] border-[#643d88] hover:bg-[#853bce] hover:text-white">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pen className="h-4 w-4 mr-2"></Pen>
              Edit Code
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm-2 text-white ">"{initialData.code}"</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'CSC101' or 'CSC102'..."
                      {...field}
                      className="border border-[#262046] px-3 py-2 text-[#853bce]"
                      onChange={(e) => {
                        if (/\b {3,13}\b/.test(e.target.value)) {
                          // Matches 3 or more spaces with word boundaries
                          toast.error(
                            "Course code cannot have more than two spaces"
                          );
                          console.log(
                            "Course code cannot have more than two spaces"
                          );
                        }
                      }}
                    />
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

export default CodeForm;
