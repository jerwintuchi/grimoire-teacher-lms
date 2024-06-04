import "../globals.css";
import MainNav from "../landing/mainnav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-[#13111c]">
        <MainNav />
        <div className="h-[calc(100vh-72px)] flex items-center justify-center bg-[#13111c] no-scroll">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
