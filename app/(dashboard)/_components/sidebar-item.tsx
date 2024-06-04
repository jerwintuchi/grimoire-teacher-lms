import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SidebarItemProps } from "./sidebar-routes";
import "../../../app/globals.css";
export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") || // If we are on the root page
    pathname === href || // For checking if we're on the exact same page
    pathname?.startsWith(`${href}/`); // For specific cases where we can be in a subroute of a specific route

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-[#b98ee4] text-sm font-semibold pl-6 transition-all hover:text-white hover:bg-[#853bce]",
        isActive &&
          "text-white bg-[#291839] hover:bg-[#b98ee4] hover:text-gray-200 border-l-8 border-[#853bce]" // Add transition class here
      )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-[#b98ee4]", isActive && "text-white")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full transition-all", // Remove opacity manipulation
          isActive && "border-[#853bce]" // Add border on active state
        )}
      />
    </button>
  );
};
