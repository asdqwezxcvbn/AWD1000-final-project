import React, { useEffect, useState } from 'react';

function BookForm({ addBook, editBook, updateBook }) {
  const [formData, setFormData] = useState({ title: '', author: '', genre: '', year: '' });

  useEffect(() => {
    if (editBook) {
      setFormData(editBook);
    }
  }, [editBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editBook) {
      updateBook(formData);
    } else {
      addBook(formData);
    }
    setFormData({ title: '', author: '', genre: '', year: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-center mb-4">
            {editBook ? 'Edit Book' : 'Add New Book'}
          </h4>
          <div className="row g-3 align-items-center">
            <div className="col-md-3">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Title"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="form-control"
                placeholder="Author"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="form-control"
                placeholder="Genre"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="form-control"
                placeholder="Year"
                required
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                {editBook ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BookForm;