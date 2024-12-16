import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, cartItems, getCartAmount, updateQuantity, addOrder } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const updatedCart = Object.entries(cartItems).map(([itemId, quantity]) => ({
      itemId,
      quantity,
    }));
    setCartData(updatedCart);
  }, [cartItems]);

  const handleQuantityChange = (itemId, quantity) => {
    updateQuantity(itemId, quantity);
  };

  const handlePlaceOrder = () => {
    addOrder();
  };

  // Helper function to get the amount for a specific product
  const getItemAmount = (itemId, quantity) => {
    const product = products.find(product => product._id === itemId);
    return product ? product.price * quantity : 0;
  };

  return (
    <div>
      <Title title="Shopping Cart" />

      <div className="mt-10">
        {cartData.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartData.map((item) => (
            <div key={item.itemId} className="flex justify-between py-5">
              <div>
                <h3>Product {item.itemId}</h3>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.itemId, parseInt(e.target.value))}
                  min="1"
                  className="w-16"
                />
              </div>
              {/* Display the price for this item */}
              <p>${getItemAmount(item.itemId, item.quantity)}</p>
            </div>
          ))
        )}
      </div>

      {cartData.length > 0 && (
        <div>
          <button onClick={handlePlaceOrder} className="bg-black text-white py-3 mt-6">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;




