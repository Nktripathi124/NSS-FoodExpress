import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Accordion,
  Badge, Alert, Spinner, Modal, Tab, Tabs
} from 'react-bootstrap';
import {
  Envelope, Person, QuestionCircle, Ticket,
   CheckCircle
} from 'react-bootstrap-icons';

const HelpdeskDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'general',
    priority: 'medium',
    message: ''
  });

  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('helpdesk-tickets');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('open');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to login page and click "Forgot Password". You will receive a reset link via email.'
    },
    {
      question: 'Why is my payment failing?',
      answer: 'Check your card details or try another payment method. Contact us if issue persists.'
    },
    {
      question: 'How long does support take to respond?',
      answer: 'Our average response time is 2-4 hours during business hours (9AM-5PM, Mon-Fri).'
    },
    {
      question: 'Where can I find my order history?',
      answer: 'Log in to your account and navigate to "My Orders" section in your dashboard.'
    }
  ];

  useEffect(() => {
    localStorage.setItem('helpdesk-tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newTicket = {
        id: tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
        subject: formData.issueType,
        status: 'Open',
        date: new Date().toISOString().split('T')[0],
        priority: formData.priority,
        type: formData.issueType,
        customer: formData.name,
        message: formData.message
      };

      setTickets([...tickets, newTicket]);
      setFormData({
        name: '',
        email: '',
        issueType: 'general',
        priority: 'medium',
        message: ''
      });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const closeTicket = (id) => {
    setTickets(tickets.map(ticket =>
      ticket.id === id ? { ...ticket, status: 'Resolved' } : ticket
    ));
  };

  const requestDeleteTicket = (id) => {
    setTicketToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteTicket = () => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketToDelete));
    setShowDeleteModal(false);
    setTicketToDelete(null);
  };

  const filteredTickets = tickets
    .filter(ticket => {
      const statusMatch =
        activeTab === 'all' ||
        (activeTab === 'open' && ticket.status === 'Open') ||
        (activeTab === 'closed' && ticket.status === 'Resolved');

      const searchMatch = ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.message?.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getPriorityBadge = (priority) => {
    const map = {
      high: 'danger',
      medium: 'warning',
      low: 'secondary'
    };
    return <Badge bg={map[priority]} className="text-uppercase">{priority}</Badge>;
  };

  const getStatusBadge = (status) => {
    const map = {
      Open: 'warning',
      Resolved: 'success'
    };
    return <Badge bg={map[status]}>{status}</Badge>;
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">
        <QuestionCircle className="me-2" />
        Helpdesk Support Center
      </h1>

      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          <CheckCircle className="me-2" />
          Ticket submitted successfully!
        </Alert>
      )}

      <Row>
        <Col lg={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <Envelope className="me-2" />
              Submit a Ticket
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><Person className="me-2" /> Name</Form.Label>
                      <Form.Control
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><Envelope className="me-2" /> Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Issue Type</Form.Label>
                      <Form.Select name="issueType" value={formData.issueType} onChange={handleChange}>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical</option>
                        <option value="payment">Payment</option>
                        <option value="account">Account</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Priority</Form.Label>
                      <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner size="sm" animation="border" /> : 'Submit Ticket'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <div><Ticket className="me-2" /> Tickets</div>
              <Form.Control
                type="text"
                placeholder="Search tickets..."
                style={{ width: '200px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Card.Header>
            <Card.Body>
              <Tabs activeKey={activeTab} onSelect={setActiveTab}>
                <Tab eventKey="open" title="Open" />
                <Tab eventKey="closed" title="Resolved" />
                <Tab eventKey="all" title="All" />
              </Tabs>
              {filteredTickets.length > 0 ? (
                <div className="table-responsive mt-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td>#{ticket.id}</td>
                          <td>{ticket.subject}</td>
                          <td>{getPriorityBadge(ticket.priority)}</td>
                          <td>{getStatusBadge(ticket.status)}</td>
                          <td>{ticket.date}</td>
                          <td>
                            {ticket.status === 'Open' && (
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={() => closeTicket(ticket.id)}
                                className="me-2"
                              >
                                Close
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => requestDeleteTicket(ticket.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Alert variant="info" className="mt-3 text-center">
                  <QuestionCircle className="me-2" />
                  No tickets found
                </Alert>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <QuestionCircle className="me-2" /> FAQs
            </Card.Header>
            <Card.Body>
              <Accordion defaultActiveKey="0">
                {faqs.map((faq, idx) => (
                  <Accordion.Item eventKey={String(idx)} key={idx}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this ticket?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDeleteTicket}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HelpdeskDashboard;
