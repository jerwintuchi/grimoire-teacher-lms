"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Course } from "@prisma/client";

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
