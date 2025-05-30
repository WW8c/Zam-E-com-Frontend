import React, { useEffect, useState } from 'react';
import './Shopingcard.scss';
import { CloseOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Shopingcard = () => {
  const navigate = useNavigate();

const { cartItems, removeFromCart, updateQuantity } = useCart();


const handleQuantityChange = (id, amount) => {
  updateQuantity(id, amount);
};


const handleRemoveItem = (id) => {
  removeFromCart(id);
};

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = cartItems.length > 0 ? 24 : 0;
  const tax = cartItems.length > 0 ? 61.99 : 0;
  const total = subtotal - discount + tax;

  return (
    <div className="shopping-wrapper">
      <div className="shopping-left">
        <h3>Shopping Cart</h3>

        {cartItems.length > 0 && (
          <table className="cart-table">
            <thead>
              <tr>
                <th>PRODUCTS</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td className="product-details">
                    <button className="remove" onClick={() => handleRemoveItem(item.id)}>
                      <CloseOutlined />
                    </button>
                    <img src={item.image} alt="product" />
                    <div>
                      <p>{item.name}</p>
                      {/* Add this section */}
    <div className="item-details" style={{flexDirection: 'row'}}>
      {item.category && (
        <span className="category-badge">{item.category}</span>
      )}
      {item.packageLevel && (
        <span className="package-level">{item.packageLevel}</span>
      )}
    </div>
                    </div>
                  </td>
                  <td>
                    {item.originalPrice !== item.price && (
                      <del style={{ color: "#929FA5", fontSize: "14px" }}>${item.originalPrice}</del>
                    )}{' '}
                    ${item.price}
                  </td>
<td>
  <div className="qty-control">
    <button 
      onClick={() => handleQuantityChange(item.id, -1)}
      disabled={item.packageLevel} // Disable for digital products
    >
      -
    </button>
    <span>{item.quantity.toString().padStart(2, '0')}</span>
    <button 
      onClick={() => handleQuantityChange(item.id, 1)}
      disabled={item.packageLevel} // Disable for digital products
    >
      +
    </button>
  </div>
</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="btn-group">
          <button className="btn return" onClick={() => navigate('/')}>
            <ArrowLeftOutlined style={{ marginRight: "8px" }} /> RETURN TO SHOP
          </button>
        </div>
      </div>
      <div className="shopping-right">
        <div className="card-totals">
          <h4>Cart Totals</h4>
          <div className="totals">
            <p>Sub-total: <span>${subtotal.toFixed(2)}</span></p>
            <p>Shipping: <span>Free</span></p>
            <p>Discount: <span>${discount}</span></p>
            <p>Tax: <span>${tax}</span></p>
            <hr className="divide" />
            <p className="total">Total: <strong style={{ fontWeight: "600" }}>${total.toFixed(2)} USD</strong></p>
          </div>
          <button
  className="btn checkout"
  onClick={() =>
    navigate("/checkout", { state: { cartItems, total } }) // Pass cartItems and total here
  }
>
  PROCEED TO CHECKOUT <ArrowRightOutlined style={{ marginLeft: "8px" }} />
</button>

        </div>
      </div>
    </div>
  );
};

export default Shopingcard;
