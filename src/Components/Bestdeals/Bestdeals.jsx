import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import ProductCard from '../ProductCard/ProductCard';
import './Bestdeals.scss';
import { product1, product2, product3, product4 } from '../../assets';  // Ensure these assets are correctly imported
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const products = [
  { id: 1, imgSrc: product1, title: "2-Barrel Carburetor Carb 2100 Engine", price: "$299" },
{ id: 2,   imgSrc: product2,  title: "Simple Mobile 4G LTE Smartphone",  price: "$899", isDigital: true,   packageDetails: { 
      basic: {
        price: 799,
        sale: 699,
        desc: "Basic mobile package with standard features"
      },
      standard: {
        price: 999,
        sale: 899,
        desc: "Standard package with enhanced storage"
      },
      premium: {
        price: 1299,
        sale: 1099,
        desc: "Premium package with unlimited data plan"
      }
    }
  },
  { id: 3, imgSrc: product3, title: "4K UHD LED Smart TV - 43-inch", price: "$199" },
  { id: 4, imgSrc: product4, title: "Bose Sport Earbuds - Bluetooth In Ear", price: "$299" },
  { id: 5, imgSrc: product3, title: "4K UHD LED Smart TV - 50-inch", price: "$229" },
  { id: 6, imgSrc: product3, title: "4K UHD LED Smart TV - 55-inch", price: "$249" },
  { id: 7, imgSrc: product1, title: "Carburetor Carb 2100 Engine - Pro Edition", price: "$319" },
  { id: 8, imgSrc: product2, title: "Simple Mobile 4G Smartphone - Lite", price: "$799" },
  { id: 9, imgSrc: product3, title: "4K UHD Smart TV - Budget Model", price: "$179" },
  { id: 10, imgSrc: product4, title: "Bose Sport Earbuds - Gen 2", price: "$319" }
]; 

const Bestdeals = () => {
  const navigate = useNavigate(); // Set up the navigation hook

const handleEyeClick = (id, imgSrc, title, price, isDigital) => {
  navigate(`/product/${id}`, { 
    state: { imgSrc, title, price, isDigital } 
  });
};

  return (
    <div className="section-2">
      <SectionHeader title="Best Deals" />

      {/* Single product grid container */}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            imgSrc={product.imgSrc} 
            title={product.title} 
            price={product.price} 
            id={product.id}
              isDigital={product.isDigital}  // Add this li
                 packageDetails={product.packageDetails}
            onEyeClick={() => handleEyeClick(product.id, product.imgSrc, product.title, product.price)} // Pass handleEyeClick function
          />
        ))}
      </div>
    </div>
  );
};

export default Bestdeals;
