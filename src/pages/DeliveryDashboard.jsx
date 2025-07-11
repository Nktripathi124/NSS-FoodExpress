import React, { useState } from 'react';

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: 101,
      restaurant: "Samosa Central",
      customer: "Rahul Sharma",
      contact: "9876543210",
      address: "B-12, Vivek Vihar, Delhi",
      status: "Out for delivery",
    },
    {
      id: 102,
      restaurant: "Pizza Junction",
      customer: "Neha Jain",
      contact: "9123456780",
      address: "E-44, Preet Vihar, Delhi",
      status: "Picked",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h2 className="text-center mb-4">Delivery Boy Dashboard 🚴</h2>

      <div className="alert alert-info text-center">
        You have {orders.length} active delivery assignment{orders.length > 1 ? 's' : ''}.
      </div>

      {orders.map(order => (
        <div key={order.id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Order #{order.id}</h5>
            <p><strong>Restaurant:</strong> {order.restaurant}</p>
            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Contact:</strong> <a href={`tel:${order.contact}`}>{order.contact}</a></p>
            <p><strong>Address:</strong> {order.address}</p>

            <label className="form-label">Update Status:</label>
            <select
              className="form-select mb-2"
              value={order.status}
              onChange={e => updateStatus(order.id, e.target.value)}
            >
              <option value="Assigned">Assigned</option>
              <option value="Picked">Picked</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            {order.status === "Delivered" ? (
              <div className="badge bg-success">✅ Delivered</div>
            ) : (
              <button
                className="btn btn-outline-success"
                onClick={() => updateStatus(order.id, "Delivered")}
              >
                Mark as Delivered
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryDashboard;

           