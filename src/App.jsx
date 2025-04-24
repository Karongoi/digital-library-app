import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./pages/Library";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookList from "./pages/BookList";

function App() {
  return (
    <Router>
      <div className="min-h-screen min-w-screen bg-gray-100 text-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:id" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-center" autoClose={10000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
