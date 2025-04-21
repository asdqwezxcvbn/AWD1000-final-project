import React, { useEffect, useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [editBook, setEditBook] = useState(null);

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
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic',
          year: '1925'
        }
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

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    setEditBook(null);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-4">📖 Book Manager 📖</h1>
      
      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
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
      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title">Book List</h4>
          <BookList 
            books={filteredBooks} 
            onDelete={deleteBook} 
            onEdit={setEditBook} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;