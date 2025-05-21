import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  ShopOutlined,
  LogoutOutlined,
  HistoryOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { Logo } from '../../assets';

const Header = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToCart = () => navigate('/shoping-card');
  const goToHistory = () => navigate('/order-history');
  const goToTrackOrder = () => navigate('/track-order');
  const goToProfile = () => navigate('/profile');

  const handleLogout = () => {
    // TODO: Add your logout logic (e.g., clearing auth tokens)
    console.log('Logging out...');
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={goToProfile}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
  key="logout"
  icon={<LogoutOutlined style={{ color: 'red' }} />}
  onClick={handleLogout}
  style={{ color: 'red' }}
>
  Logout
</Menu.Item>

    </Menu>
  );

  const historyMenu = (
    <Menu>
      <Menu.Item key="order-history" icon={<HistoryOutlined />} onClick={goToHistory}>
        Order History
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="track-order" icon={<EnvironmentOutlined />} onClick={goToTrackOrder}>
        Track Order
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      {/* Left: Logo */}
      <div className="header-left" onClick={goToHome} style={{ cursor: 'pointer' }}>
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      {/* Center: Search Bar */}
      <div className="header-center">
        <div className="search-container">
          <input type="text" placeholder="Search for anything..." />
          <SearchOutlined className="search-icon" />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="header-right">
        <ShoppingCartOutlined className="icon" onClick={goToCart} />
        
        <Dropdown
          overlay={userMenu}
          trigger={['hover']} // changed from 'click' to 'hover'
          placement="bottomRight"
          overlayClassName="custom-dropdown"
        >
          <UserOutlined className="icon" style={{ cursor: 'pointer' }} />
        </Dropdown>

        <Dropdown
          overlay={historyMenu}
          trigger={['hover']} // changed from 'click' to 'hover'
          placement="bottomRight"
          overlayClassName="custom-dropdown"
        >
          <ShopOutlined className="icon" style={{ cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
