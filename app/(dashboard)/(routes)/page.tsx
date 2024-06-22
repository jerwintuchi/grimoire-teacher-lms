import { Roles } from "@/app/types/globals";
import { checkRole } from "@/app/utils/roles";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function TeacherDashBoard() {
  const user = await currentUser();

  // if (checkRole("teacher") && user) {
  //   // Redirect to root for teacher or publicMetadata.role === "teacher"
  //   return redirect("/");
  // // } else
  // if (role === "student" && user) {
  //   //from checkRole("student") to role
  //   return redirect("/unauthorized");
  // }

  if (!user) {
    return redirect("/unauthorized");
  }

  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
