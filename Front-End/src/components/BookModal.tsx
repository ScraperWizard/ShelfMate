import React from "react";

type Book = {
  id: number;
  image: string;
  genre: string;
  title: string;
  copies: number;
};

type Props = {
  book: Book;
  onClose: () => void;
};

const BookModal: React.FC<Props> = ({ book, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{book.title}</h2>
        <p>Genre: {book.genre}</p>
        <p>Copies available: {book.copies}</p>
        <img src={book.image} alt={book.title} />
      </div>
    </div>
  );
};

export default BookModal;
