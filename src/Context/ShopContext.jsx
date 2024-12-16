import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const BASEURL = "https://gnext-assessment-api-v1.onrender.com";

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/cart/all`);
      if (response.data && response.data.cart) {
        setCartItems(response.data.cart.items);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

const addToCart = async (itemId, quantity) => {
  if (quantity <= 0) {
    toast.error('Please select a valid quantity');
    return;
  }

  try {
    console.log('Adding to cart...', { itemId, quantity });

    const response = await axios.post(`${BASEURL}/api/v1/cart/add-to-cart`, {
      productId: itemId,
      quantity: quantity,
    });

    console.log('Add to cart response:', response);

    if (response.data.message === 'Product added to cart') {
      // Update local state with the new cart data from the API response
      setCartItems(response.data.cart.items.reduce((acc, item) => {
        acc[item._id] = item.quantity;
        return acc;
      }, {}));

      toast.success('Product added to cart');
    } else {
      toast.error('Failed to add product to cart');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('Error adding product to cart');
  }
};


  const addOrder = async () => {
    const orderItems = Object.entries(cartItems).map(([itemId, quantity]) => ({
      productId: itemId,
      quantity: quantity,
    }));

    try {
      const response = await axios.post(`${BASEURL}/api/v1/order/create`, { items: orderItems });
      if (response.data.success) {
        setOrders([...orders, response.data.order]); // Update local orders
        setCartItems({}); // Optionally clear cart after placing the order
        toast.success('Order placed successfully');
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      toast.error('Please select a valid quantity');
      return;
    }

    try {
      const response = await axios.post(`${BASEURL}/api/v1/cart/update-quantity`, {
        productId: itemId,
        quantity: quantity,
      });

      if (response.data.success) {
        fetchCartData(); // Refresh cart data after quantity update
        toast.success('Quantity updated');
      } else {
        toast.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error updating quantity');
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      // Assuming `products` is fetched from the backend or available globally
      // eslint-disable-next-line no-undef
      const productInfo = products.find((product) => product._id === item);
      if (productInfo) {
        totalAmount += productInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const value = {
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    addOrder,
    orders,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
