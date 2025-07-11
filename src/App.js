import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import Helpdesk from './pages/Helpdesk';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

         

