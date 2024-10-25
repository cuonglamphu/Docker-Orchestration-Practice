import React, {useState, useEffect} from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';  // Import component Login
import Cart from './components/Cart';    // Import component Cart
import ProductList from './components/ProductList';  // Import component ProductList
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

   // Hàm xử lý khi thêm sản phẩm vào giỏ hàng, call api cart post
   const handleAddToCart = (productId) => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    const quantity = 1;

    fetch('/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart');
      });
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/" element={<ProductList/>} />
    </Routes>
  );
}

export default App;
