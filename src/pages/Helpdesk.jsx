import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Accordion } from 'react-bootstrap';

const HelpdeskDashboard = () => {
  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'general',
    message: ''
  });

  // State for tickets
  const [tickets, setTickets] = useState([
    { id: 1, subject: 'Login issues', status: 'Open', date: '2023-05-15' },
    { id: 2, subject: 'Payment problem', status: 'Resolved', date: '2023-05-10' }
  ]);

  // FAQ data
  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to login page and click "Forgot Password". You will receive a reset link via email.'
    },
    {
      question: 'Why is my payment failing?',
      answer: 'Check your card details or try another payment method. Contact us if issue persists.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ticket submitted! We'll contact you at ${formData.email}`);
    // Here you would typically send data to backend
    setTickets([...tickets, {
      id: tickets.length + 1,
      subject: formData.issueType,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    }]);
    setFormData({
      name: '',
      email: '',
      issueType: 'general',
      message: ''
    });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Helpdesk Support</h1>
      
      <Row>
        {/* Contact Form Column */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Submit a Ticket</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Issue Type</Form.Label>
                  <Form.Select 
                    name="issueType" 
                    value={formData.issueType}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="payment">Payment Problem</option>
                    <option value="account">Account Issue</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit Ticket
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Tickets and FAQ Column */}
        <Col md={6}>
          {/* Your Tickets Section */}
          <Card className="mb-4">
            <Card.Header as="h5">Your Recent Tickets</Card.Header>
            <Card.Body>
              {tickets.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map(ticket => (
                        <tr key={ticket.id}>
                          <td>{ticket.id}</td>
                          <td>{ticket.subject}</td>
                          <td>
                            <span className={`badge ${ticket.status === 'Open' ? 'bg-warning' : 'bg-success'}`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td>{ticket.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No tickets submitted yet.</p>
              )}
            </Card.Body>
          </Card>

          {/* FAQ Section */}
          <Card>
            <Card.Header as="h5">Frequently Asked Questions</Card.Header>
            <Card.Body>
              <Accordion>
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HelpdeskDashboard;