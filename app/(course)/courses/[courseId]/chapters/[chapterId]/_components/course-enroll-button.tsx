"use client";

import { Button } from "@/components/ui/button";

interface CourseEnrollButtonProps {
  tier: string;
  courseId: string;
}
const CourseEnrollButton = ({ tier, courseId }: CourseEnrollButtonProps) => {
  return <Button>Enroll for {tier}</Button>;
};

export default CourseEnrollButton;
