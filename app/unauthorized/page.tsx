import React from "react";
import MainNav from "../landing/mainnav";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const UnauthorizedPage = () => {
  return (
    <div className="bg-[#13111c] bg-full text-white">
      {/* Navbar */}
      <MainNav />

      {/* Unauthorized Page Content */}
      <div className="bg-[#13111c] h-[calc(100vh-72px)] text-red-700 flex flex-col justify-center items-center">
        <Image
          width={50} // specify the width of the image
          height={50} // specify the height of the image
          src="error.svg"
          alt="Unauthorized Access"
          className="h-auto w-auto mb-4"
        />
        <h1 className="text-4xl">Uh oh! Access Denied</h1>
        <p className="text-lg mb-4">
          It looks like you tried to access a page you don't have permission
          for.
        </p>
        <Link href="/landing">
          <button className="bg-[#291839] hover:bg-[#853bce] text-white font-bold py-2 px-4 rounded">
            <SignOutButton redirectUrl="/sign-in">Sign in again</SignOutButton>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
