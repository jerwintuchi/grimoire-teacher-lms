import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
// Optional: import { confirmAlert } from 'react-confirm-alert';

interface StudentsProps {
  courseId: string;
  enrolledStudentsIds: string[];
}

export const Students = ({ courseId, enrolledStudentsIds }: StudentsProps) => {
  const handleUnenroll = async (studentId: string) => {
    try {
      const response = await axios.delete(`/api/unenroll/${courseId}`, {
        data: {
          studentId,
        },
      });

      if (response.status === 200) {
        toast.success("Student unenrolled successfully");
      } else {
        toast.error("Failed to unenroll student");
      }
    } catch (error) {
      console.log("Error unenrolling student:", error);
    }
  };

  const filteredEnrolledStudents = enrolledStudentsIds.filter(
    (studentId) => !enrolledStudentsIds.includes(studentId)
  );

  return (
    <div className="text-1xl text-[#a76be4] ">
      {filteredEnrolledStudents.length === 0 ? (
        <p>No enrolled students yet.</p>
      ) : (
        <ul>
          {filteredEnrolledStudents.map((studentId) => (
            <li key={studentId}>
              {/* Display student information (e.g., name, email) */}
              <Button onClick={() => handleUnenroll(studentId)}>
                Unenroll
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
