"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { GreetUser } from "./greetings/greetuser";
import { SearchInput } from "./search-input";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block text-[#b98ee4]">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <div>
            <GreetUser />
            <Link href="/">
              <Button
                size="sm"
                className="text-[#b98ee4] bg-[#291839]
                    hover:bg-[#853bce] hover:text-white border-red-900 size-auto">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
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
    </>
  );
};

export default NavbarRoutes;
