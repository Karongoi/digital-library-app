import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleLogin(e) {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    navigate("/library");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login to Digital Library</h2>

        <input
          type="text"
          name="username"
          placeholder="Your name"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
