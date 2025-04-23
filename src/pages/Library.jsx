import { useEffect, useState } from "react";

function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">📚 My Digital Library</h1>
      <p className="text-gray-600 mb-8 text-center">Explore your book collection</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-200"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold text-gray-800 mb-1">{book.title}</h2>
              <p className="text-sm text-blue-600 mb-2">by {book.author}</p>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{book.description}</p>
              <button className="mt-auto text-sm font-medium text-blue-500 hover:underline self-start">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
