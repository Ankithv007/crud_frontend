import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [values, setValues] = useState({ publisher: '', name: '', date: '' });
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiBaseUrl}/create`, values)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold">Add New Book</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: '600px' }}
      >
        <div className="mb-3">
          <label htmlFor="publisher" className="form-label fw-semibold">
            Publisher
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={values.publisher}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Publisher Name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">
            Book Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Book Name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label fw-semibold">
            Publish Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 fw-bold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
