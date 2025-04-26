import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookReader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://digital-library-app-uaxx.onrender.com/${id}`) // ✅ corrected URL
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {book ? (
        <>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-6">by {book.author}</p>
          {book.readLink ? (
            <div className="aspect-video border rounded-lg overflow-hidden shadow">
              <iframe
                src={book.readLink}
                title={book.title}
                width="100%"
                height="100%"
                className="w-full h-[80vh] border-0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-red-500">No reading link available for this book.</p>
          )}
        </>
      ) : (
        <p>Loading book...</p>
      )}
    </div>
  );
}

export default BookReader;
