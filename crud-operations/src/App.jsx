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
          <h4 className="card-title">Book List</h4>
  
          {/* Search Input - Now inside this card */}
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
            onDelete={deleteBook} 
            onEdit={setEditBook} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;