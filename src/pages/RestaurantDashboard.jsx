import React, { useState, useEffect, useCallback } from 'react';

const RestaurantDashboard = () => {
  const [menu, setMenu] = useState(() => {
    const savedMenu = localStorage.getItem('restaurant-menu');
    return savedMenu
      ? JSON.parse(savedMenu)
      : [
          {
            name: 'Paneer Tikka',
            price: 220,
            type: 'Veg',
            category: 'Starter',
            popularity: 4,
            description: '',
          },
          {
            name: 'Chicken Biryani',
            price: 280,
            type: 'Non-Veg',
            category: 'Main Course',
            popularity: 5,
            description: '',
          },
        ];
  });

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    type: 'Veg',
    category: 'Main Course',
    description: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [stats, setStats] = useState({ vegCount: 0, nonVegCount: 0, totalItems: 0, avgPrice: 0 });

  // 🧠 Memoized function to avoid ESLint warning
  const updateStatistics = useCallback(() => {
    const vegCount = menu.filter((item) => item.type === 'Veg').length;
    const nonVegCount = menu.filter((item) => item.type === 'Non-Veg').length;
    const totalPrice = menu.reduce((sum, item) => sum + item.price, 0);
    const avgPrice = menu.length ? totalPrice / menu.length : 0;

    setStats({
      vegCount,
      nonVegCount,
      totalItems: menu.length,
      avgPrice,
    });
  }, [menu]);

  useEffect(() => {
    localStorage.setItem('restaurant-menu', JSON.stringify(menu));
    updateStatistics();
  }, [menu, updateStatistics]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setNewItem({
      name: '',
      price: '',
      type: 'Veg',
      category: 'Main Course',
      description: '',
    });
    setEditIndex(null);
  };

  const addMenuItem = () => {
    if (!newItem.name || !newItem.price) {
      alert('Please fill all required fields');
      return;
    }
    setMenu((prev) => [
      ...prev,
      {
        ...newItem,
        price: parseInt(newItem.price) || 0,
        popularity: 1,
      },
    ]);
    resetForm();
  };

  const updateItem = () => {
    if (!newItem.name || !newItem.price) {
      alert('Please fill all required fields');
      return;
    }
    const updated = [...menu];
    updated[editIndex] = {
      ...newItem,
      price: parseInt(newItem.price) || 0,
      popularity: menu[editIndex].popularity || 1,
    };
    setMenu(updated);
    resetForm();
  };

  const deleteItem = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updated = [...menu];
      updated.splice(index, 1);
      setMenu(updated);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setNewItem(menu[index]);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedMenu = [...menu].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredMenu = sortedMenu.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === 'All' || item.type === filterType) &&
      (filterCategory === 'All' || item.category === filterCategory)
  );

  const categories = ['All', 'Starter', 'Main Course', 'Dessert', 'Drink', 'Snack'];
  const types = ['All', 'Veg', 'Non-Veg'];

  return (
    <div className="container py-4">
      <h2 className="text-center text-danger fw-bold mb-3">🍽️ Restaurant Dashboard</h2>

      {/* 📊 Statistics */}
      <div className="row mb-4">
        {[
          { label: 'Total Items', value: stats.totalItems, color: 'primary' },
          { label: 'Veg Items', value: stats.vegCount, color: 'success' },
          { label: 'Non-Veg Items', value: stats.nonVegCount, color: 'danger' },
          { label: 'Avg Price', value: `₹${stats.avgPrice.toFixed(2)}`, color: 'info' },
        ].map((stat, i) => (
          <div key={i} className="col-md-3 mb-2">
            <div className={`card bg-${stat.color} text-white`}>
              <div className="card-body">
                <h6>{stat.label}</h6>
                <h3>{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ➕ Add/Edit Form */}
      <div className="card p-4 shadow-sm mb-4">
        <h4>{editIndex === null ? '➕ Add New Dish' : '✏️ Edit Dish'}</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <input name="name" className="form-control" placeholder="Dish name" value={newItem.name} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <input name="price" className="form-control" type="number" placeholder="Price ₹" value={newItem.price} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <select name="type" className="form-select" value={newItem.type} onChange={handleChange}>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div className="col-md-2">
            <select name="category" className="form-select" value={newItem.category} onChange={handleChange}>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <input name="description" className="form-control" placeholder="Description" value={newItem.description} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            {editIndex === null ? (
              <button className="btn btn-success w-100" onClick={addMenuItem}>Add</button>
            ) : (
              <div className="d-flex gap-2">
                <button className="btn btn-warning w-100" onClick={updateItem}>Update</button>
                <button className="btn btn-outline-secondary" onClick={resetForm}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-4">
            <input className="form-control" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-outline-secondary w-100" onClick={() => {
              setSearchTerm(''); setFilterType('All'); setFilterCategory('All');
            }}>Reset</button>
          </div>
        </div>
      </div>

      {/* 📜 Menu Table */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Menu Items ({filteredMenu.length})</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Dish</th>
                <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>Price</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.length > 0 ? filteredMenu.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    {item.name}
                    {item.popularity >= 4 && <span className="badge bg-warning text-dark ms-2">Popular</span>}
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    <span className={`badge ${item.type === 'Veg' ? 'bg-success' : 'bg-danger'}`}>{item.type}</span>
                  </td>
                  <td><span className="badge bg-info text-dark">{item.category}</span></td>
                  <td className="text-muted">{item.description || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(idx)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(idx)}>Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="text-center text-muted mt-4">
        <p>© {new Date().getFullYear()} Restaurant Dashboard</p>
      </footer>
    </div>
  );
};

export default RestaurantDashboard;

