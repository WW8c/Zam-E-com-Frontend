import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Trackorder.scss'; // Optional: your styles

const Trackorder = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleTrackOrder = () => {
    if (orderId.trim() !== '') {
      navigate(`/order-detail`);
    }
  };

  return (
    <div className="track-order-container">
      <h2>Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter your Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="track-input"
      />
      <button onClick={handleTrackOrder} className="track-button">
        Track Order
      </button>
    </div>
  );
};

export default Trackorder;
