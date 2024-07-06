import { db } from "@/lib/db";
import { Course, Enrollment, Tier } from "@prisma/client";

type EnrollmentWithCourse = Enrollment & {
  course: Course & {
    tier: Tier | null;
  };
};

const groupByCourse = (enrollments: EnrollmentWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  enrollments.forEach((enrollment) => {
    const courseTitle = enrollment.course.title;
    const courseTier = enrollment.course.tier;
    const coursePrice = courseTier?.price ?? 0;

    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += coursePrice;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const enrollments = await db.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            tier: true, // Include the tier property in the query
          },
        },
      },
    });

    const groupedEarnings = groupByCourse(enrollments);
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total,
      })
    );

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = enrollments.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS] Error:", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
