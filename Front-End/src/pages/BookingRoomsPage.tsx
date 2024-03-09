import React, { useState, useEffect } from "react";
import MeetingRoom from "../components/MeetingRoom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import socket from "../Socket";

interface Room {
  Reserver_SID: any;
  availablity: number;
  capacity: number;
  equipment: string;
  id: number;
  maintinance_end: string;
  maintinance_start: string;
}

const MeetingRoomsPage: React.FC = () => {
  const [meetingRooms, setMeetingRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    console.log("Getting meeting rooms", { query: searchQuery });
    socket.emit("get-meeting-rooms", { query: searchQuery });

    socket.on("get-meeting-rooms-response", (message) => {
      console.log("This is the response from the get meeting rooms", message);
      setMeetingRooms(message);
    });

    return () => {
      socket.off("meetingRoomsData");
    };
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div
        className="container mx-auto flex flex-col items-center h-screen mt-10 px-12"
        data-name="meeting-room"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search meeting rooms by equipment..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <Link
            to="/meeting-room"
            className="mr-4 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Book Room
          </Link>
          <Link
            to="/reserver-rooms"
            className="bg-gray-500 hover:bg-gray-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reserved Rooms
          </Link>
        </div>
        {meetingRooms && meetingRooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetingRooms.map((room) => (
              <MeetingRoom
                key={room.id}
                id={room.id}
                Reserver_SID={room.Reserver_SID}
                maintenance_end={room.maintinance_end}
                maintenance_start={room.maintinance_start}
                equipment={room.equipment}
                availablity={room.availablity}
                capacity={room.capacity}
              />
            ))}
          </div>
        )}
        {(!meetingRooms || meetingRooms.length === 0) && (
          <p className="text-gray-500">No meeting rooms found.</p>
        )}
      </div>
    </>
  );
};

export default MeetingRoomsPage;
