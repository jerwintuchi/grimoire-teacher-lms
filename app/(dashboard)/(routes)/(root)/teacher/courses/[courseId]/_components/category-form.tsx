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
import { Label } from "@/components/ui/label";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsediting] = useState(false);

  const toggleEdit = () => setIsediting((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Category updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );
  return (
    <div className="mt-6 border border-[#643d88] bg-[#181622] rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium flex items-center justify-between">
        Course Category
        <Button
          onClick={toggleEdit}
          variant="outline"
          className="bg-[#181622] border border-[#643d88] hover:bg-[#853bce]">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pen className="h-4 w-4 mr-2"></Pen>
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2 text-[#853bce] border-[#853bce] border-2 rounded-full px-2 py-1 inline-block font-medium",
            !initialData.categoryId && "text-slate-500 italic"
          )}>
          {selectedOption?.label || "No Category yet."}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Label htmlFor="label" className="text-white">
                      Category of magic
                      <div className="pt-2">
                        <Combobox options={options} {...field} />
                      </div>
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

export default CategoryForm;
