import React, { useState } from "react";
import MeetingRoom from "../components/MeetingRoom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import socket from "../Socket";
import { useAuth } from "../context/AuthProvider";

interface Room {
  Reserver_SID: any;
  availablity: number;
  capacity: number;
  equipment: string;
  id: number;
  maintinance_end: string;
  maintenance_start: string;
}

const ReserveRooms: React.FC = () => {
  const [meetingRooms, setMeetingRooms] = useState<Room[]>([]);

  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      socket.emit("get-reserved-mr", {});

      socket.on("get-reserved-mr-response", (response) => {
        console.log("This is the response from the get reserved meeting rooms", response)

        setMeetingRooms(response);
      });
    }
  }, [accessToken]);

  return (
    <>
      <Navbar></Navbar>
      <div
        className="container mx-auto flex flex-col items-center h-screen mt-10 px-12"
        data-name="reserver-rooms"
      >
        <div className="mb-4">
          <Link
            to="/meeting-room"
            className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
          >
            Book Room
          </Link>
          <Link
            to="/reserver-rooms"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
          >
            Reserved Rooms
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {meetingRooms.map((room) => (
            <MeetingRoom
              id={room.id}
              Reserver_SID={room.Reserver_SID}
              maintinance_end={room.maintinance_end}
              maintenance_start={room.maintenance_start}
              equipment={room.equipment}
              availablity={room.availablity}
              capacity={room.capacity}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReserveRooms;
