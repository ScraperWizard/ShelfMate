import { useEffect, useState } from "react";
import socket from "../../Socket";
import StudentOptions from "../../components/students-managements/StudentOptions";

interface User {
  id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email_address: string;
  mobile_number: string;
  enrolled: number;
  user_type: string;
  city: string;
  street_name: string;
  active: number;
  addressId: number;
  userID: number;
}

function AllUsers() {
  const [students, setStudents] = useState<User[]>([]);

  useEffect(() => {
    socket.emit("get-all-users", {});

    socket.on("get-all-users-response", (response: User[]) => {
      console.log("This is the response from getting all users", response);
      setStudents(response);
    });

    return () => {
      socket.off("get-all-users-response");
    };
  }, []);

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
            <p>
              <strong>City:</strong> {student.city}
            </p>
            <p>
              <strong>Street Name:</strong> {student.street_name}
            </p>
            <p>
              <strong>User Type:</strong> {student.user_type}
            </p>

            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Edit
            </button>
          </div>
        ))}
      </div>
    </StudentOptions>
  );
}

export default AllUsers;
