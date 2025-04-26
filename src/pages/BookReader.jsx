import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookReader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://digital-library-app-uaxx.onrender.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  if (!book) {
    return <p className="p-6 text-center">Loading book...</p>;
  }

  const isPdf = book.readLink.endsWith(".pdf");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{book.title}</h1>
      <p className="text-lg text-gray-600 mb-6">by {book.author}</p>

      {book.readLink ? (
        isPdf ? (
          <div className="aspect-video border rounded-lg overflow-hidden shadow">
            <iframe
              src={book.readLink}
              title={book.title}
              width="100%"
              height="100%"
              className="w-full h-[80vh] border-0"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="mb-4 text-gray-700">This book is available online.</p>
            <a
              href={book.readLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Open Book in New Tab
            </a>
          </div>
        )
      ) : (
        <p className="text-red-500">No reading link available for this book.</p>
      )}
    </div>
  );
}

export default BookReader;
