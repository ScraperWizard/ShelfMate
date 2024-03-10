import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socket from '../Socket';
import Navbar from '../components/Navbar';

interface Card {
    card_number: string;
    activation_date: string;
    card_status: string;
    card_type: string;
    user_id: string;
    name: string; 
    image: string;
}

function ViewCards() {
    const [cards, setCards] = useState<Card[]>([]); 

    useEffect(() => {
        socket.emit("get-cards-books", {});

        socket.on("get-cards-response", (message) => {
            console.log("This is the message that you get from viewing the cards", message);
            setCards(message); 
        });

        return () => {
            socket.off("get-cards-response");
        };
    }, []);

    return (
        <>
        <Navbar />
        <div className="grid grid-cols-3 gap-4">
            {cards && cards.length > 0 ? (
                cards.map((card, index) => (
                    <div className="bg-gray-100 rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer" key={index}>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-lg font-semibold">Card Number: {card.card_number}</p>
                            <img src={card.image} alt={card.name} className="w-8 h-8 rounded-full" />
                        </div>
                        <p>Name: {card.name}</p>
                        <p>Activation Date: {card.activation_date}</p>
                        <p>Card Status: {card.card_status}</p>
                        <p>Card Type: {card.card_type}</p>
                        <p>User ID: {card.user_id}</p>
                        
                    </div>
                ))
            ) : (
                <div className="bg-gray-100 rounded-lg shadow-md p-4">
                    <p className="text-lg font-semibold">You don't have any cards.</p>
                </div>
            )}
        </div>
        </>
    );
}

export default ViewCards;
