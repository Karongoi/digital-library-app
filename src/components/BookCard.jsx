import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  const handleDelete = () => {
    onDelete(book.id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2">
      <img
        src={book.coverImage}
        alt={book.title}
        className="book-cover w-full h-60 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-gray-500 text-sm">{book.description}</p>
      
      <a
        href={`/library/${book.id}/read`} 
        className="text-blue-600 hover:underline mt-4"
      >
        Read Book
      </a>
    </div>
  );
};

export default BookCard;
