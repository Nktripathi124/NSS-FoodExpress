import React, { useState } from 'react';

const CustomerDashboard = () => {
  const [notifications] = useState([
    "🎉 Flat 20% off at Pizza Corner!",
    "🕐 Your order #103 is out for delivery.",
    "💬 New message from Burger Bytes."
  ]);

  const [addresses] = useState([
    "B-22, Laxmi Nagar, Delhi",
    "A-5, Sector 18, Noida"
  ]);

  const [orderHistory] = useState([
    { id: 101, item: "Paneer Tikka", restaurant: "Spicy Hub", date: "10 July 2025", status: "Delivered" },
    { id: 102, item: "Veg Burger", restaurant: "Burger Bytes", date: "8 July 2025", status: "Delivered" },
    { id: 103, item: "Cheese Pizza", restaurant: "Pizza Corner", date: "6 July 2025", status: "Out for Delivery" }
  ]);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">🍕 Welcome to Your FoodExpress Dashboard</h2>

      {/* Notifications */}
      <section className="mb-5">
        <h4>🔔 Notifications</h4>
        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">
            {notifications.map((note, i) => (
              <li key={i} className="list-group-item">{note}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Saved Addresses */}
      <section className="mb-5">
        <h4>📬 Saved Addresses</h4>
        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">
            {addresses.map((addr, i) => (
              <li key={i} className="list-group-item">{addr}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Order History */}
      <section>
        <h4>📑 Order History</h4>
        <div className="table-responsive card shadow-sm p-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Item</th>
                <th>Restaurant</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.item}</td>
                  <td>{order.restaurant}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`badge ${order.status === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;




