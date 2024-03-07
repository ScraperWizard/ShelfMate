import React, { useState } from "react";
import socket from "../Socket";
interface MeetingRoomProps {
  Reserver_SID: any;
  availablity: number,
  capacity: number,
  equipment: string,
  id: number,
  maintinance_end: string,
  maintenance_start: string,
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({
  id,
  Reserver_SID,
  availablity,
  capacity,
  equipment,
  maintinance_end,
  maintenance_start
}) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };
  const handleReserve = (roomId: number) => {
    
    console.log("Reserving room with id", { roomId: roomId});
    socket.emit("reserve-meeting-rooms", {roomID: roomId});

    socket.on("reserve-meeting-rooms-response", (response) => {
      console.log(
        "This is the response for reserving a room",
        response
      );

    });
  }

  return (
    <div className="max-w-lg w-full lg:flex hover:shadow-lg transform hover:scale-105 transition-all" onClick={handleImageClick}>
      {isImageClicked ? ( 
        <div className="p-4">
          
          <div className="text-gray-900 font-bold text-xl mb-2" >{equipment} {id}</div> 
          <p className="text-gray-700 text-base">{capacity}</p>
        </div>
      ) : (
        <>
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url('https://source.unsplash.com/random/800x600?room')`,
            }}
            title="Meeting Room Image"
            // onClick={handleImageClick}
          ></div>
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center">
                Date: {maintenance_start}
                deadline: {maintinance_end}
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2">{equipment}</div>
              <p className="text-gray-700 text-base">{equipment}</p>
            </div>
            <div className="flex items-center">
              {availablity === 1 && capacity > 0 ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleReserve(id)}
                >
                  Available
                </button>
              ) : (
                <button
                  className="bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled
                >
                  Not Available
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MeetingRoom;
