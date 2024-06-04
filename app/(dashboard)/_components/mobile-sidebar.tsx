import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { Logo } from "./logo";
export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition text-white">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <div className="flex flex-items-center justify-center">
          <Logo />
          <div className="mr-auto mt-auto mb-auto text-size-xs text-red-700 font-bold">
            © 2024 Grimoire.
          </div>
        </div>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
