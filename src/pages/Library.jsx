import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaRegCopyright } from "react-icons/fa";

function Library() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  function handleSelect(id) {
    navigate(`/library/${id}`);
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
            <div
              key={book.id}
              onClick={() => handleSelect(book.id)}
              className="book-card cursor-pointer"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="book-cover"
              />
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">by {book.author}</p>
              <p className="book-description">{book.description}</p>
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
