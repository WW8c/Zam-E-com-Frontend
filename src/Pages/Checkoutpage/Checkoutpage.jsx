import React, { useState } from 'react';
import { Form, Input, Select, Checkbox, Radio } from 'antd';
import { CreditCardOutlined, PayCircleOutlined } from '@ant-design/icons'; // Import icons from Ant Design
import './CheckoutPage.scss';
import { cash, credit, product1, product3, } from '../../assets';
import { useNavigate } from 'react-router-dom';
import {  useLocation } from 'react-router-dom';

const { Option } = Select;

const CheckoutPage = () => {
    // Receive cart details and total price from state
    const location = useLocation();
    const { cartItems, total } = location.state || {}; // Use default empty values if state is not found
  // State to track selected payment method
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const navigate = useNavigate();

const handlePlaceOrder = () => {
  // Optional: Validate form or perform async logic before redirect
  navigate('/checkout-success'); // Or your desired route
};

  return (
    <div className="checkout-container">
      {/* Left Section - Billing Information */}
      <div className="billing-box">
        <h2>Billing Information</h2>
        <Form layout="vertical">
          <div className="input-row">
            <Form.Item label="First Name" name="firstName" className="input-item">
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" className="input-item">
              <Input placeholder="Enter last name" />
            </Form.Item>

            <Form.Item label="Company Name" name="company" className="input-item">
              <Input placeholder="Company name (optional)" />
            </Form.Item>
          </div>

          {/* Address Input outside the input-row */}
          <Form.Item label="Address" name="address" className="input-item">
            <Input placeholder="Enter your address" />
          </Form.Item>

          {/* Country, Region/State, City, Zip Code in flex layout */}
          <div className="input-row2">
            <Form.Item label="Country" name="country" className="input-item" style={{ flex: 1 }}>
              <Select placeholder="Select country" >
                <Option value="us">United States</Option>
                <Option value="ca">Canada</Option>
                <Option value="uk">United Kingdom</Option>
                {/* Add more countries here */}
              </Select>
            </Form.Item>

            <Form.Item label="Region/State" name="state" className="input-item" style={{ flex: 1 }}>
              <Select placeholder="Select region/state">
                <Option value="ny">New York</Option>
                <Option value="ca">California</Option>
                <Option value="tx">Texas</Option>
                {/* Add more states here */}
              </Select>
            </Form.Item>

            <Form.Item label="City" name="city" className="input-item" style={{ flex: 1 }}>
              <Select placeholder="Select city">
                <Option value="nyc">New York City</Option>
                <Option value="la">Los Angeles</Option>
                <Option value="hou">Houston</Option>
                {/* Add more cities here */}
              </Select>
            </Form.Item>

            <Form.Item label="Zip Code" name="zipCode" className="input-item" style={{ flex: 1 }}>
              <Input placeholder="Enter zip code" />
            </Form.Item>
          </div>

          {/* Email and Phone Input under the previous fields */}
          <div className="input-row">
            <Form.Item label="Email" name="email" className="input-item" style={{ flex: 1 }}>
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item label="Phone" name="phone" className="input-item" style={{ flex: 1 }}>
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </div>

  
          {/* Payment Options */}
          <h3 className='payment-heading'>Payment Option</h3>
          <Form.Item name="paymentMethod">
            <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange}>
              <div className="payment-options">
                {/* First payment option - Cash on Delivery */}
                <div className="payment-option">
                    <div className="payment-item">
                    <img src={cash} alt="Cash on Delivery" style={{ width: '30px', height: '30px', marginBottom: '10px' }}/> 
                      <span>Cash on Delivery</span>
                      <Radio value="cod" />
                    </div>
                
                </div>

                {/* Second payment option - Debit/Credit Card */}
                <div className="payment-option">

                    <div className="payment-item">
                    <img src={credit} alt="Debit/Credit Card" style={{ width: '30px', height: '30px', marginBottom: '10px' }}/>
                      <span>Debit/Credit Card</span>
                      <Radio value="card"  />
                    </div>
                  
                </div>
              </div>
            </Radio.Group>
          </Form.Item>

          {/* Conditional rendering based on payment method */}
          {paymentMethod === 'card' && (
            <div className="payment-details">
              <Form.Item label="Name on Card" name="nameOnCard" className="input-item">
                <Input placeholder="Enter name on card" />
              </Form.Item>
              <Form.Item label="Card Number" name="cardNumber" className="input-item">
                <Input placeholder="Enter card number" />
              </Form.Item>

              <div className="input-row">
                <Form.Item label="Expire Date" name="expireDate" className="input-item" style={{ flex: 1 }}>
                  <Input placeholder="MM/YY" />
                </Form.Item>

                <Form.Item label="CVC" name="cvc" className="input-item" style={{ flex: 1 }}>
                  <Input placeholder="Enter CVC" />
                </Form.Item>
              </div>
            </div>
          )}
            {/* Order Notes Section */}
            <div className="order-notes">
            <h3>Additional Information</h3>
            <Form.Item label="Order Notes (Optional)" name="orderNotes" className="input-item">
              <Input.TextArea placeholder="Add any special notes for delivery" rows={4} />
            </Form.Item>
          </div>
        </Form>
      </div>


        {/* Right Section - Order Summary */}
        <div className="right-container">
          <h3 className="summary-heading">Order Summary</h3>
          {cartItems && cartItems.map((item, index) => (
            <div className="order-item" key={index}>
              <div className="item-details">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity-price">{item.quantity} x <span style={{ color: '#2DA5F3', fontSize: "14px", fontWeight: "600" }}>${item.price}</span></span>
                </div>
              </div>
            </div>
          ))}

          {/* Order Summary Details */}
          <div className="order-summary">
            <div className="summary-item">
              <span className="summary-label">Sub-total</span>
              <span className="summary-value">${total.toFixed(2)}</span>
            </div>
            
            {/* Add Shipping, Discount, and Tax summary */}
            <div className="summary-item">
              <span className="summary-label">Shipping</span>
              <span className="summary-value">${(total * 0.05).toFixed(2)} {/* Assuming 5% shipping fee, can adjust logic as needed */}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Discount</span>
              <span className="summary-value">-${(total * 0.1).toFixed(2)} {/* Assuming 10% discount, can adjust logic as needed */}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Tax</span>
              <span className="summary-value">${(total * 0.08).toFixed(2)} {/* Assuming 8% tax, can adjust logic as needed */}</span>
            </div>

            {/* Total Calculation */}
            <div className="summary-item total">
              <span className="summary-label">Total</span>
              <span className="summary-value">${(total + (total * 0.05) - (total * 0.1) + (total * 0.08)).toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button className="cta-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>

    </div>
  );
};

export default CheckoutPage;
