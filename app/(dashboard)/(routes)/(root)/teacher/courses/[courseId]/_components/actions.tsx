"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course is now published");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      console.log("onDelete clicked");
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course removed");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error: AxiosError | any) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-left gap-x-2">
      <Button
        className="bg-green-600 hover:bg-green-800 hover:text-white border border-green-600 hover:border-green-800"
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={"outline"}
        size="lg">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          size="lg"
          disabled={isLoading}
          className="bg-red-400 text-red-900 hover:bg-red-800 hover:text-white">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
