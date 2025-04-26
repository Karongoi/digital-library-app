import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    coverImage: "",
    readLink: ""
  });

  useEffect(() => {
    fetch(`https://digital-library-app-uaxx.onrender.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => toast.error("Error loading book."));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://digital-library-app-uaxx.onrender.com/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(() => {
        toast.success("Book updated!");
        navigate("/library");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Update failed.");
      });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-3xl font-semibold text-blue-700 text-center mb-6">
        Edit Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {["title", "author", "coverImage", "readLink", "description"].map((field) => (
          <div key={field}>
            <label className="block text-lg font-medium text-gray-700 capitalize">
              {field === "readLink" ? "Read Link" : field}
            </label>
            {field === "description" ? (
              <textarea
                name={field}
                rows="5"
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition duration-300"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
