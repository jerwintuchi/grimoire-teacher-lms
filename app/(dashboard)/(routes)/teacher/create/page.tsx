"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

// require the user to atleast 1 string input and limit the title to 50 characters max
const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .max(50, {
      message: "Must be 50 characters or less",
    }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // send a request to api
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course successfully created");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1
          style={{ fontWeight: "bold", fontSize: "1.5em" }}
          className="text-[#853bce]">
          Name the course
        </h1>
        <p className="text-[#643d88]">
          What should be the name of your course?
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#853bce]">Course Title</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#262046] px-3 py-2
                                         hover:border-[#643d88] text-[#853bce]
                                         focus:border-red-blue-500
                                         focus:outline-none !important
                                         placeholder-red-400"
                      disabled={isSubmitting}
                      placeholder="like 'Quantum Physics' , 'Game Development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[#643d88]">
                    What topic will you teach?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-cetner gap-x-2">
              <Link href={"/teacher/courses"}>
                <Button
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-800 hover:text-white size-auto">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="text-black bg-[#643d88] hover:bg-green-700 hover:text-white size-auto">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
