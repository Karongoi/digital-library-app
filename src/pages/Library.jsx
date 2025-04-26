import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaRegCopyright, FaEdit, FaTrash } from "react-icons/fa";
import BookCard from "../components/BookCard";

function Library() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://digital-library-app-uaxx.onrender.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  function handleRead(id) {
    navigate(`/library/${id}/read`);
  }

  function handleEdit(id) {
    navigate(`/add?edit=${id}`);
  }

  function handleDelete(id) {
    if (confirm("Are you sure you want to delete this book?")) {
      fetch(`https://digital-library-app-uaxx.onrender.com/books/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setBooks(books.filter((book) => book.id !== id));
          } else {
            alert("Failed to delete book.");
          }
        })
        .catch((err) => console.error("Error deleting book:", err));
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <FaBookOpen className="text-2xl" />
            Digital Library
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4 text-center">
          📚 My Digital Library
        </h1>
        <p className="text-gray-600 mb-8 text-center text-base sm:text-lg">
          Explore your book collection
        </p>

        <div className="library-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div onClick={() => handleRead(book.id)} className="cursor-pointer">
                <BookCard book={book} />
              </div>
              <div className="flex justify-between mt-2 px-2">
                <button
                  onClick={() => handleEdit(book.id)}
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-sm text-red-600 hover:underline flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 py-4 mt-10 border-t">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center text-sm text-gray-600">
          <FaRegCopyright className="mr-1" /> 2025 My Digital Library. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Library;
