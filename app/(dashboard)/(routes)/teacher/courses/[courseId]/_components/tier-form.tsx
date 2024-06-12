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
import { DropdownMenuRadioTier } from "@/components/dropdowntier";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface TierFormProps {
  initialData: Course;
  courseId: string;
  options: { value?: string }[];
}

const formSchema = z.object({
  tierId: z.string().min(1),
});

export const TierForm = ({ initialData, courseId, options }: TierFormProps) => {
  const [isEditing, setIsediting] = useState(false);

  const toggleEdit = () => setIsediting((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tierId: initialData?.tierId || "Free",
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
    (option) => option.value === initialData.tierId
  );
  //hook for tier dropdown menu
  const [selectedTier, setSelectedTier] = React.useState<string>(
    initialData.tierId || "Free"
  );

  // Reset selectedTier to initialData.tierId on cancel
  const handleCancel = () => {
    setSelectedTier(initialData.tierId || "Free");
    toggleEdit();
  };
  return (
    <div className="mt-6 rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium justify-end">
        <Badge className="text-[#b98ee4] bg-[#291839] text-xl border-2 border-[#a65eee] hover:bg-[#573e70]">
          {selectedTier}
          {" Tier"} {/** concatenates the word "Tier" */}
        </Badge>
        <Button
          onClick={handleCancel}
          variant="outline"
          className="bg-[#13111c] border border-[#13111c] hover:text-[#853bce] hover:bg-[#13111c] rounded-full">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pen className="h-5 w-5 " />
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="  space-y-4 mt-4">
            <div className="flex items-center justified-end gap-x-4 space-y-2">
              <FormField
                control={form.control}
                name="tierId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="pt-2">
                        <DropdownMenuRadioTier
                          option={selectedTier}
                          setOption={setSelectedTier}
                        />
                      </div>
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
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TierForm;
