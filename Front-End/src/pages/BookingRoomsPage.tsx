import React, { useState } from 'react';
import MeetingRoom from '../components/MeetingRoom';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import {useEffect} from 'react'
import socket from '../Socket';

const MeetingRoomsPage: React.FC = () => {
    // this is like a placeholder I will remove it later
    const [meetingRooms, setMeetingRooms] = useState([
        {
            id: 1,
            title: "Room 101",
            date: "2024-02-05",
            details: "This room is suitable for small meetings.",
            status : "book"
        },
        {
            id: 2,
            title: "Room 202",
            date: "2024-02-06",
            details: "This room is suitable for medium-sized meetings.",
            status : "book"
        },
        {
            id: 3,
            title: "Room 303",
            date: "2024-02-07",
            details: "This room is suitable for large meetings.",
            status : "book"
        }
    ]);

    useEffect(() => {
        
        socket.emit('getMeetingRooms');
    
        socket.on('meetingRoomsData', (message) => {
          setMeetingRooms(message);
        });
    

        return () => {
          socket.off('meetingRoomsData');
        };
      }, []); 


    return (
        <>
        <Navbar></Navbar>
        <div className="container mx-auto flex flex-col items-center h-screen mt-10 px-12" data-name="meeting-room">
            {/* <h1 className="text-3xl font-bold mb-4">Meeting Rooms</h1> */}
            <div className="mb-4">
            <Link to="/meeting-room" className="mr-4 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Book Room</Link>
            <Link to="/reserver-rooms" className="bg-gray-500 hover:bg-gray-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reserved Rooms</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {meetingRooms.map(room => (
                    <MeetingRoom 
                        key={room.id}
                        id={room.id}
                        title={room.title}
                        date={room.date}
                        details={room.details}
                        status={room.status}
                    />
                ))}
            </div>
        </div>
        </>
        
    );
};

export default MeetingRoomsPage;
