import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setBooks(data.docs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Search</h1>

      <input
        type="text"
        placeholder="Enter book name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {books.slice(0, 10).map((book, index) => (
        <div key={index}>
          <h3>{book.title}</h3>
          <p>Author: {book.author_name?.[0]}</p>
          <p>Year: {book.first_publish_year}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
