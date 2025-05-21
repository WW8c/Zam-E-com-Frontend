import React from 'react';
import { CheckCircleTwoTone, ArrowRightOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Checkoutsuccess.scss';

const Checkoutsuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-success-container">
      <CheckCircleTwoTone className="success-icon" twoToneColor="#52c41a" />
      <h1 className="success-heading">Your order is successfully placed</h1>
      <p className="success-text">
        Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus.
        Donec volutpat mollis nulla non facilisis.
      </p>
      <div className="success-buttons">
        <button className="custom-btn dashboard-btn" onClick={() => navigate('/dashboard')}>
        <AppstoreOutlined className="icon" />

          Go to Dashboard
        </button>
        <button className="custom-btn view-order-btn" onClick={() => navigate('/order')}>
          View Order
          <ArrowRightOutlined className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Checkoutsuccess;
