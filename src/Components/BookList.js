import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css';

function BookList() {
    const [books, setBooks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:9000/api/v1/book/all-books')
            .then(response => {
                setBooks(response.data.data);
                checkToken();
            })
            .catch(err => console.error(err));
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    function checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
            handleLogin();
        } else {
            return false;
        }
    }
    const handleViewClick = (id) => {
        window.location.href = '/book-detail/book?id=' + id;
        // console.log("click buuton \n");
    };

    const handleDeleteClick = (id) => {
        axios.post('http://localhost:9000/api/v1/book/delete-book', {
            id
        })
            .then(response => {
                // BookList();
                window.location.reload()
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="container">
            <h2 className="text-center">Book List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Release Date</th>
                        <th>Page Count</th>
                        {isLoggedIn && (
                            <>
                                <th>Action</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.name}</td>
                            <td>{book.authors.map(authors => authors.name)}</td>
                            <td>{book.categories.map(categories => categories.name + ", ")}</td>
                            <td>{book.released}</td>
                            <td>{book.totalPages}</td>
                            {isLoggedIn && (
                                <>
                                    <td><button className="btn btn-primary" onClick={() => handleViewClick(book.id)}>View</button></td>
                                    <td><button className="btn btn-danger" onClick={() => handleDeleteClick(book.id)}>Delete</button></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList; 