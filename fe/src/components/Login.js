import React, { useState } from 'react';

const Login = () => {
  console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
        const data = await res.json();
        const token = data.token;
        const payload = token.split('.')[1];
        const decoded = atob(payload);
        const { id } = JSON.parse(decoded);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        return window.location.href = '/';
    } else {
      
      alert('Login failed!!', res.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
