import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-lg py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold hover:text-yellow-300">
          Digital Library 📚
        </NavLink>
        <div className="flex space-x-4 text-lg">
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
