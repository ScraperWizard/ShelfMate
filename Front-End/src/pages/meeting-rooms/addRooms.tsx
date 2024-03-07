import React, { useState } from 'react';
import MeetingRooms from '../../components/meetingRooms/meetingRooms';
import socket from '../../Socket';

interface Room {
  capacity: number,
  equipment: string,
  maintinance_start: Date,
  maintinance_end: Date,
}

function AddRooms() {

  const [formData, setFormData] = useState<Room>({
    capacity: 0,
    equipment: "",
    maintinance_start: new Date(),
    maintinance_end: new Date(),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    const parsedValue = name.includes("maintinance") ? new Date(value) : value;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };
  
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{

    event.preventDefault();
    formData.capacity = Number(formData.capacity)
  

    console.log("this is what add room recieves",formData);
   
    socket.emit("add-room", formData);
    socket.on("add-room-response", (message: any) => {
      console.log("this is the message", message);
      
    });
  }
  return (
    <MeetingRooms data-name="meeting-rooms-add">
      <div className="pt-4 div" data-name="add-book-admin">
        <h1 className="py-2 text-2xl font-semibold">
          Add rooms settings
        </h1>
      </div>
      <div
        className="p-6"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-5">
          Add a meeting room
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="capacity"
              className="block text-gray-700 font-bold mb-2"
            >
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="equipment"
              className="block text-gray-700 font-bold mb-2"
            >
              Equipment
            </label>
            <input
              type="text"
              id="equipment"
              name="equipment"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="maintenance_start"
              className="block text-gray-700 font-bold mb-2"
            >
              Maintenance Start
            </label>
            <input
              type="date"
              id="maintinance_start"
              name="maintinance_start"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="maintinance_end"
              className="block text-gray-700 font-bold mb-2"
            >
              Maintenance End
            </label>
            <input
              type="date"
              id="maintinance_end"
              name="maintinance_end"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 button">
            <button
              type="submit"
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test"
            >
              Add meeting room
            </button>
          </div>
        </form>
      </div>
    </MeetingRooms>
  );
}

export default AddRooms;
