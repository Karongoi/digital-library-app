import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100">
      <div className="text-center p-10 rounded-xl bg-white shadow-xl max-w-xl w-full">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome to the Digital Library 📚
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          {isLoggedIn
            ? "You're logged in! Ready to explore?"
            : "Please log in with your name to explore the library."}
        </p>

        <button
          onClick={() => navigate(isLoggedIn ? "/library" : "/login")}
          className="bg-yellow-300 hover:bg-yellow-400 text-blue-800 font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-md"
        >
          {isLoggedIn ? "Go to Library" : "Login to Continue"}
        </button>
      </div>
    </div>
  );
}

export default Home;
