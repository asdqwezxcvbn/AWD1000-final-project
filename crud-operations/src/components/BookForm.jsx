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
    <form onSubmit={handleSubmit} class="mb-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title text-center mb-4">
            {editBook ? 'Edit Book' : 'Add New Book'}
          </h4>
          <div class="row g-3">
            <div class="col-md-3">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                class="form-control"
                placeholder="Title"
                required
              />
            </div>
            <div class="col-md-3">
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                class="form-control"
                placeholder="Author"
                required
              />
            </div>
            <div class="col-md-3">
              <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                class="form-control"
                placeholder="Genre"
                required
              />
            </div>
            <div class="col-md-2">
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                class="form-control"
                placeholder="Year"
                required
              />
            </div>
            <div class="col-md-1 d-grid">
              <button type="submit" class="btn btn-primary btn-block mt-4">
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