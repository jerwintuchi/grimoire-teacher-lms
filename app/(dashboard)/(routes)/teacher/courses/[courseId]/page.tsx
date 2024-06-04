import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
  ListCollapseIcon,
} from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChaptersForm from "./_components/chapters-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

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
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];
  const totalFields = requiredFields.length; //get number of all required fields
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields} out of ${totalFields}`;
  const isCompleted = requiredFields.every(Boolean);
  return (
    <div className="p-6 grow">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
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
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2 text-white "></div>
          <TitleForm initialData={course} courseId={course.id} />
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
          <div className="flex items-center gap-x-2 text-yellow-500"></div>
          <PriceForm initialData={course} courseId={course.id} />
          <div>
            <div className="flex items-center gap-x-2 text-yellow-500"></div>
            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
