import React, { useState } from 'react';

const RestaurantDashboard = () => {
  const [menu, setMenu] = useState([
    { name: "Paneer Tikka", price: 220, type: "Veg" },
    { name: "Chicken Biryani", price: 280, type: "Non-Veg" }
  ]);

  const addMenuItem = () => {
    const newItem = { name: "Dal Makhani", price: 190, type: "Veg" };
    setMenu([...menu, newItem]);
  };

  return (
    <div>
      <h2 className="text-center mb-4">Restaurant Dashboard 🍴</h2>
      <button className="btn btn-success mb-3" onClick={addMenuItem}>Add New Menu Item</button>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Price ₹</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantDashboard;

