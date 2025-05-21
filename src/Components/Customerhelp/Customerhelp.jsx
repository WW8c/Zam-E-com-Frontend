import React from 'react';
import './CustomerHelp.scss';
import {
  SearchOutlined,
  PhoneOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  LockOutlined,
  CreditCardOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { customer } from '../../assets';
// import agentImage from '../assets/agent.png';

const options = [
  { icon: <SearchOutlined />, label: 'Track Order' },
  { icon: <LockOutlined />, label: 'Reset Password' },
  { icon: <CreditCardOutlined />, label: 'Payment Option' },
  { icon: <UserOutlined />, label: 'User & Account' },
  { icon: <HeartOutlined />, label: 'Wishlist & Compare' },
  { icon: <ShoppingOutlined />, label: 'Shipping & Billing' },
  { icon: <ShoppingCartOutlined />, label: 'Shopping Cart & Wallet' },
  { icon: <ShopOutlined />, label: 'Sell on Clicon' },
];

const CustomerHelp = () => {
  return (
    <div className="help-center">
      {/* Top Section */}
      <div className="top-section">
        <div className="left">
          <span className="badge">HELP CENTER</span>
          <h1>How we can help you!</h1>
          <div className="search-bar">
  <div className="input-wrapper">
    <SearchOutlined className="input-icon" />
    <input type="text" placeholder="Enter your question or keyword" />
  </div>
  <button>
    SEARCH
  </button>
</div>

        </div>
        <div className="right">
          <img src={customer} alt="Agent" />
        </div>
      </div>

      {/* Assistance Section */}
      <div className="assistance">
        <h2>What can we assist you with today?</h2>
        <div className="options">
          {options.map(({ icon, label }, index) => (
            <div className="option" key={index}>
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="topics">
        <h3>Popular Topics</h3>
        <div className="columns">
          <ul>
            <li>How do I return my item?</li>
            <li>What is Clicon’s Return Policy?</li>
            <li>How long is the refund process?</li>
          </ul>
          <ul>
            <li>What are the Delivery Timelines?</li>
            <li>What is Discover Your Game Campaign 2022?</li>
            <li>What is the Voucher & Gift Offer in this Campaign?</li>
          </ul>
          <ul>
            <li>How to cancel Clicon Orders?</li>
            <li>Ask the Expert and Device Community</li>
            <li>How to change my shop name?</li>
          </ul>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact">
        <button className="contact-btn">CONTACT US</button>
        <p style={{fontSize:"28px",color:"#191C1F",fontWeight:"600"}}>Don’t find your answer.<br />Contact with us</p>
        <div className="methods">
        <div className="method call">
  <div className="icon-container">
    <PhoneOutlined style={{ color: '#007bff' }} />
  </div>
  <div className="content">
    <h4>Call us now</h4>
    <p>we are available online from 9:00 AM to 5:00 PM <br/>(GMT95:45) Talk with use now</p>
    <p style={{fontSize:"24px",color:"#191C1F"}}>+1-202-555-0126</p>
    <button>CALL NOW</button>
  </div>
</div>

<div className="method chat">
  <div className="icon-container2">
    <MessageOutlined style={{ color: '#28a745' }} />
  </div>
  <div className="content">
    <h4>Chat with us</h4>
    <p>we are available online from 9:00 AM to 5:00 PM <br/>(GMT95:45) Talk with use now</p>
    <p style={{fontSize:"24px",color:"#191C1F"}}>Support@clicon.com</p>
    <button style={{backgroundColor:"#2DB224"}}>CONTACT US</button>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default CustomerHelp;
