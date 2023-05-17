import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookDetail.css';

function BookDetail(props) {
  const [book, setBook] = useState({});
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [authors, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [released, setReleased] = useState('');
  const [totalPages, setNumPages] = useState('');
  const [categories, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    axios.get(`http://localhost:9000/api/v1/book/book?id=1`)
      .then(response => {
        console.log("response___" + JSON.stringify(response.data.data));
        setBook(response.data.data);
        setName(response.data.data.name);
        setAuthor(response.data.data.authors);
        setDescription(response.data.data.description);
        setReleased(response.data.data.released);
        setNumPages(response.data.data.totalPages);
        setCategory(response.data.data.categories);
      })
      .catch(error => console.log(error));

    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleAddClick = () => {
    setAdding(true);
  };
  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
  };
  const getListNameByArr = (arr) => {
    let result = 'Ẩn danh';
    if (arr && arr.length) {
      result = '';
      let mang = JSON.parse(JSON.stringify(arr));
      for (let i = 0; i < mang.length; i++) {
        result = result + mang[i].name;
      }
    }
    return result;
  };

  const convertToArr = (inputString) => {
    if (inputString) {
      return JSON.stringify(authors.split(","));
    }
    return "";
  }

  const handleSaveClick = () => {
    axios.post('http://localhost:9000/api/v1/book/edit-book', {
      id: book._id,
      name,
      authors,
      description,
      released,
      totalPages,
      categories,
      selectedFile
    })
      .then(response => {
        setBook(response.data);
        setEditing(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="book-detail">
      <div className="book-detail-header">
        <h1 className="book-detail-title">{book.name}</h1>
      </div>
      {editing ? (
        <div className="book-detail-edit">
          <div className="book-detail-input">
            <label>Title:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <label>Author:</label>
            <input value={authors} onChange={(e) => setAuthor(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <div className='book-detail-input-description'>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <div className="book-detail-input">
            <label>Release date:</label>
            <input value={released} onChange={(e) => setReleased(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <label>Number of pages:</label>
            <input value={totalPages} onChange={(e) => setNumPages(e.target.value)} />
          </div>
          <div className="book-detail-input">
            <label>Image:</label>
            <input type='file' onChange={onSelectFile} />
            {selectedFile && <img src={preview} />}
          </div>

          <div className="book-detail-input">
            <label>Category:</label>
            <input value={categories} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <button className="book-detail-save-btn" onClick={handleSaveClick}>Save</button>
        </div>
      ) : adding ? (
        <div className="book-detail-edit">
          <div className="book-detail-input">
            <label>Title:</label>
            <input value={""} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <label>Author:</label>
            <input value={""} onChange={(e) => setAuthor(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <div className='book-detail-input-description'>
              <label>Description:</label>
              <textarea value={""} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <div className="book-detail-input">
            <label>Release date:</label>
            <input value={""} onChange={(e) => setReleased(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <label>Number of pages:</label>
            <input value={""} onChange={(e) => setNumPages(e.target.value)} />
          </div>
          <div className="book-detail-input">
            <label>Image:</label>
            <input type='file' onChange={onSelectFile} />
            {selectedFile && <img src={preview} />}
          </div>

          <div className="book-detail-input">
            <label>Category:</label>
            <input value={""} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <button className="book-detail-save-btn" onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div className="book-detail-info">
          <p><strong>Author:</strong> {getListNameByArr(book.authors)}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Release date:</strong> {book.released}</p>
          <p><strong>Number of pages:</strong> {book.totalPages}</p>
          <p><strong>Category:</strong>{getListNameByArr(book.categories)}</p>
          <div className="footer-content">
            <button className="book-detail-edit-btn" onClick={handleEditClick}>Edit</button>
          </div>
          <div className="footer-content">
            <button className="book-detail-edit-btn" onClick={handleAddClick}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetail;