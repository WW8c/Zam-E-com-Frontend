import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSendCode = () => {
    // You can optionally validate email input here
    navigate('/verify-code'); // change this to your actual route
  };

  return (
    <div className="forgot-password-container">
      <h2 className="title">Forget Password</h2>
      <p className="description">
        Enter the email address or mobile phone number associated with your Clicon account.
      </p>

      <div className="form-group">
        <label htmlFor="email" className="label">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="ID..."
          className="input"
        />
      </div>

      <button className="send-code-button" onClick={handleSendCode}>
        Send Code <ArrowRightOutlined className="arrow" />
      </button>

      <div className="auth-links">
        <p>
          Already have account?{' '}
          <Link to="/login" state={{ tab: 'signin' }} className="link">Sign In</Link>
        </p>
        <p>
          Don’t have account?{' '}
          <Link to="/login" state={{ tab: 'signup' }} className="link">Sign Up</Link>
        </p>
      </div>
      <hr className="line" /> {/* ← HR line added here */}
      <p className="help-text">
        You may contact<span style={{color:"#FA8232"}}> Customer Service</span> for help restoring access to your account.
      </p>
    </div>
  );
};

export default ForgotPassword;
