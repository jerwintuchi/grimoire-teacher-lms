import { useUser } from "@clerk/nextjs";

export const GreetUser = () => {
  const { user } = useUser();
  return <div className="text-1xl text-[#853bce] ">Hi, {user?.username}!</div>;
};
