import React, { useState } from "react";
import MeetingRoom from "../components/MeetingRoom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import socket from "../Socket";
import { useAuth } from "../context/AuthProvider";
const ReserveRooms: React.FC = () => {
  const [meetingRooms, setMeetingRooms] = useState([
    {
      id: 1,
      title: "Room 101",
      date: "2024-02-05",
      details: "This room is suitable for small meetings.",
      status: "cancel",
      capacity: 4,
    },
    {
      id: 2,
      title: "Room 202",
      date: "2024-02-06",
      details: "This room is suitable for medium-sized meetings.",
      status: "cancel",
      capacity: 4,
    },
  ]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.emit("get-reserved-rooms", { username: user.username });

      socket.on("cancel-room-response", (roomId: number) => {
        setMeetingRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === roomId ? { ...room, status: "cancel", capacity: room.capacity + 1 } : room
          )
        );
      });

      return () => {
        socket.off("reserved-rooms-response");
      };
    }
  }, [user]);

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
            key={room.id}
            id={room.id}
            title={room.title}
            date={room.date}
            details={room.details}
            status={room.status}
            capacity={room.capacity}
          />
        ))}
        </div>
      </div>
    </>
  );
};

export default ReserveRooms;
