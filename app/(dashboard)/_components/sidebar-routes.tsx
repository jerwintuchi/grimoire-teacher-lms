"use client";
import {
  BarChart2Icon,
  Home,
  Layout,
  LibraryBig,
  LucideIcon,
  Search,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const teacherRoutes = [
  {
    Icon: Home, // Analytics Icon
    label: "Home",
    href: "/",
  },
  {
    Icon: LibraryBig, // Teacher Icon Courses
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

  const routes = teacherRoutes;

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
