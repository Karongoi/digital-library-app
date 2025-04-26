import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BookList() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
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
        toast.success("Book updated successfully!");
        navigate(`/library/${updatedBook.id}`); 
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update book.");
      });
  }

  if (!book) return <div>Loading book details...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold">Edit Book</h1>
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
        </div>
      </form>
    </div>
  );
}

export default BookList;
