import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav className="bg-blue-700 text-white shadow-lg py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold hover:text-yellow-300">
          Digital Library 📚
        </NavLink>

        <div className="flex space-x-4 text-lg items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-300"
            }
          >
            Home
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-yellow-300"
                }
              >
                Library
              </NavLink>
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-yellow-300"
                }
              >
                Add Book
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 text-blue-800 font-semibold px-4 py-1 rounded hover:bg-yellow-500 transition-colors"
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
