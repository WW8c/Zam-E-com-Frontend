import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import "./App.css";

const App = () => {
  return (
      <CartProvider>
        <AppRoutes />
      </CartProvider>
  );
};

export default App;
