import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="search-filter bg-light p-3 rounded">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search restaurants or cuisines..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search restaurants"
        />
        <Button variant="primary" id="search-button">
          <i className="bi bi-search"></i> Search
        </Button>
      </InputGroup>

      <div className="category-filter d-flex flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'outline-secondary'}
            size="sm"
            className="me-2 mb-2 text-capitalize"
            onClick={() => onCategoryChange(category)}
          >
            {category === 'all' ? 'All Categories' : category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;