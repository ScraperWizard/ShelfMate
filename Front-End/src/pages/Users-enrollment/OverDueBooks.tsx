import { useState, useEffect } from "react";
import socket from "../../Socket";

interface Request {
  image: string;
  title: string;
  username: string;
  barcode: number;
  borrower: number;
  days: number;
  payment_due: string;

}
function OverDueBooks() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    socket.emit("get-overdue-books", {});
    socket.on("get-overdue-books-response", (response) => {
      setRequests(response);
      console.log("This is the response from get overdue books", response);
    });

    return () => {
      socket.off("get-overdue-books-response");
    };
  }, []);

  return (
    <div data-name="get-requests" className="container mx-auto">
      {requests.map((request, index) => (
        <div className="max-w-xl mx-auto mb-5">
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
          >
            <div className="flex items-center p-4">
              <div className="w-24 h-24 mr-4">
                <img
                  src={request.image}
                  alt={request.title}
                  className="w-full h-full object-cover rounded-full border-4 border-gray-200"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {request.title}
                </h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-gray-600">User Name:</p>
                    <p className="text-gray-800 font-semibold">
                      {request.username}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Barcode:</p>
                    <p className="text-gray-800 font-semibold">
                      {request.barcode}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Borrower ID:</p>
                    <p className="text-gray-800 font-semibold">{request.borrower}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">payment_due:</p>
                    <p className="text-gray-800 font-semibold">
                      {request.payment_due}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 mr-4"
              >
                Due
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OverDueBooks;
