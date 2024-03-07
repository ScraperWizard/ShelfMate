import { useEffect, useState } from "react";
import socket from "../../Socket";
import StudentOptions from "../../components/students-managements/StudentOptions";

interface Student {
  username: string;
  password: string;
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  mobile_number: string;
  enrolled: number;
  user_type: string;
}

function Unenrolled() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    socket.emit("view-unenrolled-students", {});

    socket.on("view-unenrolled-students-response", (response: Student[]) => {
      console.log(
        "This is the response from the viewing enrolled students",
        response
      );
      setStudents(response);
    });
    return () => {
      socket.off("view-enrolled-students-response");
    };
  }, []);

  const handleEnroll = (userID: number) => {

    console.log("This is the user id", userID);
    socket.emit("enrolled-student", { userId: userID });
    socket.on("enrolled-student-response", (response) => {
      console.log("This is the response from enrolling a student", response);

      socket.emit("view-unenrolled-students", {});

      socket.on("view-unenrolled-students-response", (response: Student[]) => {
        console.log(
          "This is the response from the viewing enrolled students",
          response
        );
        setStudents(response);
      });
      return () => {
        socket.off("view-enrolled-students-response");
      };
    });
  };

  return (
    <StudentOptions>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white shadow-md rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-xl font-bold mb-2">
              {student.first_name} {student.last_name}
            </h2>
            <p>
              <strong>Username:</strong> {student.username}
            </p>
            <p>
              <strong>Email:</strong> {student.email_address}
            </p>
            <p>
              <strong>Mobile Number:</strong> {student.mobile_number}
            </p>

            <p>
              <strong>Enrolled:</strong>{" "}
              {student.enrolled === 1 ? "Enrolled" : "Not Enrolled"}
            </p>

            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
              onClick={() => handleEnroll(student.id)}
            >
              Accept
            </button>

            {/* <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reject
          </button> */}
          </div>
        ))}
      </div>
    </StudentOptions>
  );
}

export default Unenrolled;
