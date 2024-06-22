interface User {
  publicMetadata: {
    role?: string;
  };
}

export const isTeacher = (userId?: string | null, user?: User | null) => {
  if (userId === process.env.NEXT_PUBLIC_TEACHER_ID) {
    // if an .env variable is set to a valid user id, then it's a teacher
    return true;
  } else if (user?.publicMetadata?.role !== "student" || "") {
    // else if the publicmetadata is not set to student or empty
    return true;
  } else {
    return false;
  }
};
