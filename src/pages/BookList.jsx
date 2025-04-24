import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BookList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    coverImage: ""
  });

  useEffect(() => {
    fetch(`https://digital-library-app-uaxx.onrender.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setFormData(data); 
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        toast.error("Failed to load book");
      });
  }, [id]);

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this book?")) {
      fetch(`https://digital-library-app-uaxx.onrender.com/books/${id}`, { method: "DELETE" })
        .then(() => {
          toast.success("Book deleted");
          navigate("/library");
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          toast.error("Failed to delete book");
        });
    }
  }

  function handleEditToggle() {
    setEditMode((prev) => !prev);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleUpdate(e) {
    e.preventDefault();

    fetch(`https://digital-library-app-uaxx.onrender.com/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((updatedBook) => {
        setBook(updatedBook);
        setEditMode(false);
        toast.success("Book updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update book.");
      });
  }

  if (!book) return <div className="text-center mt-10">Loading book details...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md">
      {editMode ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-md"
          ></textarea>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <img src={book.coverImage} alt={book.title} className="w-full h-80 object-cover rounded-lg mb-6" />
          <h1 className="text-3xl font-bold text-blue-700 mb-2">{book.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">by {book.author}</h2>
          <p className="text-gray-700 mb-6">{book.description}</p>
          <div className="flex gap-4">
            <button
              onClick={handleEditToggle}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BookList;
