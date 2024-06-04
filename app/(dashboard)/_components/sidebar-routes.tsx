"use client";
import {
  BarChart2Icon,
  Layout,
  LucideIcon,
  Search,
  TableProperties,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const guestRoutes = [
  {
    Icon: Layout, // Dashboard Icon
    label: "Dashboard",
    href: "/",
  },
  {
    Icon: Search, //Dashboard Icon (Non-Teacher)
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    Icon: TableProperties, // Teacher Icon Courses
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    Icon: BarChart2Icon, // Analytics Icon
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.Icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
