function BookCard({ title, author, coverImage }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
        <img src={coverImage} alt={title} className="h-40 w-full object-cover rounded mb-3" />
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">by {author}</p>
      </div>
    );
  }
  
  export default BookCard;
  