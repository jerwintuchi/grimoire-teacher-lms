import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <>
      <div className="h-full flex border-[#291839] flex-col overflow-y-auto bg-[#13111c] shadow-sm">
        <div className="p-4 text-white  flex items-center">
          Your Rank is (chuchuchu)
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-between">
          <Logo />
          <div className="mt-auto mb-auto text-size-xs text-[#b98ee4] font-bold">
            © 2024 Grimoire.
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
