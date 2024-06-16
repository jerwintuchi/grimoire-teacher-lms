import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import getChapter from "@/actions/get-chapter";
import Banner from "@/components/banner";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
const ChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You have finished this chapter" variant="success" />
      )}

      {isLocked && (
        <Banner
          label="You need to purchase a tier for this chapter"
          variant="warning"
        />
      )}
      <div className="felx flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center">
          <h2 className="text-2xl font-semibold mb-2 text-[#b98ee4]">
            {chapter.title}
          </h2>
          {purchase ? (
            <div>{/* TODO Add CourseProgressButton */}</div>
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              tier={course?.tier?.id || "Free"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
