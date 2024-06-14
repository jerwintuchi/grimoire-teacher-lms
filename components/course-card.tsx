"use client";

import Image from "next/image";
import Link from "next/link";

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
    <Link href={`/course/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border border-[#853bce] rounded-lg p-3 h-full">
        <div className="relaive w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
      </div>
    </Link>
  );
};
