import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function BookList({ books, onDelete, onEdit }) {
  if (books.length === 0) return <p class="text-center">No books found.</p>;

  return (
    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover">
        <thead class="table-light">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} class="align-middle">
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.year}</td>
              <td>
                <button
                  class="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(book)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  onClick={() => onDelete(book.id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;