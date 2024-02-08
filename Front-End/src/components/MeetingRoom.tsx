import React, { useState } from "react";

interface MeetingRoomProps {
  id: number;
  title: string;
  date: string;
  details: string;
  status: string;
  capacity: number;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({
  id,
  title,
  date,
  details,
  status,
  capacity,
}) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  return (
    <div className="max-w-lg w-full lg:flex hover:shadow-lg transform hover:scale-105 transition-all" onClick={handleImageClick}>
      {isImageClicked ? ( 
        <div className="p-4">
          <div className="text-gray-900 font-bold text-xl mb-2" >{title}</div>
          <p className="text-gray-700 text-base">{details}</p>
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
                Date: {date}
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
              <p className="text-gray-700 text-base">{details}</p>
            </div>
            <div className="flex items-center">
              {status === "book" && capacity > 0 ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {status}
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
