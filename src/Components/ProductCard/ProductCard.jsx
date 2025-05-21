import React from 'react';
import './ProductCard.scss';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ imgSrc, title, price, id, isDigital, packageDetails }) => {
  const navigate = useNavigate();

  const handleEyeClick = () => {
    navigate(`/product/${id}`, {
      state: {
        imgSrc,
        title,
        price,
        id,
        isDigital,
        packageDetails
      }
    });
  };

  const handleAddToCart = () => {
    const newProduct = {
      id,
      name: title,
      image: imgSrc,
      price: parseFloat(price.replace('$', '')),
      originalPrice: parseFloat(price.replace('$', '')),
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/shoping-card');
  };

  return (
    <div className="product-card">
      <div className="image-container">
        {isDigital && <div className="digital-badge">Digital Product</div>} {/* ✅ Badge */}
        <img src={imgSrc} alt={title} />
        <div className="overlay">
          <div className="icon-group">
            <div className="icon" onClick={handleAddToCart}>
              <ShoppingCartOutlined />
            </div>
            <div className="icon" onClick={handleEyeClick}>
              <EyeOutlined />
            </div>
          </div>
        </div>
      </div>

      <div className="rating">
        <Rate allowHalf defaultValue={4} disabled className="star-rating" />
        <span className="review-count">(400)</span>
      </div>

      <p className="product-title">{title}</p>
      <p className="product-price">
        ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price.replace('$', '')).toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
