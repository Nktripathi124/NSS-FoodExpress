import React, { useState, useEffect } from 'react';

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem('addresses');
    return stored ? JSON.parse(stored) : [];
  });

  const [defaultIndex, setDefaultIndex] = useState(() => {
    const stored = localStorage.getItem('defaultAddressIndex');
    return stored ? parseInt(stored) : null;
  });

  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (defaultIndex !== null) {
      localStorage.setItem('defaultAddressIndex', defaultIndex);
    }
  }, [defaultIndex]);

  const handleAdd = () => {
    const trimmed = newAddress.trim();
    if (trimmed && !addresses.includes(trimmed)) {
      setAddresses([...addresses, trimmed]);
      setNewAddress('');
    }
  };

  const handleRemove = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
    if (index === defaultIndex) setDefaultIndex(null);
    else if (index < defaultIndex) setDefaultIndex(defaultIndex - 1);
  };

  const setAsDefault = (index) => {
    setDefaultIndex(index);
  };

  return (
    <section className="mb-5">
      <h4 className="mb-3 fw-semibold">📬 Saved Addresses</h4>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new address..."
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAdd}>
          ➕ Add
        </button>
      </div>

      <div className="card shadow-sm">
        <ul className="list-group list-group-flush">
          {addresses.length === 0 ? (
            <li className="list-group-item text-muted">No addresses saved yet.</li>
          ) : (
            addresses.map((addr, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {addr}
                  {defaultIndex === idx && (
                    <span className="badge bg-primary ms-2">Default</span>
                  )}
                </div>
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setAsDefault(idx)}
                  >
                    Set Default
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemove(idx)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default SavedAddresses;
