import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage({ handleLogin }) {
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (password === 'admin') {
      handleLogin();
    } else {
      alert('Helytelen jelszó!');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bejelentkezés</h1>
      <div className="mb-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Jelszó"
          className="form-control"
        />
      </div>
      <Link to="/admin" className="d-grid"><button onClick={handleLoginClick} className="btn btn-primary">Bejelentkezés</button></Link>
    </div>
  );
}

export default LoginPage;
