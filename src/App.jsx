import { useState, useEffect } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("loggedIn");
    setIsLoggedIn(auth === "true");
  }, []);

  return (
    <Router>
      <div className="min-h-screen min-w-screen bg-gray-100 text-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            {isLoggedIn ? (
              <>
                <Route path="/library" element={<Library />} />
                <Route path="/library/:id" element={<BookList />} />
                <Route path="/add" element={<AddBook />} />
              </>
            ) : (
              <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            )}
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-center" autoClose={10000} hideProgressBar />
      </div>
    </Router>
  );
}
