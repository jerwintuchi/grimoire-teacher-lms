import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button className="bg-[#291839] text-[#b98ee4] text-sm font-semibold pl-6 transition-all hover:text-white hover:bg-[#853bce]">
          Add a Course
        </Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
