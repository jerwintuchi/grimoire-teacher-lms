"use client";
import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";
import { Pen, PlusIcon, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsediting] = useState(false);

  const toggleEdit = () => setIsediting((current) => !current);
  const router = useRouter();
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: { videoUrl: initialData?.videoUrl || "" },
  // });

  // const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-[#853bce] bg-[#181622] rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium flex items-center justify-between pb-4">
        Chapter Video
        <Button
          onClick={toggleEdit}
          variant="outline"
          className="bg-[#181622] border border-[#853bce] hover:bg-[#853bce] hover:text-white">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pen className="h-4 w-4 mr-2"></Pen>
              Upload New Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60  bg-[#291839] rounded-md">
            <VideoIcon className="h-10 w-10 text-[#853bce]" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 text text-white">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4 text-white opacity-70">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2 text-white opacity-70">
          Videos may take a few moments to appear. Try to refresh page if video
          doesn't appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
