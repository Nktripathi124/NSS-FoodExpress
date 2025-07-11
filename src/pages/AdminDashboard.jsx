import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card border-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Manage Restaurants 🍽️</h5>
              <p className="card-text">Add, update or remove restaurant details</p>
              <button className="btn btn-primary w-100">Go to Restaurant Panel</button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card border-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">User List 👥</h5>
              <p className="card-text">View all registered users</p>
              <button className="btn btn-success w-100">Go to User List</button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card border-warning shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Order Summary 📦</h5>
              <p className="card-text">Track all placed orders</p>
              <button className="btn btn-warning w-100">Go to Order Log</button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card border-danger shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Helpdesk Issues 📨</h5>
              <p className="card-text">Resolve customer complaints and queries</p>
              <button className="btn btn-danger w-100">Go to Helpdesk</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
