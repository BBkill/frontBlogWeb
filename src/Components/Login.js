import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9000/api/v1/user/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.data.username);
        console.log("token " + response.data.data.username);
        let loginResponse = response.data;
        let code = response.data.code;
        console.log("login response___" + JSON.stringify(loginResponse));
        console.log("response code___" + code);
        if (code === 200) {
          props.onLogin();
        } else {
          setError(response.data.rd);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Invalid username or password');
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className="form-control" value={username} onChange={event => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={event => setPassword(event.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;