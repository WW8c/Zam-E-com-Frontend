// src/components/SectionHeader.jsx
import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './SectionHeader.scss';


const SectionHeader = ({ title }) => {
  const navigate = useNavigate();
    const handleClick = () => {
    // Any logic here
    navigate('/shop-page/1');
  };

  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <button className="see-all-btn"  onClick={handleClick}>
      Browse All Product <ArrowRightOutlined />
      </button>
    </div>
  );
};
 
export default SectionHeader;
