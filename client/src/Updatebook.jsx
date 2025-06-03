import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateBook = () => {
  const [book, setBook] = useState({
    publisher: '',
    name: '',
    date: ''
  });

  const { id } = useParams(); // 👈 this gets the book ID from the URL
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // Fetch the book details when page loads
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error('Error fetching book:', err);
        alert('Book not found'); // shows alert if book is not found
      });
  }, [id, apiBaseUrl]);

  // Update the book
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${apiBaseUrl}/update/${id}`, book)
      .then(() => navigate('/'))
      .catch((err) => console.error('Update failed:', err));
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Update Book</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Publisher</label>
          <input
            type="text"
            className="form-control"
            value={book.publisher}
            onChange={(e) => setBook({ ...book, publisher: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Book Name</label>
          <input
            type="text"
            className="form-control"
            value={book.name}
            onChange={(e) => setBook({ ...book, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={book.date}
            onChange={(e) => setBook({ ...book, date: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
