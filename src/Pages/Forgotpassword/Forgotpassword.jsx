import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Simple email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendCode = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setError('')}
        />
        {error && <div className="error-message">{error}</div>}
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
      <hr className="line" />
      <p className="help-text">
        You may contact<span style={{color:"#FA8232"}}> Customer Service</span> for help restoring access to your account.
      </p>
    </div>
  );
};

export default ForgotPassword;
