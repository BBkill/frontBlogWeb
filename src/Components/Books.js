import React, { useEffect, useState } from "react";

function Books(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/books2")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []); 

  return (
    <div>
      <h2 className="text-center">Books List</h2>
      <div className="row_1">
        <button className="btn btn-primary" >
          Add Book
        </button>
      </div>
      <div className="row_2">
      <input type="text" name="input_key" class="form-control"/>
      </div>
      {/* <div className="row_3">
        <button onClick={Books()} className="btn btn-primary" >
          Search
        </button>
      </div> */}
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>BookCode</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th disabled>Approved</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.bookCode}>
                <td> {book.bookCode} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
                <td> {book.category}</td>
                <td>
                  <input type="checkbox" defaultChecked={book.approved} />
                </td>
                <td>
                <button className="btn btn-primary">View</button>
                <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Books;


