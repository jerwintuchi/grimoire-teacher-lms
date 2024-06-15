"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}
const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-[#b98ee4] p-2 rounded-md",
        isActive &&
          "bg-[#b98ee4] text-[#291839] font-medium hover:bg-[#b98ee4]",
        isCompleted &&
          "bg-[#4c0494] text-[#e5d9f0] font-medium hover:bg-[#b98ee4]",
        isCompleted && isActive && "bg-[#4c0494] text-[#e5d9f0]"
      )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 hover:text-slate-600",
            isActive && "text-[#aa74db]",
            isCompleted && "text-[#e5d9f0]"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-[#b98ee4] rounded-full h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-[#4c0494]"
        )}></div>
    </button>
  );
};

export default CourseSidebarItem;