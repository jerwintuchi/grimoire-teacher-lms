"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { File, Loader2, Trash2, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pen, PlusIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Url is required",
  }),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsediting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsediting((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: initialData?.imageUrl || "" },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Successfully added a course attachment");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment has been deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border border-[#643d88] bg-[#181622] rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium flex items-center justify-between pb-4">
        Course Attachments
        <Button
          onClick={toggleEdit}
          variant="outline"
          className="bg-[#181622] border border-[#643d88] hover:text-white hover:bg-[#853bce]">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-[#181622] border-[#853bce] border text-white rounded-md">
                  <File className="relative h-6 w-6 mr-2 flex-shrink-0" />
                  <p className="text-sm line-clamp-1 flex-grow">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  )}

                  {deletingId !== attachment.id && (
                    <button onClick={() => onDelete(attachment.id)}>
                      <Trash2 className="ml-auto w-4 h-4 mouse-pointer hover:text-red-800 transition position-end" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add requirements for student to complete this course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
