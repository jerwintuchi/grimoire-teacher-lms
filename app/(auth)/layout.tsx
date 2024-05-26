import "../globals.css";
import MainNav from "../landing/mainnav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNav />
      <div className="h-[calc(100vh-72px)] flex items-center justify-center bg-neutral-400 no-scroll">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
