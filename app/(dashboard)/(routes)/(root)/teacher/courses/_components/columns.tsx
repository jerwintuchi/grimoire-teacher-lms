"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pen, SortAscIcon, SortDesc } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          {column.getIsSorted() === "asc" ? (
            <SortAscIcon className="ml-2 h-4 w-4" />
          ) : (
            <SortDesc className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Code
          {column.getIsSorted() === "asc" ? (
            <SortAscIcon className="ml-2 h-4 w-4" />
          ) : (
            <SortDesc className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "tierId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tier
          {column.getIsSorted() === "asc" ? (
            <SortAscIcon className="ml-2 h-4 w-4" />
          ) : (
            <SortDesc className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const tier = row.getValue("tierId");

      return (
        <span className={cn("text-[#b98ee4] font-bold")}>
          <Badge className="text-[#b98ee4] bg-[#291839] text-sm border-2 border-[#a65eee] hover:bg-[#573e70]">
            {!tier ? "Free" : `${tier}`}
          </Badge>
        </span>
      );
    },
  },
  {
    accessorKey: "isPublished", //isPublished
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Published
          {column.getIsSorted() === "asc" ? (
            <SortAscIcon className="ml-2 h-4 w-4" />
          ) : (
            <SortDesc className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge
          className={cn(
            "bg-gray-200 text-gray-700",
            isPublished && "bg-[#853bce] text-white"
          )}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className=" bg-[#853bce] hover:bg-[#4c2d69] border-none">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pen className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
