"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/ui/icon-badge";
import { BookOpen, BookOpenText } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  tier: string;
  progress: number | null;
  category: string | null;
}
export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  tier,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border border-[#853bce] rounded-lg p-3 h-full hover:text-[#cdb6e4]">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
          <div className="absolute top-0 right-0 p-1 hover:shadow-md">
            <Badge className="text-white bg-[#291839]">{tier}</Badge>
          </div>
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-[#b98ee4] font-medium text-lg group-hover:text-[#853bce] transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            <Badge className="text-[#b98ee4] bg-[#291839]">{category}</Badge>
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-[#b98ee4]">
              <IconBadge size="sm" icon={BookOpenText} />
              <span>
                {chaptersLength}{" "}
                {chaptersLength === 1 ? "Chapter only" : "Chapters"}
              </span>
            </div>
          </div>
          <div>
            {progress !== null ? (
              <div>TODO: PROGRESS COMPONENT</div>
            ) : (
              <p className="text-[#f3e66e] ">For {tier} tier users</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
