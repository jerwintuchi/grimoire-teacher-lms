"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Question } from "@prisma/client";

type QuizFormInitialData = {
  quizzes: any;
  title: string;
  questions: {
    text: string;
    options: string[];
  }[];
};

type QuizFormProps = {
  initialData: QuizFormInitialData;
  courseId: string;
};
type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
};

const QuizForm = ({ initialData, courseId }: QuizFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      questions: [{ text: "", options: [] }],
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await db.quiz.create({
        data: {
          ...data,
          courseId: courseId,
        },
      });
      reset();
      router.refresh(); // Refresh the page or navigate to the quiz list page
    } catch (error) {
      console.error("Error creating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* ... existing fields */}
        {initialData.quizzes?.length > 0 && initialData.quizzes[0].questions?.length > 0 && (
          <>
            <label htmlFor="quizQuestions">Questions</label>
            {initialData.quizzes[0].questions.map((question: { id: any; text: string | number | readonly string[] | undefined; }, index: number) => (
              <div key={question.id || index}>
                <Textarea
                  {...register(`questions.${index}.text`, { required: true })}
                  placeholder={`Enter question ${index + 1}`}
                  defaultValue={question.text} // Use default value from initialData
                />
                {/* ... fields for options */}
              </div>
            ))}
          </>
        )}
        <Button type="submit" disabled={loading}>
          {/* ... existing button content */}
        </Button>
      </div>
    </form>
  );
};

export default QuizForm;
