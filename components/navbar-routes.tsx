"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { GreetUser } from "./greetings/greetuser";
import { Badge } from "./ui/badge";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  return (
    <>
      <div className="flex gap-x-2 ml-auto">
        {" "}
        ( (
        <div>
          <GreetUser />
          <Badge
            className="text-[#b98ee4] bg-[#291839]
                    hover:bg-[#853bce] hover:text-white border-[#853bce] px-8 size-auto">
            Teacher
          </Badge>
        </div>
        ) )
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </>
  );
};

export default NavbarRoutes;
