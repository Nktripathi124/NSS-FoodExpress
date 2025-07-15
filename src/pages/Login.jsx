import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role) return setError('⚠️ Please select a role');
    if (!email || !password) return setError('⚠️ Email and password are required');
    setError('');
    if (role === 'customer') navigate('/customer/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'restaurant') navigate('/restaurant/dashboard');
    else if (role === 'delivery') navigate('/delivery/dashboard');
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center login-bg">
      <div className="row shadow-lg rounded overflow-hidden w-100" style={{ maxWidth: '950px', background: 'white' }}>
        
        {/* 🍔 Visual Side */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-warning-subtle p-4 text-center">
          <h2 className="fw-bold text-danger">🍔 NSS-FoodExpress</h2>
          <p className="text-dark lead mb-4">Discover flavor. <br /> Track orders. <br /> Delight customers.</p>
          <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Food Icon" style={{ width: '140px' }} />
        </div>

        {/* 🔐 Login Form */}
        <div className="col-md-6 p-5">
          <h3 className="fw-bold text-center mb-2">Welcome Back!</h3>
          <p className="text-muted text-center mb-4">Login to access your dashboard</p>

          {error && <div className="alert alert-warning text-center py-2">{error}</div>}

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Role</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">-- Choose Role --</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="restaurant">Restaurant</option>
              <option value="delivery">Delivery Boy</option>
            </select>
          </div>

          <input
            type="email"
            className="form-control mb-2"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100 mb-3 fw-bold" onClick={handleLogin}>
            🔓 Login
          </button>

          <Link to="/helpdesk" className="btn btn-outline-secondary w-100">
             Visit Helpdesk
          </Link>

          <p className="text-center text-muted small mt-4 mb-0">
            Made with ❤️ by <strong>Nitin</strong>, <strong>Satish</strong>, and <strong>Simran</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

