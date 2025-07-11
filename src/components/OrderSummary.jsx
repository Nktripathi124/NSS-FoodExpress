import React from 'react';
import { ProgressBar, Button } from 'react-bootstrap';

const OrderSummary = ({ order, onTrackOrder }) => {
  const statusProgress = {
    'Preparing': 25,
    'Cooking': 50,
    'On the way': 75,
    'Delivered': 100
  };

  return (
    <div className="order-summary p-3 border-bottom">
      <div className="d-flex justify-content-between">
        <h6 className="mb-1">{order.restaurant}</h6>
        <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning'}`}>
          {order.status}
        </span>
      </div>
      <p className="small text-muted mb-2">Order #{order.id}</p>
      <ProgressBar 
        now={statusProgress[order.status] || 0} 
        className="mb-2" 
        variant={order.status === 'Delivered' ? 'success' : 'primary'}
      />
      <div className="d-flex justify-content-between align-items-center">
        <span className="small">
          {order.items} {order.items > 1 ? 'items' : 'item'} • ₹{order.total.toFixed(2)}
        </span>
        <Button 
          variant="outline-primary" 
          size="sm" 
          onClick={onTrackOrder}
        >
          Track Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;