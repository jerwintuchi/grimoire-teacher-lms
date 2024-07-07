import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import AttachmentForm from "./_components/attachment-form";
import ChaptersForm from "./_components/chapters-form";
import CodeForm from "./_components/code-form";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeftCircle, CircleAlertIcon } from "lucide-react";
import { Actions } from "./_components/actions";
import { DropdownMenuRadioTier } from "@/components/dropdowntier";
import TierForm from "./_components/tier-form";
import QuizForm from "./_components/quiz-form";
import { AvatarStack } from "./_components/people-avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Students } from "./_components/students";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      quizzes: {
        include: {
          questions: {
            select: {
              id: true,
              text: true,
              options: true,
            },
          },
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const tiers = await db.tier.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  //get the enrolled students from this course
  const enrolledStudents = await db.enrollment.findMany({
    where: {
      courseId: course.id,
    },
    include: {
      user: true,
    },
  });

  const enrolledStudentsIds = enrolledStudents.map((student) => student.userId);

  const requiredFields = [
    course.title,
    course.code,
    course.tierId,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];
  const totalFields = requiredFields.length; //get number of all required fields
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields} out of ${totalFields}`;
  const isCompleted = requiredFields.every(Boolean);

  const isPublishable = requiredFields.every(Boolean);
  return (
    <>
      <div className="p-6 grow">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <Link href="/teacher/courses" className="text-[#b98ee4]">
              <Button className="gap-2 bg-[#291839] hover:bg-[#b98ee4]">
                <ArrowLeftCircle className="h-6 w-6" />
                <p>Back to courses</p>
              </Button>
            </Link>

            {!course.isPublished && (
              <>
                <Alert className="bg-yellow-400 border border-orange-400">
                  <CircleAlertIcon className="h-4 w-4" />
                  <AlertTitle>
                    <AlertDescription className="flex h-4 pl-2 overflow-wrap: break-word">
                      Chapter is not yet published. This chapter will not be
                      visible in the course
                    </AlertDescription>
                  </AlertTitle>
                </Alert>
              </>
            )}
            <h1 className="text-2xl font-medium text-white">Course Creation</h1>
            <span className="text-sm text-red-500">
              {isCompleted ? (
                <span className="text-sm text-green-500 font-bold">
                  ✔ Completed {completionText} fields
                </span>
              ) : (
                <span className="text-sm text-[#643d88]">
                  Complete {completionText} fields to publish your Course
                </span>
              )}
            </span>
            <div className="flex items-center gap-x-2 h-6 w-6 pt-4 text-[#b98ee4]">
              <Badge className="text-[#b98ee4] bg-[#291839] text-md">
                Publisher
              </Badge>
              {course.userId === user?.id && (user.firstName || user.lastName)
                ? user.firstName
                : user?.lastName || user?.username}
            </div>
          </div>
          <Actions
            courseId={params.courseId}
            isPublished={course.isPublished}
            disabled={!isCompleted}
          />
        </div>
        {/*-----------------------------------------------COURSE-TIER-----------------------------------------------*/}
        <div className="flex flex-row justify-between pt-6 gap-x-2">
          <div className="">
            <TierForm
              initialData={course}
              courseId={course.id}
              options={tiers.map((tier) => ({
                value: tier.id,
              }))}
            />
            {/* <Badge className="text-[#b98ee4] bg-[#291839] text-xl hover:bg-[#573e70]">
              {course.tierId + " Tier"}
            </Badge> */}
          </div>
          <div>
            <p className="text-[#b98ee4]">Students</p>
            <AvatarStack
              avatars={[
                { name: "John Doe", image: "https://i.pravatar.cc/150" },
                { name: "Edgar Allan Poe", image: "https://i.pravatar.cc/150" },
                { name: "Jane Doe", image: "https://i.pravatar.cc/150" },
                {
                  name: "Fyodor Dostoevsky",
                  image: "https://i.pravatar.cc/150",
                },
              ]}
            />
            <Students
              courseId={course.id}
              enrolledStudentsIds={enrolledStudentsIds}
            />
          </div>
        </div>

        {/*-----------------------------------------------COURSE-TIER-----------------------------------------------*/}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2 text-white "></div>
            <TitleForm initialData={course} courseId={course.id} />
            <CodeForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 text-red-500"></div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2 text-yellow-500"></div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <QuizForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
