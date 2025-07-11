import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role) return alert('Please select a role');
    if (role === 'customer') navigate('/customer/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'restaurant') navigate('/restaurant/dashboard');
    else if (role === 'delivery') navigate('/delivery/dashboard');
  };

  return (
    <div className="container-fluid bg-light vh-100 d-flex align-items-center justify-content-center">
      <div className="row g-0 shadow-lg bg-white rounded overflow-hidden w-100" style={{ maxWidth: '960px' }}>
        
        {/* 🍔 Left Visual Section */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-warning-subtle p-4">
          <h2 className="fw-bold text-danger text-center">🍔 NSS-FoodExpress</h2>
          <p className="text-dark text-center lead mb-4">
            Discover flavor. <br />
            Track orders. <br />
            Delight customers.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="Junk Food Icon"
            className="img-fluid"
            style={{ width: '140px' }}
          />
        </div>

        {/* 🔐 Right Login Form */}
        <div className="col-md-6 p-4">
          <h3 className="fw-bold text-center mb-2">Login Portal</h3>
          <p className="text-muted text-center mb-4">Sign in to access your dashboard</p>

          <div className="mb-3">
            <label className="form-label">Select Role</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Choose...</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="restaurant">Restaurant</option>
              <option value="delivery">Delivery Boy</option>
            </select>
          </div>

          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
            🔓 Login
          </button>

          <Link to="/helpdesk" className="btn btn-outline-secondary w-100">
            🆘 Visit Helpdesk
          </Link>

          <p className="text-center text-muted small mt-4 mb-0">
            Developed by <strong>Nitin</strong>, <strong>Satish</strong>, <strong>Simran</strong> ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


