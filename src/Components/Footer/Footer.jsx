import React from 'react';
import './Footer.scss';
import { Logo2 } from '../../assets';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {
  TwitterOutlined,
  FacebookFilled,
  PinterestOutlined,
  YoutubeFilled,
  InstagramOutlined,
} from '@ant-design/icons';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* Left Side */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src={Logo2} alt="Kinbo Logo" />
          </div>
          <div className="footer-contact">
            <p className="footer-title">Customer Supports:</p>
            <p className="contact-info"> (629) 555-0129</p>
            <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
            <p className="contact-info">info@kinbo.com</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="footer-right">
          <div className="footer-links">
            <h4>Top Categories</h4>
            <ul>
              <li>Computer & Laptop</li>
              <li>SmartPhone</li>
              <li>Headphone</li>
              <li>Accessories</li>
              <li>Camera & Photo</li>
              <li>TV & Homes</li>
              <li>Browse All Product</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>Shop Product</li>
              <li>Shopping Cart</li>
              <li>Wishlist</li>
              <li>Compare</li>
              {/* <li>Track Order</li> */}
              <Link to="/customer-help" className="footer-link"><li>Customer Help</li> </Link> {/* Use Link for navigation */}
              <li>
                <Link to="/faqs" className="footer-link">Faqs</Link> {/* Use Link for navigation */}
              </li>
              <li>
                <Link to="/about-us" className="footer-link">About Us</Link> {/* Use Link for navigation */}
              </li>
            </ul>
          </div>

          <div className="footer-updates">
            <h4>For Updates</h4>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
            <div className="social-icons">
              <p>Follow us:</p>
              <div className="icons-row">
                <TwitterOutlined />
                <FacebookFilled />
                <PinterestOutlined />
                <YoutubeFilled />
                <InstagramOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Shadowed bar with centered text */}
      <div className="footer-bottom-bar">
        <p>© 2025 Kinbo. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
