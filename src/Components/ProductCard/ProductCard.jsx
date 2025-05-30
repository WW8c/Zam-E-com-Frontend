import React from 'react';
import './ProductCard.scss';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // ✅ Import context

const ProductCard = ({ imgSrc, title, price, id, isDigital, packageDetails, category }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Use context

  const handleEyeClick = () => {
    navigate(`/product/${id}`, {
      state: {
        imgSrc,
        title,
        price,
        id,
        isDigital,
        packageDetails,
        category,
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
      category,
   
    };
 if (isDigital) {
    newProduct.packageLevel = 'Basic'; // or whatever level is selected
  }
    addToCart(newProduct); // ✅ Add via context
    navigate('/shoping-card');
  };

  return (
    <div className="product-card">
      <div className="image-container">
        {isDigital && <div className="digital-badge">Digital Product</div>}
        <img src={imgSrc} alt={title} />
        <div className="overlay">
          <div className="icon-group">
            {!isDigital && (
              <div className="icon" onClick={handleAddToCart}>
                <ShoppingCartOutlined />
              </div>
            )}
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

export default ProductCard