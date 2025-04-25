import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
      navigate("/library");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Digital Library</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
