import "../globals.css";
import MainNav from "../landing/mainnav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-[#13111c]">
        <video
          src={require("../../public/GrimoireBG.mp4")}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0" // Adjust z-index as needed
        />
        <MainNav />
        <div className="h-[calc(100vh-72px)] flex items-center justify-center bg-[#13111c] no-scroll z-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
