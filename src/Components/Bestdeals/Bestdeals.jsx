import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import ProductCard from '../ProductCard/ProductCard';
import './Bestdeals.scss';
import { product1, product2, product3, product4 } from '../../assets';
import { useNavigate } from 'react-router-dom';
const products = [
  { id: 1, imgSrc: product1, title: "2-Barrel Carburetor Carb 2100 Engine", price: "$299", category: "Toys & Games" },
  { 
    id: 2, imgSrc: product2, title: "Simple Mobile 4G LTE Smartphone", price: "$899", isDigital: true, category: "Digital products",
    packageDetails: { 
      basic: { price: 799, sale: 699, desc: "Basic mobile package with standard features" },
      standard: { price: 999, sale: 899, desc: "Standard package with enhanced storage" },
      premium: { price: 1299, sale: 1099, desc: "Premium package with unlimited data plan" }
    }
  },
  { id: 3, imgSrc: product3, title: "4K UHD LED Smart TV - 43-inch", price: "$199", category: "Electronics" },
  { id: 4, imgSrc: product4, title: "Bose Sport Earbuds - Bluetooth In Ear", price: "$299", category: "Toys & Games" },
  { id: 5, imgSrc: product3, title: "4K UHD LED Smart TV - 50-inch", price: "$229", category: "Electronics" },
  { id: 6, imgSrc: product3, title: "4K UHD LED Smart TV - 55-inch", price: "$249", category: "Electronics" },
  { id: 7, imgSrc: product1, title: "Carburetor Carb 2100 Engine - Pro Edition", price: "$319", category: "Toys & Games" },
  { id: 8, imgSrc: product2, title: "Simple Mobile 4G Smartphone - Lite", price: "$799", category: "Electronics" },
  { id: 9, imgSrc: product3, title: "4K UHD Smart TV - Budget Model", price: "$179", category: "Electronics" },
  { id: 10, imgSrc: product4, title: "Bose Sport Earbuds - Gen 2", price: "$319", category: "Toys & Games" }
];

const Bestdeals = () => {
  const navigate = useNavigate();

const handleEyeClick = (id, imgSrc, title, price, isDigital, category, packageDetails) => {
  navigate(`/product/${id}`, {
    state: { id, imgSrc, title, price, isDigital, category, packageDetails }
  });
};


  return (
    <div className="section-2">
      <SectionHeader title="Best Deals" />
      <div className="product-grid">
        {products.map((product) => (
   <ProductCard 
  key={product.id} 
  imgSrc={product.imgSrc} 
  title={product.title} 
  price={product.price} 
  id={product.id}
  isDigital={product.isDigital}
  category={product.category}  // ✅ Add this
  packageDetails={product.packageDetails}
  onEyeClick={() => handleEyeClick(
    product.id,
    product.imgSrc,
    product.title,
    product.price,
    product.isDigital,
    product.category,
    product.packageDetails
  )}
/>

        ))}
      </div>
    </div>
  );
};

export default Bestdeals;
