function Home() {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-6 text-center drop-shadow-md">
          Welcome to the Digital Library
        </h1>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl leading-relaxed">
          Explore, add, and manage books with ease. Dive into the world of reading, discover new titles, and manage your library effortlessly.
        </p>
        <div className="bg-blue-700 text-white rounded-2xl shadow-lg p-10 text-center max-w-xl w-full transition-transform hover:scale-[1.02]">
          <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Browse through our collection, add your favorite books, and start organizing your digital library today!
          </p>
          <a
            href="/library"
            className="bg-yellow-300 hover:bg-yellow-400 text-blue-800 font-semibold py-2 px-8 rounded-full transition-colors duration-300 shadow-md"
          >
            Explore Books
          </a>
        </div>
      </div>
    );
  }
  
  export default Home;
  
  