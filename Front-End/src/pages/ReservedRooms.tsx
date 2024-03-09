import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MeetingRoom from "../components/MeetingRoom";
import Navbar from "../components/Navbar";
import socket from "../Socket";
import { useAuth } from "../context/AuthProvider";

interface Room {
  Reserver_SID: any;
  availability: number;
  capacity: number;
  equipment: string;
  id: number;
  maintinance_end: string;
  maintinance_start: string;
}

const ReserveRooms: React.FC = () => {
  const [meetingRooms, setMeetingRooms] = useState<Room[]>([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    const getMeetingRooms = () => {
      if (accessToken) {
        socket.emit("get-my-meeting-rooms", {});

        socket.on("get-my-meeting-rooms-response", (response) => {
          console.log(
            "This is the response from the get reserved meeting rooms",
            response
          );

          setMeetingRooms(response);
        });
      }
    };

    getMeetingRooms();
    return () => {
      socket.off("get-my-meeting-rooms-response");
    };
  }, [accessToken]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto flex flex-col items-center h-screen mt-10 px-12">
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
          {meetingRooms && meetingRooms.length > 0 ? (
            meetingRooms.map((room) => (
              <MeetingRoom
                key={room.id}
                id={room.id}
                Reserver_SID={room.Reserver_SID}
                maintenance_end={room.maintinance_end}
                maintenance_start={room.maintinance_start}
                equipment={room.equipment}
                availablity={room.availability}
                capacity={room.capacity}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-lg text-gray-600">No meeting rooms available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReserveRooms;
