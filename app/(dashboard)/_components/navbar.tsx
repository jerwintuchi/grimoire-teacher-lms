import NavbarRoutes from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    //NAVBAR WITH THE AVATARBOX
    <>
      <div className="p-6 h-full flex items-center shadow-sm backdrop-filter backdrop-blur-sm">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </>
  );
};
