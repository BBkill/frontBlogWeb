import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookDetail(props) {
  const [book, setBook] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setTitle] = useState('');
  const [authors, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [released, setReleaseDate] = useState(new Date());
  const [totalPages, setNumPages] = useState(0);
  const [categories, setCategory] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:9000/api/v1/book/book?id=1`)
      .then(response => {
        setBook(response.data.data);
        setTitle(response.data.data.name);
        setAuthor(response.data.data.authors);
        setDescription(response.dat.data.description);
        setReleaseDate(new Date(response.data.data.released));
        setNumPages(response.data.data.totalPages);
        setCategory(response.data.data.categories);
      })
      .catch(error => console.log(error));
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    axios.post('http://localhost:9000/api/v1/book/edit-book', {
      id: book._id,
      name,
      authors,
      description,
      released,
      totalPages,
      categories
    })
      .then(response => {
        setBook(response.data);
        setEditing(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>{book.title}</h1>

      {editing ? (
        <div>
          <label>Title:</label>
          <input value={name} onChange={(e) => setTitle(e.target.value)} />

          <label>Author:</label>
          <input value={authors} onChange={(e) => setAuthor(e.target.value)} />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Release date:</label>
          <input type="date" value={released.toISOString().substr(0, 10)} onChange={(e) => setReleaseDate(new Date(e.target.value))} />

          <label>Number of pages:</label>
          <input type="number" value={totalPages} onChange={(e) => setNumPages(parseInt(e.target.value, 10))} />

          <label>Category:</label>
          <input value={categories} onChange={(e) => setCategory(e.target.value)} />

          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Release date:</strong> {book.releaseDate}</p>
          <p><strong>Number of pages:</strong> {book.numPages}</p>
          <p><strong>Category:</strong> {book.category}</p>

          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default BookDetail;