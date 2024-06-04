"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MainNav = () => {
  return (
    <nav className="bg-transparent backdrop-filter backdrop-blur-sm text-white p-2 sticky top-0 z-50">
      <div className="flex justify-start p-2">
        <Link href="/landing">
          <Button variant="ghost" className="hover:bg-[#853bce] ">
            Home
          </Button>
        </Link>
        <Link href="/landing/about">
          <Button variant="ghost" className="hover:bg-[#853bce]  ">
            About
          </Button>
        </Link>

        {/* FOR SIGN UP BUTTONS */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" bg-[#853bce] ">
                Start Now
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#291839]">
                <NavigationMenuLink>
                  <Link href="/sign-in">
                    <Button className="bg-[#291839] hover:bg-[#853bce] hover:text-black w-full">
                      Sign In
                    </Button>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <Link href="/sign-up">
                    <Button className="bg-[#291839] hover:bg-[#853bce] hover:text-black">
                      Register
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default MainNav;
