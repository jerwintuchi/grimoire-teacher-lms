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
import { cn } from "@/lib/utils";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuRadioTier } from "@/components/dropdowntier";
import React from "react";
import { Badge } from "@/components/ui/badge";

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
  code: z
    .string()
    .min(3, {
      message: "Course Code is required",
    })
    .max(12, {
      message: "Course code must be 6-10 characters long",
    }),
  tier: z.string().min(1, {
    message: "Tier is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      tier: "Free",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // send a request to api
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = {
        ...values, // form values from title and code
        tierId: selectedTier, // tier dropdown value
      };
      const response = await axios.post("/api/courses", data);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course successfully created");
    } catch {
      toast.error("Something went wrong");
    }
  };

  //hook for tier dropdown menu
  const [selectedTier, setSelectedTier] = React.useState<string>("Free");

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
          </form>
        </Form>

        {/*------------------------------------FORM--SEPARATOR---------------------------------------------------*/}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#853bce]">Course Code</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#262046] px-3 py-2
                                         hover:border-[#643d88] text-[#853bce]
                                         focus:border-red-blue-500
                                         focus:outline-none !important
                                         placeholder-red-400"
                      disabled={isSubmitting}
                      placeholder="(Minimum of 3 characters) e.g. CS010"
                      {...field}
                    />
                    {/*HIDDEN INPUT TO INCLUDE THE tierId sa form when submitting */}
                  </FormControl>
                  <FormDescription className="text-[#643d88]">
                    Give your course a code.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*------------------------------------TIER--SEPARATOR---------------------------------------------------*/}
            <div className="flex items-center gap-x-2">
              <DropdownMenuRadioTier
                option={selectedTier}
                setOption={setSelectedTier}
              />
              <div className="flex items-center gap-x-2">
                <Badge className="text-[#b98ee4] bg-[#291839] text-xl hover:bg-[#573e70]">
                  {selectedTier}
                </Badge>
              </div>
            </div>
            {/*------------------------------------TIER--SEPARATOR---------------------------------------------------*/}
            <div className="flex items-center gap-x-2">
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
                className={cn(
                  "text-gray-300 bg-green-900  size-auto",
                  isValid &&
                    "bg-green-700 hover:bg-green-500 text-white size-auto"
                )}>
                {isValid ? "Continue" : "Complete the required fields"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
