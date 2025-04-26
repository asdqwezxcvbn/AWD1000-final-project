import React, { useEffect, useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [editBook, setEditBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null); // Book being edited
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false); // Show confirmation modal for editing

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks && storedBooks.length > 0) {
      setBooks(storedBooks);
    } else {
      const seedBooks = [
        {
          id: uuidv4(),
          title: 'Harry Potter and the Sorcerer\'s Stone',
          author: 'J.K. Rowling',
          genre: 'Fantasy',
          year: '1997'
        },
        {
          id: uuidv4(),
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
          year: '1960'
        },
        {
          id: uuidv4(),
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
          year: '1949'
        },
        {
          id: uuidv4(),
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          genre: 'Romance',
          year: '1813'
        },
        {
          id: uuidv4(),
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Fiction',
          year: '1925'
        },
        {
          id: uuidv4(),
          title: 'Moby-Dick',
          author: 'Herman Melville',
          genre: 'Adventure',
          year: '1851'
        },
        {
          id: uuidv4(),
          title: 'Brave New World',
          author: 'Aldous Huxley',
          genre: 'Science Fiction',
          year: '1932'
        },
        {
          id: uuidv4(),
          title: 'The Catcher in the Rye',
          author: 'J.D. Salinger',
          genre: 'Fiction',
          year: '1951'
        },
        {
          id: uuidv4(),
          title: 'Jane Eyre',
          author: 'Charlotte Brontë',
          genre: 'Gothic',
          year: '1847'
        },
        {
          id: uuidv4(),
          title: 'Crime and Punishment',
          author: 'Fyodor Dostoevsky',
          genre: 'Philosophical Fiction',
          year: '1866'
        },
        {
          id: uuidv4(),
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy',
          year: '1937'
        },
        {
          id: uuidv4(),
          title: 'Fahrenheit 451',
          author: 'Ray Bradbury',
          genre: 'Dystopian',
          year: '1953'
        },
      ];
      setBooks(seedBooks);
      localStorage.setItem('books', JSON.stringify(seedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([...books, { ...book, id: uuidv4() }]);
  };

  const confirmDelete = (id) => {
    setBookToDelete(id);
  };

  const deleteBook = () => {
    setBooks(books.filter((book) => book.id !== bookToDelete));
    setBookToDelete(null);
  };

  const cancelDelete = () => {
    setBookToDelete(null);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    setEditBook(null);
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setShowEditConfirmModal(true);
  };

  const confirmEdit = () => {
    setEditBook(bookToEdit);
    setShowEditConfirmModal(false);
  };

  const cancelEdit = () => {
    setBookToEdit(null);
    setShowEditConfirmModal(false);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">📖 Book Manager 📖</h1>

      {/* Book Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <BookForm
            addBook={addBook}
            editBook={editBook}
            updateBook={updateBook}
          />
        </div>
      </div>

      {/* Book List */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <h4 className="card-title">📚 Book List 📚</h4>

          <div className="mb-3">
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <BookList
            books={filteredBooks}
            onDelete={confirmDelete}
            onEdit={handleEditBook}
          />
        </div>
      </div>

      {/* Confirmation Modal for Deleting Book */}
      {bookToDelete && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this book?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={deleteBook}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Editing Book */}
      {showEditConfirmModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Edit</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to edit this book?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={confirmEdit}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;