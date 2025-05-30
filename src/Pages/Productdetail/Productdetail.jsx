import React, { useState } from 'react';
import './Productdetail.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select, Rate, Image } from 'antd'; // Import Image component from Ant Design
import { Tabs, Typography } from 'antd';
import { Productdetails } from '../../assets';
import { CheckCircleFilled } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../context/CartContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Productdetail = () => {
   const { state } = useLocation();
   const [activeTab, setActiveTab] = useState('basic');
 const { imgSrc, title, price, id, isDigital, packageDetails, category } = state || {};


  const digitalProductContent = (
    <>
      <div className="digital-info-section">
        {/* ... existing digital features */}
      </div>

      <div className="product-details__section">
        <Title level={4}>Package Details</Title>
<Tabs
  activeKey={activeTab}
  onChange={key => setActiveTab(key)}
  className="product-details__tabs"
>
  {['basic', 'standard', 'premium'].map(level => {
    const isActive = activeTab === level;
    return (
      <TabPane
        key={level}
        tab={
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: isActive ? '2px solid #FA8232' : '2px solid transparent',
              borderRadius: '8px',
              padding: '4px 12px',
              backgroundColor: isActive ? '#FFF3EB' : 'transparent',
              color: isActive ? '#FA8232' : 'inherit',
              transition: 'all 0.3s ease',
              fontWeight: isActive ? '600' : 'normal',
            }}
          >
            {isActive && <CheckCircleFilled style={{ color: '#FA8232' }} />}
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        }
      >
        {/* Package Details Content */}
        <div className="product-details__package-content">
          <p><Text strong>Regular Price:</Text> ${packageDetails?.[level]?.price || 'N/A'}</p>
          <p><Text strong>Sale Price:</Text> ${packageDetails?.[level]?.sale || 'N/A'}</p>
          <p>
            <Text strong>Description:</Text>{' '}
            {packageDetails?.[level]?.desc || (
              <span className="product-details__na">No description provided</span>
            )}
          </p>
        </div>
      </TabPane>
    );
  })}
</Tabs>

      </div>
    </>
  );

  const [selectedColor, setSelectedColor] = useState('#B1B5B8');
  const [quantity, setQuantity] = useState(1);

  const [previewVisible, setPreviewVisible] = useState(false); // State for controlling image preview visibility
  const [currentImage, setCurrentImage] = useState(imgSrc); // To store the current image URL for preview

  const colors = ['#B1B5B8', '#E0E1E1'];

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const navigate = useNavigate();

const { addToCart } = useCart();

const handleAddToCart = () => {
  const cartItem = {
    id, // Use base ID for digital products
    name: title,
    price: isDigital 
      ? parseFloat(packageDetails?.[activeTab]?.sale || price.replace('$', ''))
      : parseFloat(price.replace('$', '')),
    originalPrice: isDigital
      ? parseFloat(packageDetails?.[activeTab]?.price || 1999)
      : 1999,
    quantity: isDigital ? 1 : quantity,
    image: imgSrc,
    category,
    packageLevel: isDigital ? activeTab : undefined,
    isDigital // Add digital flag
  };

  addToCart(cartItem);
  navigate('../shoping-card');
};
  // Function to open the preview modal
  const handlePreview = (image) => {
    setCurrentImage(image); // Set the image that you want to preview
    setPreviewVisible(true); // Open the preview modal
  };

  return (
    <div className="product-detail">
      <div className="product-detail-left">
        {/* Use Ant Design's Image component to display the main image */}
        <Image
          width="100%"
          src={imgSrc}
          alt="Main Product"
          preview={{
            visible: previewVisible, // Use the state to control visibility
            src: currentImage, // Use the current image URL
            onVisibleChange: (visible) => setPreviewVisible(visible), // Handle visibility change
          }}
          onClick={() => handlePreview(imgSrc)} // Click to open the preview modal
          style={{border: '1px solid#E4E7E9'}}
        />

        {/* Thumbnail Container */}
        <div className="thumbnail-container">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              className="thumbnail"
              src={imgSrc} // For now, using the same image for thumbnails
              alt={`Thumb ${index + 1}`}
       
              onClick={() => handlePreview(imgSrc)} // Clicking on a thumbnail also opens the preview modal
            />
          ))}
        </div>
      </div>

      <div className="product-detail-right">
        <div className="rating-section">
          <Rate allowHalf disabled defaultValue={4} style={{ color: '#FA8232' }} />
          <span className="rating-text">4.7 Star Rating</span>
          <span className="feedback-count">(21,671 User feedback)</span>
        </div>

        <h2>{title}</h2>

        <div className="product-info">
          <div className="info-row">
            <div>Sku: <strong>{id}</strong></div>
            <div>Availability: <strong style={{ color: '#2DB224' }}>In Stock</strong></div>
          </div>
          <div className="info-row">
            <div>Brand: <strong>Brand Name</strong></div>
           <div>Category: <strong>{category}</strong></div>

          </div>
        </div>

        <div className="price-row">
          <span className="current-price">{price}</span>
          <span className="original-price">$1999.00</span>
          <span className="discount-badge">21% OFF</span>
        </div>

        <hr className="divider" />
    {isDigital ? (
        digitalProductContent
      ) : (
        <>
        <div className="color-size-section">
          <div className="color-picker">
            <h4>Color</h4>
            <div className="color-options">
              {colors.map(color => (
                <div
                  key={color}
                  className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="size-picker">
            <h4>Size</h4>
            <Select className="size-select" placeholder="Select size" style={{ width: '100%' }}>
              <Option value="13-inch">14-inch Liquid Retina XDR display</Option>
              <Option value="14-inch">14-inch</Option>
              <Option value="16-inch">16-inch</Option>
            </Select>
          </div>
        </div>

        <div className="memory-storage-section">
          <div className="memory-picker">
            <h4>Memory</h4>
            <Select className="size-select" placeholder="Select memory">
              <Option value="8GB">8GB</Option>
              <Option value="16GB">16GB</Option>
              <Option value="32GB">32GB</Option>
            </Select>
          </div>

          <div className="storage-picker">
            <h4>Storage</h4>
            <Select className="size-select" placeholder="Select storage">
              <Option value="256GB">256GB</Option>
              <Option value="512GB">512GB</Option>
              <Option value="1TB">1TB</Option>
            </Select>
          </div>
        </div>
  </>
      )}
 <div className="action-buttons">
        {!isDigital && (
          <div className="quantity-control">
            <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
            <span className="quantity">{String(quantity).padStart(2, '0')}</span>
            <button className="quantity-btn" onClick={increaseQuantity}>+</button>
          </div>
        )}
          <button onClick={handleAddToCart}>Add to Cart</button>
  
      </div>

    </div>
    <ToastContainer position="top-right" autoClose={3000} />

  </div>
  );
};

export default Productdetail;
