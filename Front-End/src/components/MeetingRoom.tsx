import React from 'react';

interface MeetingRoomProps {
    id: number;
    title: string;
    date: string;
    details: string;
    onBook: () => void;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({ id, title, date, details, onBook }) => {
    return (
        <div className="max-w-lg w-full lg:flex">
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url('https://source.unsplash.com/random/800x600?room')`}} title="Meeting Room Image">
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <p className="text-sm text-gray-600 flex items-center">
                        Date: {date}
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">{details}</p>
                </div>
                <div className="flex items-center">
                    <button onClick={onBook} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Book</button>
                </div>
            </div>
        </div>
    );
};

export default MeetingRoom;
