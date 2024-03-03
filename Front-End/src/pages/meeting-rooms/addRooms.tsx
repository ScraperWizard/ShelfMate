import React from 'react'
import MeetingRooms from '../../components/meetingRooms/meetingRooms'
interface Room {
    Reserver_SID: any;
    availablity: number,
    capacity: number,
    equipment: string,
    id: number,
    maintinance_end: string,
    maintenance_start: string,
  }

function addRooms() {
  return (
    <MeetingRooms data-name="meeting-rooms-add">
      <div className="pt-4 div" data-name="add-book-admin">
        <h1 className="py-2 text-2xl font-semibold">
          Add rooms settings
        </h1>
      </div>
      <div
            className="p-6"
            style={{ maxHeight: "500px", overflowY: "auto" }}

          >
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Add a meeting room
            </h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="Reserver_SID"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Reserver_SID
                </label>
                <input
                  type="text"
                  id="Reserver_SID"
                  name="Reserver_SID"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>
             

              <div className="mb-4">
                <label
                  htmlFor="availablity"
                  className="block text-gray-700 font-bold mb-2"
                >
                  availablity
                </label>
                <input
                  type="number"
                  id="availablity"
                  name="availablity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="capacity"
                  className="block text-gray-700 font-bold mb-2"
                >
                  capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>


              <div className="mb-4">
                <label
                  htmlFor="equipment"
                  className="block text-gray-700 font-bold mb-2"
                >
                  equipment
                </label>
                <input
                  type="text"
                  id="equipment"
                  name="equipment"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>


              <div className="mb-4">
                <label
                  htmlFor="id"
                  className="block text-gray-700 font-bold mb-2"
                >
                  id
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="maintenance_start"
                  className="block text-gray-700 font-bold mb-2"
                >
                 maintenance_start
                </label>
                <input
                  type="number"
                  id="maintenance_start"
                  name="maintenance_start"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="maintinance_end"
                  className="block text-gray-700 font-bold mb-2"
                >
                  maintinance_end
                </label>
                <input
                  type="text"
                  id="maintinance_end"
                  name="maintinance_end"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>

              

             

              <div className="mb-4 button">
                <button
                  type="submit"
                  className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test"
                >
                  Add meeting room
                </button>
              </div>
            </form>
          </div>
    </MeetingRooms>
  )
}

export default addRooms
