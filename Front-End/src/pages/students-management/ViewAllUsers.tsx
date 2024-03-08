import { useEffect, useState } from "react";
import socket from "../../Socket";
import StudentOptions from "../../components/students-managements/StudentOptions";
import UpdateSuer from "./EditUser/EditUser";

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
  City: string;
  Street_name: string;
  active: number;
  addressId: number;
  userID: number;
}

type GlobalUser = {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  City: string;
  Street_name: string;
  emailAddress: string;
  phoneNum: string;
  userType: string;
};

function AllUsers() {
  const [students, setStudents] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<GlobalUser | null>(null);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

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

  function convertToGlobalUser(user: User): GlobalUser {
    
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      firstName: user.first_name,
      lastName: user.last_name,
      City: user.City,
      Street_name: user.Street_name,
      emailAddress: user.email_address,
      phoneNum: user.mobile_number,
      userType: user.user_type,
    };
  }
  function printSelectedUser(user: User) {
    setSelectedUser(convertToGlobalUser(user));
    console.log("Selected User", user);
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(convertToGlobalUser(user));
    if(selectedUser === null) return;
    selectedUser.City = user.City;
    selectedUser.Street_name = user.Street_name;
    console.log("These are the attributes of Selected User", selectedUser);
    setIsUpdateFormVisible(true);
  };

  const handleDeactivate = (id: number) => {
    console.log("this is the id of the user to be deactivated", {id : id});
    socket.emit("deactivate-user", {id : id});
    socket.on("deactivate-user-response", (response) => {
        console.log("this is the response from deactivating a user", response);
        
    })
  }

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
              <strong>City:</strong> {student.City}
            </p>
            <p>
              <strong>Street Name:</strong> {student.Street_name}
            </p>
            <p>
              <strong>User Type:</strong> {student.user_type}
            </p>

            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={() => {
                handleEditClick(student);
                printSelectedUser(student);
              }}
            >
              Edit
            </button>

            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={() => {
                handleDeactivate(student.id)
              }}
            >
              Deactivate
            </button>

            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={() => {
                handleEditClick(student);
                printSelectedUser(student);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {isUpdateFormVisible && (
        <UpdateSuer
          isVisible={isUpdateFormVisible}
          onClose={() => setIsUpdateFormVisible(false)}
          selectedUser={selectedUser}
        />
      )}
    </StudentOptions>
  );
}

export default AllUsers;
