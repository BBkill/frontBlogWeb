import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './BookDetail.css';

function BookDetail(props) {
  const [book, setBook] = useState({});
  const [id, setBookId] = useState('');
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [released, setReleased] = useState('');
  const [totalPages, setNumPages] = useState('');
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [base64String, setBase64String] = useState('');
  const [authorString, setAuthorString] = useState('');
  const [categoryString, setCategoryString] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    console.log(id);

    if (id == 0) {
      console.log("case 1");
      handleAddClick();

      console.log("case 1");
    } else {
      console.log("case 2");
      // http://localhost:9000
      axios.get(`http://localhost:9081/reading-service/api/v1/book/book?id=` + id)
        .then(response => {
          let bookObject = response.data.data;
          console.log("response___" + JSON.stringify(bookObject));
          setBookId(bookObject.id);
          setBook(bookObject);
          setName(bookObject.name);
          setDescription(bookObject.description);
          setReleased(bookObject.released);
          setNumPages(bookObject.totalPages);
          setAuthorString(getListNameByArr(bookObject.authors));
          setCategoryString(getListNameByArr(bookObject.categories));
        })
        .catch(error => console.log(error));

      if (!selectedFile) {
        setPreview(undefined)
        return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }


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
    handleFileInputChange(e);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setBase64String(base64);
    };
    console.log("base64___" + base64String)
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

  const handleSaveClick = () => {
    let categoriesArr = categoryString;
    let authorsArr = authorString;
    let imgBase64 = base64String;
    // http://localhost:9000/
    axios.post('http://localhost:9081/reading-service/api/v1/book/update-book', {
      id,
      name,
      authorsArr,
      description,
      released,
      totalPages,
      categoriesArr,
      imgBase64
    })
      .then(response => {
        window.location.reload()
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
            <input type='text' value={authorString} onChange={(e) => setAuthorString(e.target.value)} />
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
            <input type='text' value={categoryString} onChange={(e) => setCategoryString(e.target.value)} />
          </div>

          <button className="book-detail-save-btn" onClick={handleSaveClick}>Save</button>
        </div>
      ) : adding ? (
        <div className="book-detail-edit">
          <div className="book-detail-input">
            <label>Title:</label>
            <input onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <label>Author:</label>
            <input onChange={(e) => setAuthorString(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <div className='book-detail-input-description'>
              <label>Description:</label>
              <textarea onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <div className="book-detail-input">
            <label>Release date:</label>
            <input type='number' onChange={(e) => setReleased(e.target.value)} />
          </div>

          <div className="book-detail-input">
            <label>Number of pages:</label>
            <input type='number' onChange={(e) => setNumPages(e.target.value)} />
          </div>
          <div className="book-detail-input">
            <label>Image:</label>
            <input type='file' onChange={onSelectFile} />
            {selectedFile && <img src={preview} />}
          </div>

          <div className="book-detail-input">
            <label>Category:</label>
            <input onChange={(e) => setCategoryString(e.target.value)} />
          </div>

          <button className="book-detail-save-btn" onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div className="book-detail-info">
          <p><strong>Author:</strong> {getListNameByArr(book.authors)}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Release date:</strong> {book.released}</p>
          <p><strong>Number of pages:</strong> {book.totalPages}</p>
          <p><strong>Image</strong></p>
          <div>
            <img src={book.pathImg} />
          </div>
          <p><strong>Category:</strong>{getListNameByArr(book.categories)}</p>
          <div className="footer-content">
            <button className="book-detail-edit-btn" onClick={handleEditClick}>Edit</button>
          </div>
          {/* <div className="footer-content">
            <button className="book-detail-edit-btn" onClick={handleAddClick}>Add</button>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default BookDetail;