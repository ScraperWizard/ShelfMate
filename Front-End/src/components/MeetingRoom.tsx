import React, { useState } from "react";
import socket from "../Socket";

interface MeetingRoomProps {
  Reserver_SID: any;
  availablity: number;
  capacity: number;
  equipment: string;
  id: number;
  maintenance_end: string;
  maintenance_start: string;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({
  id,
  Reserver_SID,
  availablity,
  capacity,
  equipment,
  maintenance_end,
  maintenance_start
}) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleReserve = (roomId: number) => {
    console.log("Reserving room with id", { roomId: roomId });
    socket.emit("reserve-meeting-rooms", { roomID: roomId });

    socket.on("reserve-meeting-rooms-response", (response) => {
      console.log("This is the response for reserving a room", response);
      setKey((prevKey) => prevKey + 1);
    });
  };

  const [key, setKey] = useState(0);

  const handleUnreserve = (roomId: number) => {
    console.log("Unreserving room with id", { roomId: roomId });
    socket.emit("check-out", { roomID: roomId });

    socket.on("check-out-response", (response) => {
      console.log("This is the response for unreserving a room", response);
      setKey((prevKey) => prevKey + 1);
    });
  };

  return (
    <div key={key} className="max-w-md w-full rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105 mb-4 mr-4">
      <div
        className="h-48 bg-cover bg-center cursor-pointer"
        style={{
          backgroundImage: `url('https://source.unsplash.com/random/800x600?room')`
        }}
        title="Meeting Room Image"
        onClick={() => setIsImageClicked(!isImageClicked)}
      ></div>
      <div className="bg-white p-4">
        <div className="text-gray-900 font-bold text-xl mb-2">
          {equipment} #{id}
        </div>
        <p className="text-gray-700 text-base">Capacity: {capacity}</p>
        <p className="text-gray-600 text-sm mt-2">
          Date: {maintenance_start} <br />
          Deadline: {maintenance_end}
        </p>
        <p className="text-gray-700 text-base mt-2">Description: {equipment}</p>
        <div className="mt-4">
          {availablity === 1 && capacity > 0 ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleReserve(id)}
            >
              Reserve
            </button>
          ) : (
            <button
              className="bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleUnreserve(id)}
            >
              Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
