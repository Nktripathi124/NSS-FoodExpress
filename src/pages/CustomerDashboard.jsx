import React, { useState } from 'react';
import SavedAddresses from '../components/Customer/SavedAddresses';

const CustomerDashboard = () => {
  const [notifications] = useState([
    '🎉 Flat 20% off at Pizza Corner!',
    '🕐 Your order #103 is out for delivery.',
    '💬 New message from Burger Bytes.',
  ]);

  const [orderHistory] = useState([
    { id: 101, item: 'Paneer Tikka', restaurant: 'Spicy Hub', date: '10 July 2025', status: 'Delivered' },
    { id: 102, item: 'Veg Burger', restaurant: 'Burger Bytes', date: '8 July 2025', status: 'Delivered' },
    { id: 103, item: 'Cheese Pizza', restaurant: 'Pizza Corner', date: '6 July 2025', status: 'Out for Delivery' },
  ]);

  const [restaurants] = useState([
    {
      name: 'Pizza Corner',
      cuisine: 'Italian',
      location: 'Sector 21, Gurugram',
      image: '/assets/pizza-corner.jpg',
    },
    {
      name: 'Burger Bytes',
      cuisine: 'Fast Food',
      location: 'Connaught Place, Delhi',
      image: '/assets/burger-bytes.jpg',
    },
    {
      name: 'Spicy Hub',
      cuisine: 'Indian',
      location: 'Laxmi Nagar, Delhi',
      image: '/assets/spicy-hub.jpg',
    },
  ]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [dishes] = useState([
    { name: 'Paneer Tikka', price: 120, restaurant: 'Spicy Hub' },
    { name: 'Veg Burger', price: 80, restaurant: 'Burger Bytes' },
    { name: 'Cheese Pizza', price: 150, restaurant: 'Pizza Corner' },
    { name: 'Masala Dosa', price: 100, restaurant: 'Spicy Hub' },
    { name: 'French Fries', price: 60, restaurant: 'Burger Bytes' },
  ]);

  const addToCart = (dish) => {
    if (!cart.find((item) => item.name === dish.name)) {
      setCart([...cart, dish]);
    }
  };

  const removeFromCart = (dishName) => {
    setCart(cart.filter((item) => item.name !== dishName));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    alert('🛒 Order placed successfully! Thank you for ordering.');
    setCart([]);
  };

  return (
    <div
      className="container py-5"
      style={{
        background: 'radial-gradient(circle at top left, #ffe259, #ffa751, #ff6f61)',
        minHeight: '100vh',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 0 50px rgba(255, 111, 97, 0.3)',
      }}
    >
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5 text-gradient mb-2">
          🍴 Welcome to <span className="text-primary">NSS-FOOD EXPRESS</span>
        </h2>
        <p className="text-muted">Delicious food delivered to your doorstep 🚀</p>
      </div>

      {/* Notifications */}
      <section className="mb-5">
        <h4>🔔 Notifications</h4>
        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">
            {notifications.map((note, i) => (
              <li key={i} className="list-group-item">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Restaurants */}
      <section className="mb-5">
        <h4>🏬 Nearby Restaurants</h4>
        <div className="row">
          {restaurants.map((rest, i) => {
            const isSelected = selectedRestaurant === rest.name;
            const restDishes = dishes.filter((d) => d.restaurant === rest.name);

            return (
              <div key={i} className="col-md-4 col-sm-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{rest.name}</h5>
                    <p className="card-text text-muted">
                      {rest.cuisine} • {rest.location}
                    </p>
                    <button
                      className="btn btn-outline-success mb-3"
                      onClick={() =>
                        setSelectedRestaurant(isSelected ? null : rest.name)
                      }
                    >
                      {isSelected ? 'Hide Dishes' : 'View Dishes'}
                    </button>

                    {isSelected && (
                      <ul className="list-group">
                        {restDishes.map((dish, j) => (
                          <li
                            key={j}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <span>{dish.name} - ₹{dish.price}</span>
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => addToCart(dish)}
                              disabled={cart.find((item) => item.name === dish.name)}
                            >
                              {cart.find((item) => item.name === dish.name)
                                ? '✅ Added'
                                : '➕ Add'}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Saved Addresses */}
      <SavedAddresses />

      {/* Order History */}
      <section className="mb-5">
        <h4>📑 Order History</h4>
        <div className="table-responsive card shadow-sm p-3">
          <table className="table table-bordered mb-0">
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
              {orderHistory.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.item}</td>
                  <td>{order.restaurant}</td>
                  <td>{order.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === 'Delivered'
                          ? 'bg-success'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cart */}
      <section>
        <h4>📦 Your Cart ({cart.length} items)</h4>
        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">
            {cart.length === 0 ? (
              <li className="list-group-item text-muted">Cart is empty.</li>
            ) : (
              cart.map((item, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{item.name} — ₹{item.price}</span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.name)}
                  >
                    ❌ Remove
                  </button>
                </li>
              ))
            )}
          </ul>
          {cart.length > 0 && (
            <div className="card-footer d-flex justify-content-between align-items-center">
              <strong>Total: ₹{totalPrice}</strong>
              <button className="btn btn-success" onClick={placeOrder}>
                ✅ Place Order
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
