import React from "react";
import MainNav from "./mainnav";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="relative h-screen">
      <video
        src={
          "https://utfs.io/f/b37b0551-3036-4e7d-bac9-d8a98d72f0d3-d4dm8h.mp4"
        }
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0" // comment for prod
      />
      <div className="bg-black z-10">
        <MainNav />
      </div>

      <div className="absolute inset-0 h-[calc(100vh-72px)] flex flex-col justify-center items-center z-20">
        <Image
          width={50}
          height={50}
          src="grimoire-logo.svg"
          alt="Logo"
          className="h-auto w-auto mt-16"
        />
      </div>
    </div>
  );
};

export default LandingPage;
