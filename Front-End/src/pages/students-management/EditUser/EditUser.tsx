import { useEffect, useState } from "react";
import BookModal from "../../../components/BookModal";
import socket from "../../../Socket";

type User = {
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

type BookModalProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedUser: User | null;
};

const UpdateSuer: React.FC<BookModalProps> = ({
  isVisible,
  onClose,
  selectedUser,
}) => {
  let [updateData, setUpdateData] = useState<User>({
    id: 0,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    City: "",
    Street_name: "",
    emailAddress: "",
    phoneNum: "",
    userType: "",
    
  });
  const handleUpdatingData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("This is what it is recieved from view all users", selectedUser)
    const formData = new FormData(event.currentTarget);

    const id = formData.get("id") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const City = formData.get("City") as string;
    const Street_name = formData.get("Street_name") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const phoneNum = formData.get("phoneNum") as string;
    const userType = formData.get("userType") as string;

    
    console.log(updateData);
    updateData.id = Number(updateData.id)
    
    console.log(
      "this is what the update request get when updating",
      updateData
    );
    
    console.log("this is the real update data", {
        id: updateData.id,
        username: updateData.username,
        password: updateData.password,
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        city: updateData.City,
        street_name: updateData.Street_name,
        emailAddress: updateData.emailAddress,
        phoneNum: updateData.phoneNum,
        userType: updateData.userType,
        
    });
    socket.emit("update-user", {
        id: updateData.id,
        username: updateData.username,
        password: updateData.password,
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        city: updateData.City,
        street_name: updateData.Street_name,
        emailAddress: updateData.emailAddress,
        phoneNum: updateData.phoneNum,
        userType: updateData.userType,
        
    });
    socket.on("update-user-response", (message: any) => {
      console.log("this is the message from updating a user", message);
    });
  };

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value.trim() === "" || Number(value) === 0
        ? (selectedUser as User)[name as keyof User]
        : value,
    }));
  };
  
  useEffect(() => {
    if (selectedUser) {
      setUpdateData((prevData) => ({
        ...prevData,
        id: prevData.id || selectedUser.id || 0,
        username: prevData.username || selectedUser.username || "",
        password: prevData.password || selectedUser.password || "",
        firstName: prevData.firstName || selectedUser.firstName || "",
        lastName: prevData.lastName || selectedUser.lastName || "",
        City: prevData.City || selectedUser.City || "",
        Street_name: prevData.Street_name || selectedUser.Street_name || "",
        emailAddress: prevData.emailAddress || selectedUser.emailAddress || "",
        phoneNum: prevData.phoneNum || selectedUser.phoneNum || "",
        userType: prevData.userType || selectedUser.userType || "",
      }));
    }
  }, [selectedUser]);


  return (
    <BookModal isVisible={isVisible} onClose={onClose}>
        
      <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <h3 className="text-xl font-semibold text-gray-900 mb-5">
          Edit a user
        </h3>
        <form onSubmit={handleUpdatingData}>
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-gray-700 font-bold mb-2"
            >
              id
            </label>
            <input
              type="text"
              id="id"
              name="id"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser ? selectedUser.id : ""}
            />
          </div>
          {/* author */}

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser?.username}
            />
          </div>

          {/* barode */}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser?.password}
            />
          </div>

          {/* language */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-2"
            >
              firstName
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser?.firstName}
            />
          </div>

          {/* year_of_prod */}

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-bold mb-2"
            >
              lastName
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser?.lastName}
            />
          </div>

          {/* publisher */}

          <div className="mb-4">
            <label
              htmlFor="City"
              className="block text-gray-700 font-bold mb-2"
            >
              city
            </label>
            <input
              type="text"
              id="City"
              name="City"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser?.City}
            />
          </div>

          {/* subjects */}

          <div className="mb-4">
            <label
              htmlFor="Street_name"
              className="block text-gray-700 font-bold mb-2"
            >
              street_name
            </label>
            <input
              type="text"
              id="Street_name"
              name="Street_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser?.Street_name}
            />
          </div>

          {/* no_of_pages */}

          <div className="mb-4">
            <label
              htmlFor="emailAddress"
              className="block text-gray-700 font-bold mb-2"
            >
              emailAddress
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser?.emailAddress}
            />
          </div>

          {/* price */}

          <div className="mb-4">
            <label
              htmlFor="phoneNum"
              className="block text-gray-700 font-bold mb-2"
            >
              phoneNum
            </label>
            <input
              type="number"
              id="phoneNum"
              name="phoneNum"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
              defaultValue={selectedUser?.phoneNum}
            />
          </div>


          <div className="mb-4">
            <label
              htmlFor="userType"
              className="block text-gray-700 font-bold mb-2"
            >
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUpdate}
            >
              <option value="">Select User Type</option>
              <option value="student">Student</option>
              <option value="librarian">Librarian</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </BookModal>
  );
};

export default UpdateSuer;
