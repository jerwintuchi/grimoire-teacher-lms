"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";
import qs from "query-string";
interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "py-2 px-3 text-sm border border-[#b98ee4] rounded-full hover:border-[#853bce] hover:text-[#853bce] flex items-center gap-x-1 transition",
        isSelected &&
          "bg-[#853bce] border-[#853bce] text-white hover:text-white" //change style if active
      )}>
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
