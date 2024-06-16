"use client";

import { Button } from "@/components/ui/button";
import { LucideBookPlus } from "lucide-react";

interface CourseEnrollButtonProps {
  tier: string;
  courseId: string;
}
const CourseEnrollButton = ({ tier, courseId }: CourseEnrollButtonProps) => {
  return (
    <Button
      size="lg"
      className="w-full text-md md:w-auto text-[#b98ee4] bg-[#291839] hover:text-white hover:bg-[#853bce] rounded-full">
      <LucideBookPlus className="w-4 h-4 mr-2" />
      Enroll for {tier}
    </Button>
  );
};

export default CourseEnrollButton;
