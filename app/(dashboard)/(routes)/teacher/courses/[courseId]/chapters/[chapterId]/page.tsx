import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeftIcon, CircleAlertIcon, FileVideo } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterVisibility from "./_components/chapter-visibility-component";
import ChapterVideoForm from "./_components/chapter-video-form";

import { ChapterActions } from "./_components/chapter-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const chapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/unauthorized");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields} out of ${totalFields}`;
  const isCompleted = requiredFields.every(Boolean);
  return (
    <div className="w-full mb-4">
      {!chapter.isPublished && (
        // <Banner
        //   variant="warning"
        //   label="Chapter is not yet published. This chapter will not be visible in the course"
        // />
        <Alert className="bg-yellow-400 border border-orange-400">
          <div className="flex items-center">
            <CircleAlertIcon className="h-4 w-4" />
            <AlertTitle>
              <AlertDescription className="h-4 pl-2">
                Chapter is not yet published. This chapter will not be visible
                in the course
              </AlertDescription>
            </AlertTitle>
          </div>
        </Alert>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-80 mb-6 text-[#b98ee4] hover:text-[#853bce]">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Course Edit
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium text-[#b98ee4]">
                  Chapter Creation
                </h1>
                {isCompleted ? (
                  <span className="text-sm text-green-500 font-bold">
                    ✔ Completed {completionText} fields
                  </span>
                ) : (
                  <span className="text-sm text-[#853bce]">
                    Completed {completionText} fields
                  </span>
                )}
              </div>
              <ChapterVisibility
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div className="flex justify-end pt-2">
              <ChapterActions
                disabled={!isCompleted}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2 text-[#853bce]">
              <IconBadge icon={FileVideo} />
              <h2 className="text-xl">Upload Video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}></ChapterVideoForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chapterIdPage;
