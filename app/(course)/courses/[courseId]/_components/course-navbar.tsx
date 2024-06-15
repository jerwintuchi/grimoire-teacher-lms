import NavbarRoutes from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <>
      {" "}
      {/* removed the h-full */}
      <div className="p-4  flex items-center bg-[#13111c] shadow-sm">
        <NavbarRoutes />
      </div>
    </>
  );
};

export default CourseNavbar;
