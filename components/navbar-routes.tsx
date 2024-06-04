"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { isTeacher } from "@/lib/teacher";
import { GreetUser } from "./greetings/greetuser";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  const validTeacher = isTeacher(userId);
  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <div>
          <GreetUser />
          <Link href="/">
            <Button
              size="sm"
              className="text-[#b98ee4] bg-[#291839]
                    hover:bg-[#853bce] hover:text-white border-red-900 size-auto">
              <LogOut className="h-4 w-4 mr-2" />
              Back to Student Mode
            </Button>
          </Link>
        </div> //isTeacher is from .env and teacherUser is from sessionClaims
      ) : (
        (
          <div>
            <GreetUser />
            <Link href="/teacher/courses">
              <Button
                size="sm"
                variant="ghost"
                className="text-[#b98ee4] bg-[#291839]
                    hover:bg-[#853bce] hover:text-white border-red-900 size-auto">
                Teacher Mode
              </Button>
            </Link>
          </div>
        ) || null
      )}

      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default NavbarRoutes;
