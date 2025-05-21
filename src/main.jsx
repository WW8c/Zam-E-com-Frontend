import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './index.scss';
import App from './App.jsx';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';

const Root = () => {
  const location = useLocation();
  
  // List of paths where header and footer should not be shown
  const hideHeaderFooter = ['/login', '/forgot-password', '/verify-code', '/reset-password'];

  // Check if the current route is in the hide list
  const showHeaderFooter = !hideHeaderFooter.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <App />
      {showHeaderFooter && <Footer />}
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <Root />
    </Router>
  </StrictMode>
);