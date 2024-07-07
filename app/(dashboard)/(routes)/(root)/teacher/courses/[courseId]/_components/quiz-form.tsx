"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const QuizForm = () => {
  return (
    <div className="mt-6 border border-[#643d88] bg-[#181622] rounded-md p-4">
      <div className="drop-shadow-lg text-white font-medium flex items-center justify-between">
        Course Quizzes
        <Button
          variant="outline"
          className="bg-[#181622] border border-[#643d88] hover:bg-[#853bce] hover:text-white">
          <>
            <Plus className="h-4 w-4 mr-2"></Plus>
            Add Quiz
          </>
        </Button>
      </div>
    </div>
  );
};

export default QuizForm;
