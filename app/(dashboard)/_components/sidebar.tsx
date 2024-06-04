import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <>
      <div className="h-full flex border-red-800 flex-col overflow-y-auto bg-black shadow-sm">
        <div className="p-4 text-white border-radius-3xl flex items-center">
          Your Rank is (chuchuchu)
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-between">
          <Logo />
          <div className="mt-auto mb-auto text-size-xs text-red-700 font-bold">
            © 2024 Grimoire.
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
