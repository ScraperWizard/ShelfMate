import React, { useEffect, useState } from 'react'
import MeetingRooms from '../../components/meetingRooms/meetingRooms'
import socket from '../../Socket';
import MeetingRoom from '../../components/MeetingRoom';
interface Room {
    Reserver_SID: any;
    availablity: number,
    capacity: number,
    equipment: string,
    id: number,
    maintinance_end: string,
    maintenance_start: string,
  }

function getMaintenanceRooms() {
    const [meetingRooms, setMeetingRooms] = useState<Room[]>([]);
    useEffect(() => {
        socket.emit("get-maintenance-mr");
        socket.on("get-maintenance-mr", (response) => {
            console.log("This is the response from get-maintenance-mr", response)
            setMeetingRooms(response);
        })
    })
  return (
    <MeetingRooms data-name="meeting-rooms-add">
      <div className="pt-4 div" data-name="add-book-admin">
        <h1 className="py-2 text-2xl font-semibold">
          View maintenance meeting rooms
        </h1>
      </div>
      <div
            className="p-6"
            style={{ maxHeight: "500px", overflowY: "auto" }}

          >
            {/* <h3 className="text-xl font-semibold text-gray-900 mb-5">
                view rooms
            </h3> */}
            <div className="flex">
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
    </MeetingRooms>
  )
}

export default getMaintenanceRooms
