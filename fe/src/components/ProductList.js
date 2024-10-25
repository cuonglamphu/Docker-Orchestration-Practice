import React, { useEffect, useState } from 'react';

const ProductList = () => {
  console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    const userId = localStorage.getItem('userId');
    const quantity = 1;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ userId, productId, quantity }),
    })
      //check if the response is ok or 401 return login page
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return window.location.href = '/login';
        }
        return alert('Added to cart');
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart');
      });
  }
  
  return (
    <div className="container mt-5">
      <a href="/cart" className="btn btn-primary mb-4">View Cart</a>
      <h2 className="text-center mb-4">Product List</h2>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
