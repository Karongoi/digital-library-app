import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    coverImage: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    fetch("http://localhost:8080/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add book");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Book added successfully!");
        navigate("/library");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(" Failed to add book. Please try again.");
      });
  }
  

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-3xl font-semibold text-blue-700 text-center mb-6">
        Add a New Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter book title"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="block text-lg font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Enter author's name"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="coverImage"
            className="block text-lg font-medium text-gray-700"
          >
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            id="coverImage"
            placeholder="Enter cover image URL"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.coverImage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="5"
            placeholder="Enter book description"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition duration-300"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
