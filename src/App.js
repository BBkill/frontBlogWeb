import './App.css';
import React, { useState } from 'react';
import Login from './Components/Login';
import BookList from './Components/BookList';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BookDetail from './Components/BookDetail';
import RegisterForm from './Components/Register';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/BookList');
  };

  return (
    <div>
      <Routes>
        <Route path='/register/' element={<RegisterForm/>}/>
        <Route path='/BookList/' element={<BookList />} />      
        {isLoggedIn ? (
          <Route path='/BookList/' element={<BookList />} />
        ) : (
          <Route path='/login/' element={<Login onLogin={handleLogin} />} />
        )}
        <Route path='/book-detail/*' element={<BookDetail />} />

      </Routes>
    </div>
  );
}

export default App;
