import React, { useState, useEffect } from 'react';
import { 
  Badge, Button, Card, Container, Row, Col, 
  Modal, ProgressBar, Alert, Spinner, Tab, Tabs 
} from 'react-bootstrap';
import { 
  Truck, Clock, CheckCircle, 
  Person, Shop, PinMap, ChatDots, 
  Telephone, ArrowClockwise, ThreeDots 
} from 'react-bootstrap-icons';

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('delivery-orders');
    return savedOrders ? JSON.parse(savedOrders) : [
      {
        id: 101,
        restaurant: "Samosa Central",
        customer: "Rahul Sharma",
        address: "B-12, Vivek Vihar, Delhi",
        phone: "+91 98765 43210",
        status: "out-for-delivery",
        orderTime: new Date(),
        notes: "Please ring bell once",
        items: [
          { name: "Samosa Chaat", quantity: 2 },
          { name: "Paneer Tikka", quantity: 1 }
        ],
        payment: "Paid (₹245)"
      },
      {
        id: 102,
        restaurant: "Pizza Junction",
        customer: "Neha Jain",
        address: "E-44, Preet Vihar, Delhi",
        phone: "+91 87654 32109",
        status: "picked",
        orderTime: new Date(Date.now() - 30*60*1000), // 30 mins ago
        notes: "Call on arrival",
        items: [
          { name: "Margherita Pizza", quantity: 1 },
          { name: "Garlic Bread", quantity: 1 },
          { name: "Coke", quantity: 2 }
        ],
        payment: "Cash on Delivery (₹525)"
      }
    ];
  });

  const [timeSinceOrder, setTimeSinceOrder] = useState({});
  const [activeTab, setActiveTab] = useState('active');
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('delivery-orders', JSON.stringify(orders));
  }, [orders]);

  // Calculate time since order
  useEffect(() => {
    const updateTimes = () => {
      const updated = {};
      orders.forEach(order => {
        const diff = Math.floor((new Date() - new Date(order.orderTime)) / 60000);
        updated[order.id] = diff;
      });
      setTimeSinceOrder(updated);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000);
    return () => clearInterval(interval);
  }, [orders]);

  const updateStatus = (id, newStatus) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      setIsLoading(false);
      setShowAlert({ variant: 'success', message: `Order #${id} status updated` });
      setTimeout(() => setShowAlert(null), 3000);
    }, 800);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'assigned': { variant: 'secondary', text: 'Assigned' },
      'picked': { variant: 'info', text: 'Picked Up' },
      'out-for-delivery': { variant: 'warning', text: 'On the Way' },
      'delivered': { variant: 'success', text: 'Delivered' }
    };
    const { variant, text } = statusMap[status] || { variant: 'dark', text: status };
    return <Badge bg={variant} className="text-uppercase">{text}</Badge>;
  };

  const getProgress = (status) => {
    const statusOrder = ['assigned', 'picked', 'out-for-delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') return order.status !== 'delivered';
    if (activeTab === 'completed') return order.status === 'delivered';
    return true;
  });

  const callCustomer = (phone) => {
    window.open(`tel:${phone}`, '_blank');
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">
          <Truck className="me-2" />
          Delivery Dashboard
        </h1>
        <p className="lead text-muted">Manage your delivery assignments efficiently</p>
      </div>

      {/* Stats Alert */}
      <Alert variant="info" className="shadow-sm mb-4">
        <div className="d-flex justify-content-between">
          <span>
            <strong>{orders.filter(o => o.status !== 'delivered').length}</strong> active deliveries
          </span>
          <span>
            <strong>{orders.filter(o => o.status === 'delivered').length}</strong> completed today
          </span>
          <span>
            Avg. delivery time: <strong>32</strong> mins
          </span>
        </div>
      </Alert>

      {/* Success Alert */}
      {showAlert && (
        <Alert 
          variant={showAlert.variant} 
          className="position-fixed top-0 start-50 translate-middle-x mt-3 shadow" 
          style={{ zIndex: 1000 }}
          onClose={() => setShowAlert(null)} 
          dismissible
        >
          {showAlert.message}
        </Alert>
      )}

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="active" title={<><ArrowClockwise className="me-1" /> Active</>} />
        <Tab eventKey="completed" title={<><CheckCircle className="me-1" /> Completed</>} />
        <Tab eventKey="all" title="All Deliveries" />
      </Tabs>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Updating order status...</p>
        </div>
      )}

      {/* Orders List */}
      <Row className="g-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <Col key={order.id} lg={6}>
              <Card className="shadow-sm h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold">Order #{order.id}</span>
                    <span className="ms-2">{getStatusBadge(order.status)}</span>
                  </div>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => setShowDetails(order.id)}
                  >
                    <ThreeDots />
                  </Button>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex mb-3">
                    <div className="flex-grow-1">
                      <h5 className="mb-1">
                        <Shop className="me-2 text-muted" />
                        {order.restaurant}
                      </h5>
                      <p className="mb-1">
                        <Person className="me-2 text-muted" />
                        {order.customer}
                      </p>
                      <p className="mb-1">
                        <PinMap className="me-2 text-muted" />
                        {order.address}
                      </p>
                      <p className="mb-1">
                        <Clock className="me-2 text-muted" />
                        {timeSinceOrder[order.id] || 0} minutes ago
                      </p>
                    </div>
                    <div className="text-end">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="mb-2"
                        onClick={() => callCustomer(order.phone)}
                      >
                        <Telephone /> Call
                      </Button>
                      {order.notes && (
                        <div className="text-muted small">
                          <ChatDots className="me-1" />
                          Note
                        </div>
                      )}
                    </div>
                  </div>

                  <ProgressBar 
                    now={getProgress(order.status)} 
                    className="mb-3" 
                    variant="success"
                    animated={order.status !== 'delivered'}
                  />

                  <div className="d-flex justify-content-between">
                    <div>
                      {order.status !== 'delivered' ? (
                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={e => updateStatus(order.id, e.target.value)}
                          disabled={isLoading}
                        >
                          <option value="assigned">Assigned</option>
                          <option value="picked">Picked Up</option>
                          <option value="out-for-delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      ) : (
                        <span className="text-success">
                          <CheckCircle className="me-1" />
                          Completed
                        </span>
                      )}
                    </div>
                    <Button 
                      variant={order.status === 'delivered' ? 'outline-success' : 'success'}
                      size="sm"
                      onClick={() => updateStatus(order.id, 'delivered')}
                      disabled={order.status === 'delivered' || isLoading}
                    >
                      {order.status === 'delivered' ? 'Delivered' : 'Mark Delivered'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info" className="text-center">
              No {activeTab === 'active' ? 'active' : 'completed'} deliveries found
            </Alert>
          </Col>
        )}
      </Row>

      {/* Order Details Modal */}
      <Modal show={showDetails !== null} onHide={() => setShowDetails(null)} size="lg">
        {showDetails !== null && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Order #{showDetails} Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {(() => {
                const order = orders.find(o => o.id === showDetails);
                if (!order) return null;

                return (
                  <>
                    <Row className="mb-4">
                      <Col md={6}>
                        <h5><Shop className="me-2" /> Restaurant</h5>
                        <p>{order.restaurant}</p>

                        <h5><Person className="me-2" /> Customer</h5>
                        <p>{order.customer}</p>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          onClick={() => callCustomer(order.phone)}
                        >
                          <Telephone className="me-1" /> {order.phone}
                        </Button>
                      </Col>
                      <Col md={6}>
                        <h5><PinMap className="me-2" /> Delivery Address</h5>
                        <p>{order.address}</p>

                        {order.notes && (
                          <>
                            <h5><ChatDots className="me-2" /> Special Instructions</h5>
                            <p>{order.notes}</p>
                          </>
                        )}
                      </Col>
                    </Row>

                    <h5>Order Items</h5>
                    <ul className="list-group mb-4">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between">
                          <span>{item.name}</span>
                          <span className="badge bg-primary rounded-pill">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>Delivery Status</h5>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-end">
                        <h5>Payment</h5>
                        <Badge bg={order.payment.includes('Paid') ? 'success' : 'warning'}>
                          {order.payment}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5>Delivery Location</h5>
                      <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                        <iframe
                          title={`map-${order.id}`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          src={`https://www.google.com/maps?q=${encodeURIComponent(order.address)}&output=embed`}
                        ></iframe>
                      </div>
                    </div>
                  </>
                );
              })()}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDetails(null)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default DeliveryDashboard;