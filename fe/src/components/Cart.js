import React, { useEffect, useState } from 'react';

const useFetchCartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
          window.location.href = '/login';
          return;
        }

        const cartResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!cartResponse.ok) {
          if (cartResponse.status === 401) {
            window.location.href = '/login';
          }
          throw new Error('Failed to fetch cart items');
        }

        const cartData = await cartResponse.json();
        const itemsArray = Object.keys(cartData).map((productId) => ({
          _id: productId,
          quantity: parseInt(cartData[productId], 10),
        }));

        // Fetch product details in parallel and enrich cart items
        const enrichedCartItems = await Promise.all(
          itemsArray.map(async (item) => {
            const productResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${item._id}`);
            if (!productResponse.ok) {
              throw new Error(`Failed to fetch product with ID: ${item._id}`);
            }
            const productData = await productResponse.json();
            return { ...productData, quantity: item.quantity };
          })
        );

        setCartItems(enrichedCartItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return { cartItems, loading, error, setCartItems };
};

const Cart = () => {
  const { cartItems, loading, error, setCartItems } = useFetchCartItems();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleRemove = async (_id) => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/${userId}/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      alert('Item removed from cart');
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== _id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('There was an issue removing the item from your cart. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <a href="/" className="btn btn-primary mb-4">Products List</a>
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
