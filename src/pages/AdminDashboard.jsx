import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4 text-primary">🛠️ Admin Dashboard - NSS FoodExpress</h2>

      {/* Summary Stats */}
      <div className="row mb-4">
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">📦 Orders</h5>
              <h3>124</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">👥 Users</h5>
              <h3>56</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">🏬 Restaurants</h5>
              <h3>12</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">💬 Complaints</h5>
              <h3>3</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Management Panels */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🍽️ Manage Restaurants</h5>
              <p className="card-text">Add, update or remove restaurant details</p>
              <button className="btn btn-outline-primary w-100">Open Panel</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">👥 User List</h5>
              <p className="card-text">View all registered users and their activity</p>
              <button className="btn btn-outline-success w-100">View Users</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-warning shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">📦 Order Summary</h5>
              <p className="card-text">Track all placed and completed orders</p>
              <button className="btn btn-outline-warning w-100">View Orders</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-danger shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">📨 Helpdesk</h5>
              <p className="card-text">Resolve customer complaints and queries</p>
              <button className="btn btn-outline-danger w-100">Go to Helpdesk</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-dark shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🚚 Delivery Boys</h5>
              <p className="card-text">Track delivery boy status and routes</p>
              <button className="btn btn-outline-dark w-100">View Deliveries</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-info shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">💵 Revenue Report</h5>
              <p className="card-text">Check total earnings and monthly performance</p>
              <button className="btn btn-outline-info w-100">View Revenue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
