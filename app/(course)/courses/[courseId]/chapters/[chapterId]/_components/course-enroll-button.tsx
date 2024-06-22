"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { LucideBookPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  tier: string;
  courseId: string;
}

const CourseEnrollButton = ({ tier, courseId }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="lg"
      className="w-full text-md md:w-auto text-[#b98ee4] bg-[#291839] hover:text-white hover:bg-[#853bce] rounded-full">
      <LucideBookPlus className="w-4 h-4 mr-2" />
      Enroll for {tier}
    </Button>
  );
};

export default CourseEnrollButton;
