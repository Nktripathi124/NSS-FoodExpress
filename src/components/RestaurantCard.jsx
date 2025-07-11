import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import restaurantPlaceholder from '../assets/restaurant-placeholder.jpg'; // प्लेसहोल्डर इमेज

const RestaurantCard = ({ restaurant }) => {
  // अगर इमेज URL नहीं है तो प्लेसहोल्डर इस्तेमाल करें
  const imageUrl = restaurant.image || restaurantPlaceholder;

  return (
    <Card className="h-100 shadow-sm restaurant-card hover-effect">
      <div className="image-container" style={{ height: '180px', overflow: 'hidden' }}>
        <Card.Img 
          variant="top" 
          src={imageUrl} 
          alt={restaurant.name}
          style={{ 
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            e.target.src = restaurantPlaceholder; // अगर इमेज लोड नहीं होती
          }}
        />
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{restaurant.name}</Card.Title>
        <Badge bg="light" text="dark" className="mb-2 align-self-start">
          {restaurant.cuisine}
        </Badge>
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-warning">
            ★ {restaurant.rating} ({restaurant.reviews || 0} reviews)
          </span>
          <span className="text-muted small">{restaurant.deliveryTime}</span>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="text-success fw-bold">₹{restaurant.minOrder || 99} min</span>
          <Button 
            as={Link} 
            to={`/restaurant/${restaurant.id}`} 
            variant="primary" 
            size="sm"
          >
            Order Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
