import React from 'react';
import './CategoriesSection.scss';
import { Link } from 'react-router-dom';
import { product1, product2, product3, product4 } from '../../assets';

const categories = [
  { id: 1, image: product3, text: 'Home Essentials' },
  { id: 2, image: product1, text: 'Kitchen Tools' },
  { id: 3, image: product4, text: 'Office Supplies' },
  { id: 4, image: product3, text: 'Fitness Gear' },
  { id: 5, image: product2, text: 'Beauty Products' },
  { id: 6, image: product1, text: 'Gadgets' },
];

const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <h2 className="section-title">Shop by Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={`/shop-page/${category.id}`}  // Routing by category ID
            className="category-card" 
            style={{ textDecoration: 'none' }}
          >
            <img src={category.image} alt={category.text} className="category-image" />
            <p className="category-text">{category.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
