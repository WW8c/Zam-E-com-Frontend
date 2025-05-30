import React, { useState } from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import './Shoppage.scss';
import { product1, product2, product3, product4 } from '../../assets';
import { Radio, Checkbox } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons'; // Import icons
const products = [
  { id: 11, imgSrc: product1, title: "2-Barrel Carburetor - Standard", price: "$299", category: "Electronics Devices", brand: "Apple" },
  { id: 12, imgSrc: product2, title: "Simple Mobile 4G LTE - 64GB", price: "$899", category: "SmartPhone", brand: "Samsung" },
  { id: 13, imgSrc: product3, title: "4K UHD Smart TV - 43'' Basic", price: "$199", category: "TV & Homes Appliances", brand: "Sony" },
  { id: 14, imgSrc: product4, title: "Bose Sport Earbuds - Gen 1", price: "$299", category: "Toys & Games", brand: "Bose" },
  { id: 15, imgSrc: product3, title: "4K UHD Smart TV - 50'' Premium", price: "$899", category: "TV & Homes Appliances", brand: "Samsung" },
  { id: 16, imgSrc: product1, title: "2-Barrel Carburetor - Pro Performance", price: "$349", category: "Electronics Devices", brand: "Dell" },
  { id: 17, imgSrc: product2, title: "Simple Mobile 4G LTE - 128GB", price: "$999", category: "SmartPhone", brand: "Apple" },
  { id: 18, imgSrc: product4, title: "Bose Sport Earbuds - Gen 2", price: "$319", category: "Toys & Games", brand: "Bose" },
  { id: 19, imgSrc: product3, title: "4K UHD Smart TV - 55'' Budget", price: "$179", category: "TV & Homes Appliances", brand: "LG" },
  { id: 20, imgSrc: product1, title: "2-Barrel Carburetor - High Torque", price: "$329", category: "Electronics Devices", brand: "HP" },
  { id: 21, imgSrc: product2, title: "Simple Mobile 4G - Pixel Edition", price: "$899", category: "SmartPhone", brand: "Google" },
  { id: 22, imgSrc: product3, title: "4K UHD Smart TV - 60'' Slim Bezel", price: "$549", category: "TV & Homes Appliances", brand: "Sony" },
  { id: 23, imgSrc: product4, title: "Bose Sport Earbuds - Lite Version", price: "$279", category: "Toys & Games", brand: "Xiaomi" }
];


const categories = [
  "Electronics Devices",
  "Computer & Laptop",
  "Computer Accessories",
  "SmartPhone",
  "Headphone",
  "Mobile Accessories",
  "Gaming Console",
  "Camera & Photo",
  "TV & Homes Appliances",
  "Watchs & Accessories",
  "GPS & Navigation",
  "Wearable Technology"
];

const priceRanges = [
  "All Price",
  "Under $20",
  "$25 to $100",
  "$100 to $300",
  "$300 to $500",
  "$500 to $1,000",
  "$1,000 to $10,000"
];

const brandList = [
  "Apple", "Google", "Microsoft", "Samsung",
  "Dell", "HP", "Bose", "Xiaomi",
  "Sony", "Panasonic", "LG", "Intel", "One Plus"
];
 
const Shoppage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showBrands, setShowBrands] = useState(true);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  const handleBrandChange = (checkedValues) => {
    setSelectedBrands(checkedValues);
  };

  const filterProducts = () => {
    return products.filter(product => {
      const categoryMatch = selectedCategory ? product.category === selectedCategory : true;

      let priceMatch = true;
      const productPrice = parseInt(product.price.slice(1));
      if (selectedPriceRange === "Under $20") {
        priceMatch = productPrice < 20;
      } else if (selectedPriceRange === "$25 to $100") {
        priceMatch = productPrice >= 25 && productPrice <= 100;
      } else if (selectedPriceRange === "$100 to $300") {
        priceMatch = productPrice >= 100 && productPrice <= 300;
      } else if (selectedPriceRange === "$300 to $500") {
        priceMatch = productPrice >= 300 && productPrice <= 500;
      } else if (selectedPriceRange === "$500 to $1,000") {
        priceMatch = productPrice >= 500 && productPrice <= 1000;
      } else if (selectedPriceRange === "$1,000 to $10,000") {
        priceMatch = productPrice >= 1000 && productPrice <= 10000;
      }

      const brandMatch = selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true;

      return categoryMatch && priceMatch && brandMatch;
    });
  };

  return (
    <div className="shoppage">
      <div className="shoppage-content">
        <div className="category-filter">
          {/* Category Filter */}
          <div className="filter-section">
            <div className="filter-header" onClick={() => setShowCategory(!showCategory)}>
              {showCategory ? <UpOutlined className="filter-toggle-icon" /> : <DownOutlined className="filter-toggle-icon" />}
              <h3>Category</h3>
            </div>
            {showCategory && (
              <Radio.Group className="category-list" onChange={handleCategoryChange} value={selectedCategory}>
                {categories.map((category, index) => (
                  <Radio key={index} value={category}>{category}</Radio>
                ))}
              </Radio.Group>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <div className="filter-header" onClick={() => setShowPrice(!showPrice)}>
              {showPrice ? <UpOutlined className="filter-toggle-icon"  /> : <DownOutlined className="filter-toggle-icon" />}
              <h3>Price Range</h3>
            </div>
            {showPrice && (
              <Radio.Group className="category-list" onChange={handlePriceChange} value={selectedPriceRange}>
                {priceRanges.map((range, index) => (
                  <Radio key={index} value={range}>{range}</Radio>
                ))}
              </Radio.Group>
            )}
          </div>

          {/* Brands Filter */}
          <div className="filter-section">
            <div className="filter-header" onClick={() => setShowBrands(!showBrands)}>
              {showBrands ? <UpOutlined className="filter-toggle-icon" /> : <DownOutlined className="filter-toggle-icon" />}
              <h3>Popular Brands</h3>
            </div>
            {showBrands && (
              <Checkbox.Group className="brand-list" onChange={handleBrandChange} value={selectedBrands}>
                {brandList.map((brand, index) => (
                  <Checkbox key={index} value={brand}>{brand}</Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid-container">
          <div className="product-grid">
            {filterProducts().map((product) => (
              <ProductCard
                key={product.id}
                imgSrc={product.imgSrc}
                title={product.title}
                price={product.price}
                id={product.id}
                category={product.category}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoppage;
