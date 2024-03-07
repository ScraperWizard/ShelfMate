import React, { useEffect, useState } from "react";
import MeetingRooms from "../../components/meetingRooms/meetingRooms";
import socket from "../../Socket";
import MeetingRoom from "./template/MeetingRoom";
import { useAuth } from "../../context/AuthProvider";
import SettingsModal from "../../components/LibrarianPanel/settings/SettingsModal";
interface Room {
  Reserver_SID: any;
  availablity: number;
  capacity: number;
  equipment: string;
  id: number;
  maintinance_end: string;
  maintenance_start: string;
}

function AllRooms() {
  const [meetingRooms, setMeetingRooms] = useState<Room[]>([]);

  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      socket.emit("get-all-meeting-rooms", {});

      socket.on("get-all-meeting-rooms-response", (response) => {
        console.log(
          "This is the response from the get all rooms",
          response
        );

        setMeetingRooms(response);
      });
    }
  }, [accessToken]);
  return (
   
      <MeetingRooms data-name="meeting-rooms-add">
        <div className="pt-4 div" data-name="add-book-admin">
          <h1 className="py-2 text-2xl font-semibold">
            View reserved meeting rooms
          </h1>
        </div>
        <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
          
          <div className="flex">
            {meetingRooms && meetingRooms.length > 0 ? (
              meetingRooms.map((room) => (
                <MeetingRoom
                  id={room.id}
                  Reserver_SID={room.Reserver_SID}
                  maintinance_end={room.maintinance_end}
                  maintenance_start={room.maintenance_start}
                  equipment={room.equipment}
                  availablity={room.availablity}
                  capacity={room.capacity}
                  key={room.id}
                />
              ))
            ) : (
              <p>No meeting rooms available to show in the librarian.</p>
            )}
          </div>
        </div>
      </MeetingRooms>
   
  );
}

export default AllRooms;
